all-forest-cloud:
	k6 cloud run -e K6_RPC_URL=http://localhost:2345/rpc/v1 --local-execution tests/all.js

all-lotus-cloud:
	k6 cloud run -e K6_RPC_URL=http://localhost:1234/rpc/v1 --local-execution tests/all.js

all-forest-local:
	k6 run -e K6_RPC_URL=http://localhost:2345/rpc/v1 tests/all.js

all-lotus-local:
	k6 run -e K6_RPC_URL=http://localhost:1234/rpc/v1 tests/all.js

build-requests:
	yarn build-requests

.PHONY: all-forest-cloud all-lotus-cloud all-forest-local all-lotus-local build-requests
