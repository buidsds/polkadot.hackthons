// Import
const { ApiPromise, WsProvider } = require('@polkadot/api');





async function main() {
    // Creat api
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    // Wait until we are ready and connected
    await api.isReady;

    // Do something
    //console.log(api.genesisHash.toHex());
    //console.log("=============");

    //Runtime constants
    // The length of an epoch (session) in Babe
    //console.log(api.consts.babe.epochDuration.toNumber());

    // The amount required to create a new account
    //console.log(api.consts.balances.creationFee.toNumber(1));

    // The amount required per byte on an extrinsic
    //console.log(api.consts.balances.transactionByteFee.toNumber());
    //console.log("=============");
    
    //queries basic
    const ADDR = '13digUASJJWCdPoZ9sb3NfxTmbZMLZxJ2ePRrvcrEazqTDTv';

    const [now, { nonce, data: balances }] = await Promise.all([
    api.query.timestamp.now(),
    api.query.system.account(ADDR)
    ]);
    //console.log(now);nonce
    //console.log(balances);
    //console.log(nonce);
    // name blockchain:
    const chain = await api.rpc.system.chain();
    //console.log(chain);
    
    //header latest
    //const lastHeader = await api.rpc.chain.getHeader();
    //console.log(lastHeader);
    //console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    

  let count = 0;
  const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    //console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);

    if (++count === 10) {
      unsubHeads();
    }
  });

 /* const unsub = await api.query.timestamp.now((moment) => {
    console.log(`The last block has a timestamp of ${moment}`);
  });
*/
  const unsub1 = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
    //console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
  });



}




main();
queries_block_new();