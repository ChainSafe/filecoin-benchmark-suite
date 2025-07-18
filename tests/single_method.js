import { assertSuccess, sendRpcRequest } from "../utils/rpc.js";
import { regularBenchmarkParams } from "../utils/benchmark_params.js";

const url = __ENV.K6_RPC_URL || "http://localhost:2345/rpc/v1";
const method = __ENV.K6_METHOD || "eth_gasPrice";

export let options = regularBenchmarkParams;
const requests = await JSON.parse(open('../methods/requests.json'));

// the function that will be executed for each VU (virtual user)
export default function () {  
  if (!requests[method]) {
    throw new Error(`Method ${method} is not supported`);
  }

  const response = sendRpcRequest(url, method, requests[method].params);
  assertSuccess(response);
}
