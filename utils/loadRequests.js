export function loadRequests(path = '../methods/requests.json') {
  const resolvedPath = import.meta.resolve(path);
  try {
    return JSON.parse(open(resolvedPath));
  } catch (err) {
    if (err instanceof Error && err.message.includes('no such file or directory')) {
      console.error(`
❌ Missing file: ${resolvedPath}

To generate this file, run:
  K6_RPC_URL=http://localhost:2345/rpc/v1 yarn build-requests

Replace 'http://localhost:2345/rpc/v1' with your actual RPC URL if different.
`);
    } else {
      console.error(`
❌ Error reading ${resolvedPath}: ${err.message}

To re-generate this file, run:
  K6_RPC_URL=http://localhost:2345/rpc/v1 yarn build-requests

Replace 'http://localhost:2345/rpc/v1' with your actual RPC URL if different.
`);
    }

    throw err;
  }
}
