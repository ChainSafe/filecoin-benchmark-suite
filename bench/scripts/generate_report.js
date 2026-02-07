// Build CSV from k6 --summary-export across all methods

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const RPC_URL      = process.env.K6_RPC_URL   || 'http://localhost:2345/rpc/v1';
const VUS          = process.env.VUS          || '20';
const DURATION     = process.env.DURATION     || '30s';
const CSV_PATH     = process.env.CSV_PATH     || 'results.csv';
const EXTRA_ARGS   = (process.env.K6_EXTRA_ARGS || '').trim().split(/\s+/).filter(Boolean);

const K6_SCRIPT = path.join(__dirname, '../../tests/single_method.js');
const METHODS_FILE = path.join(__dirname, '../../methods/requests.json');
const OUT_DIR = '.k6-summaries';

fs.mkdirSync(OUT_DIR, { recursive: true });

let methodsMap;
try {
  const raw = fs.readFileSync(METHODS_FILE, 'utf8');
  methodsMap = JSON.parse(raw);
} catch (err) {
  if (err && (err.code === 'ENOENT' || err instanceof SyntaxError)) {
    console.error(
      `Failed to load methods/requests.json from "${METHODS_FILE}".\n` +
      'This file is generated and not committed to the repo.\n' +
      'Please run "yarn build-requests" to generate it, then re-run this script.'
    );
    process.exit(1);
  }
  throw err;
}
const methodNames = Array.isArray(methodsMap) ? methodsMap : Object.keys(methodsMap);

const cols = [
  'method',
  'http_req_duration_avg_ms','http_req_duration_min_ms','http_req_duration_med_ms','http_req_duration_max_ms','http_req_duration_p90_ms','http_req_duration_p95_ms',
  'iteration_duration_avg_ms','iteration_duration_min_ms','iteration_duration_med_ms','iteration_duration_max_ms','iteration_duration_p90_ms','iteration_duration_p95_ms',
  'data_received_bytes','data_sent_bytes',
  'http_reqs','http_req_failed_pct'
];
const rows = [cols.join(',')];

const toMs = (x) => (x == null || x === '') ? '' : (Number(x).toFixed(3));
const toNum = (x) => (x == null || x === '') ? '' : String(Number(x));

function readTrend(j, name) {
  const m = j.metrics?.[name];
  if (!m) return {};
  
  return {
    avg: toMs(m.avg),
    min: toMs(m.min),
    med: toMs(m.med),
    max: toMs(m.max),
    p90: toMs(m['p(90)']),
    p95: toMs(m['p(95)']),
  };
}
function readCounter(j, name) {
  const m = j.metrics?.[name];
  return toNum(m?.count ?? '');
}
function readRatePct(j, name) {
  const m = j.metrics?.[name];
  const rate = m?.values?.rate;
  return rate == null ? '' : (Number(rate) * 100).toFixed(4);
}

function readSummary(summaryPath) {
  const j = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  return {
    httpReqDur: readTrend(j, 'http_req_duration'),
    iterDur:    readTrend(j, 'iteration_duration'),
    dataReceived: readCounter(j, 'data_received'),
    dataSent:     readCounter(j, 'data_sent'),
    httpReqs:     readCounter(j, 'http_reqs'),
    httpReqFailedPct: readRatePct(j, 'http_req_failed'),
  };
}

for (const method of methodNames) {
  const safe = String(method).replace(/[^a-zA-Z0-9_.-]/g, '_');
  const summaryPath = path.join(OUT_DIR, `summary_${safe}.json`);

  console.log(`\n>>> Running ${method} ...`);
  const args = [
    'run',
    '--vus', String(VUS),
    '--duration', String(DURATION),
    '--summary-trend-stats', 'avg,min,med,max,p(90),p(95)',
    '--summary-export', summaryPath,
    ...EXTRA_ARGS,
    K6_SCRIPT,
  ];

  const res = spawnSync('k6', args, {
    stdio: 'pipe', // capture stdout/stderr in case of issues
    env: {
      ...process.env,
      K6_METHOD: String(method),
      K6_RPC_URL: RPC_URL
    },
    encoding: 'utf-8',
  });

  // surface k6 output if it failed
  if (res.status !== 0) {
    console.error(`k6 failed for ${method} (exit ${res.status}).`);
    if (res.stdout) console.error('[k6 stdout]\n' + res.stdout);
    if (res.stderr) console.error('[k6 stderr]\n' + res.stderr);
    rows.push([JSON.stringify(method), ...Array(cols.length - 1).fill('')].join(','));
    continue;
  }

  // still show short tail to help debugging when needed
  if (res.stderr?.match(/ERRO|WARN/i)) {
    console.error(`[${method}] k6 warnings/errors:\n${res.stderr}`);
  }

  try {
    const s = readSummary(summaryPath);

    if (Number(s.httpReqs || 0) === 0) {
      console.warn(`[WARN] ${method}: No HTTP requests executed. Verify test can access K6_METHOD and K6_RPC_URL environment variables.`);
    }

    rows.push([
      JSON.stringify(method),

      s.httpReqDur.avg, s.httpReqDur.min, s.httpReqDur.med, s.httpReqDur.max, s.httpReqDur.p90, s.httpReqDur.p95,
      s.iterDur.avg,    s.iterDur.min,    s.iterDur.med,    s.iterDur.max,    s.iterDur.p90,    s.iterDur.p95,

      toNum(s.dataReceived),
      toNum(s.dataSent),
      toNum(s.httpReqs),
      s.httpReqFailedPct,
    ].join(','));
  } catch (e) {
    console.error(`Failed to parse summary for ${method}:`, e);
    // write a blank row to keep place
    rows.push([JSON.stringify(method), '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''].join(','));
  }
}

fs.writeFileSync(CSV_PATH, rows.join('\n'));
console.log(`\nDone. CSV saved to ${CSV_PATH}`);
console.log(`Summaries in ${OUT_DIR}/. You can inspect any JSON if needed.`);
