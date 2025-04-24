import { allMethods } from "../methods/index.js";
import { sendRpcRequest, assertSuccess } from "../utils/rpc.js";
import { regularBenchmarkParams } from "../utils/benchmark_params.js";
import { Trend, Rate } from 'k6/metrics';

const url = __ENV.K6_TEST_URL || "http://localhost:2345/rpc/v1";

export let options = regularBenchmarkParams;

const methodTrends = {};
const methodErrors = {};
for (const method of allMethods) {
  const key = safeMethodName(method.name);
  if (!methodTrends[key]) {
    methodTrends[key] = new Trend(key);
  }
  if (!methodErrors[key]) {
    methodErrors[key] = new Rate(`_success_rate_${key}`);
  }
}

function safeMethodName(methodName) {
  return methodName.replace(/[^a-zA-Z0-9]/g, '_');
}

// the function that will be executed for each VU (virtual user)
export default function () {
  for (const method of allMethods) {
    const key = safeMethodName(method.name);
    const response = sendRpcRequest(url, method);
    methodTrends[key].add(response.timings.duration, { method: method.name });
    const ok = assertSuccess(response);
    methodErrors[key].add(ok);
  }
}
