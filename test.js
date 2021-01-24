// include Polkadot JS SDK
const polkadot = require('@polkadot/api');

// define URL for the node
const NODE_URL = 'wss://rpc.polkadot.io';

// define a main function and call it
// (to be used directly from CLI)
(async () => {
  try {
    // initialize connection to Polkadot
    const wsProvider = new polkadot.WsProvider(NODE_URL);

    // initialize Polkadot-JS API object
    const apiOptions = {
      provider: wsProvider,
    };
    const api = await polkadot.ApiPromise.create(apiOptions);

    // get information about the chain, and node using 'api.rpc.system' methods
    const { chain, name, version } = api.rpc.system;
    const [sysChain, sysName, sysVersion] = await Promise.all([chain(), name(), version()]);
    console.log(`Connected to chain: ${ sysChain }`);
    console.log(`Node name is '${ sysName }' (version '${ sysVersion }')`);

    // check input parameters (used for block number)
    const [_execPath, _filePath, blockCode] = process.argv;

    const { getHeader, getBlock, getBlockHash } = api.rpc.chain;
    if (blockCode != null) {
      // when block is provided, should retrieve its specific information
      const block = await getBlockHash(blockCode).then(hash => getBlock(hash));
      console.log(`Block data is:\n${ JSON.stringify(block, null, 2) }`);
    } else {
      // when no block is provided, should retrieve information about latest block
      const [head, block] = await Promise.all([
        getHeader(),
        getBlockHash().then(hash => getBlock(hash)),
      ]);
      console.log(`Head data is:\n${ JSON.stringify(head, null, 2) }`);
      console.log(`Block data is:\n${ JSON.stringify(block, null, 2) }`);
    }

    // finish process with code 0 (success)
    process.exit(0);
  } catch (err) {
    // show error message (in case any occur)
    console.error(`An error occurred while fetching blockchain data.`. err);

    // finish process with code 1 (error)
    process.exit(1);
  }
})();