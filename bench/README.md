# Filecoin Node Benchmarks

This directory contains a **reproducible benchmarking setup** for Filecoin nodes (**Forest** and **Lotus**) with:

- strict CPU isolation,
- shared snapshots,
- unified metrics (Prometheus + Grafana + cAdvisor),
- k6 load generation pinned to dedicated cores.

The goal is **clean, comparable, repeatable measurements**.

---

## High-level architecture

- **One observability stack** (shared):
  - cAdvisor — container resource metrics
  - Prometheus — time-series storage
  - Grafana — visualization

- **One shared snapshot volume**
  - resolved via `https://forest-archive.chainsafe.dev/latest/mainnet/`
  - reused by both Forest and Lotus

- **One Filecoin node at a time** (Forest *or* Lotus)
  - pinned to all CPUs except the first two

- **k6 runs on the host**
  - pinned to CPU `0–1`
  - does not interfere with node CPU usage

---

## Directory structure

```
bench/
├─ compose.yml              # Single compose file (profiles: forest / lotus)
├─ .env                     # Single source of truth for config
│
├─ prometheus/
│  └─ prometheus.yml
│
├─ grafana/
│  ├─ provisioning/
│  │  ├─ datasources/
│  │  └─ dashboards/
│  └─ dashboards/
│
├─ scripts/
│  └─ generate_report.js
│  # TODO: taskset wrapper
│
└─ README.md
```

---

## CPU isolation model

| Component | CPUs |
|----------|------|
| k6 (host) | `0–1` |
| Prometheus / Grafana / cAdvisor | `0–1` |
| Forest / Lotus | `2–N` |

Configured via `.env`:

```env
AUX_CPUSET=0-1
NODE_CPUSET=2-15
```

> CPU indices are **logical CPUs** (as reported by `nproc`).

---

## Configuration (`.env`)

Single `.env` file controls everything.

Example:

```env
# CPU pinning
AUX_CPUSET=0-1
NODE_CPUSET=2-15

# Snapshot (shared)
LATEST_SNAPSHOT_URL=https://forest-archive.chainsafe.dev/latest/mainnet/
ARIA2_CONN=5

# All nodes
REIMPORT_SNAPSHOT=0
CHAIN=mainnet

# Forest
FOREST_IMAGE=ghcr.io/chainsafe/forest:v0.31.1
FOREST_RPC_PORT=2345
FOREST_HEALTHZ_RPC_PORT=2346
FOREST_P2P_LISTEN_PORT=2347
FOREST_KEYSTORE_PHRASE="<CHANGE ME>"

# Lotus
LOTUS_IMAGE=filecoin/lotus-all-in-one:v1.34.3
LOTUS_RPC_PORT=1234
```

---

## Compose profiles

This setup uses **Docker Compose v2 profiles**.

| Profile | What starts |
|-------|-------------|
| (none) | metrics + snapshot downloader |
| `forest` | Forest node |
| `lotus` | Lotus node |
---

## Startup sequence

### 1. Start observability + snapshot downloader
```bash
docker compose --env-file .env up -d cadvisor prometheus grafana snapshot-downloader
```

This will:
- start metrics stack
- download snapshot **only if not already present**

---

### 2. Start Forest
```bash
docker compose --env-file .env --profile forest up -d forest
```

### 3. Start Lotus
```bash
docker compose --env-file .env --profile lotus up -d lotus
```

> Run **Forest or Lotus**, not both, unless you explicitly want side-by-side stress.

---

## Snapshot reuse logic

- Snapshot filename is stored in:
  ```
  /snapshots/latest_snapshot.txt
  ```
- If the file already exists → **no re-download**
- Same snapshot volume is reused by Forest and Lotus

This guarantees:
- identical chain state
- no accidental snapshot drift

---

## k6 execution (host)

All k6 runs must be pinned to CPU `0–1`.

Run it like that:

```bash
taskset -c 0-1 k6 run ...
```

or:

```bash
taskset -c 0-1 node scripts/generate_report.js
```

---

## Grafana access

- URL: http://localhost:3000
- Default credentials:
  - user: `admin`
  - password: `admin` (change on first login)

Dashboards are auto-provisioned from `grafana/`.

---

## Prometheus access

- URL: http://localhost:9090
- cAdvisor target must be `UP`

Useful sanity checks:

```promql
up{job="cadvisor"}
container_cpu_usage_seconds_total{id!="/"}
```

---

## Design principles

- **One metrics stack** — no duplicated Prometheus or Grafana
- **One snapshot source** — identical chain state
- **Hard CPU isolation** — no noisy neighbors
- **Explicit profiles** — no hidden containers
- **Reproducible runs** — same inputs, same outputs

---

## Expected workflow

1. Start metrics + snapshot
2. Start Forest or Lotus
3. Wait until node is ready
4. Run k6 benchmarks
5. Export results
6. Switch node implementation
7. Repeat with identical conditions
