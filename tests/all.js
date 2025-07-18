import { sendRpcRequest, assertSuccess } from "../utils/rpc.js";
import { regularBenchmarkParams } from "../utils/benchmark_params.js";

const url = __ENV.K6_RPC_URL || "http://localhost:2345/rpc/v1";

export let options = regularBenchmarkParams;
const requests = await JSON.parse(open('../methods/requests.json'));

// the function that will be executed for each VU (virtual user)
export default function () {
  for (const [method, { params }] of Object.entries(requests)) {
    const response = sendRpcRequest(url, method, params);
    assertSuccess(response);
  }
}
