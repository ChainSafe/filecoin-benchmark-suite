import { buildRequests, fetchRpcContext } from 'filecoin-requests-builder';
import fs from 'fs';

const url = process.env.K6_RPC_URL || "http://localhost:2345/rpc/v1";

try {
  const context = await fetchRpcContext(url);
  const requests = buildRequests(context);

  fs.writeFileSync('methods/requests.json', JSON.stringify(requests, null, 2));
  console.log('Successfully generated methods/requests.json');
} catch (error) {
  console.error('Failed to generate requests:', error.message);
  process.exit(1);
}
