# K6 benchmarking for Filecoin JSON-RPC

Implementation-agnostic benchmark for RPC

## Requirements

This benchmarking suite requires [k6](https://grafana.com/docs/k6/latest/) installed on the host. Follow the instructions for your operating system. Alternatively, you can run them via Docker.

## Methods Definitions

Before running benchmarks, generate method definitions using the command:

```bash
K6_RPC_URL=http://localhost:2345/rpc/v1 yarn build-requests
```

It will generate real Filecoin and Ethereum JSON-RPC method definitions with up-to-date parameters from live chain state and will store them in the `methods/requests.json` file.
Feel free to adjust parameters manually.

## Local benchmarks

You can run the benchmarks fully locally. To do so, you will need a running Filecoin node; ensure it's synced.

Benchmark all supported methods:

```bash
k6 run -e K6_RPC_URL=http://localhost:2345/rpc/v1 tests/all.js --duration 30s --vus 20
```

Single method benchmark:

```bash
k6 run -e K6_RPC_URL=http://localhost:2345/rpc/v1 -e K6_METHOD=eth_gasPrice tests/single_method.js --duration 30s --vus 20
```

## Upload benchmarks to Grafana Cloud

You can create a free account on Grafana Cloud (the free tier should suffice if you run the tests locally). Login with `k6 cloud login --token <token>`. Now, you can run the benchmarks locally but have them uploaded to your Grafana Cloud for visual inspection and comparisons.

```bash
k6 cloud run -e K6_RPC_URL=http://localhost:2345/rpc/v1 --local-execution tests/all.js
```

## Configuring benchmarks

Read about [k6 options](https://grafana.com/docs/k6/latest/using-k6/k6-options/).

## Environment variables

| Name            | Description                 | Type   | Default                        |
| --------------- | --------------------------- | ------ | ------------------------------ |
| `K6_RPC_URL`    | Node RPC endpoint           | URL    | `http://localhost:2345/rpc/v1` |
| `K6_METHOD`     | Method to benchmark         | string | 'eth_gasPrice'                 |
| `K6_TEST_DEBUG` | Print additional debug info | bool   | false                          |

## Pitfalls

- Don't run the benchmarks in a environment with shared CPU, e.g., on a VPS. The results will vary depending on the load on that CPU.
- Don't run the node in a virtualized environment, e.g., Docker for Mac. Use a native build.
- Ensure your test parameters match your hardware. Ensure your machine is not saturated, e.g., `k6` itself using most of the resources and leaving the node with too little CPU/RAM. If need be, run the test on separate machines. `k6` and the node could also be limited, e.g., via Docker.

## Potential improvements

- [ ] include more methods
- [ ] rewrite in TypeScript
- [ ] visualize results locally
