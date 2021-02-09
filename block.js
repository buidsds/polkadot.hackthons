// hello concordium nè
const { ApiPromise, WsProvider } = require('@polkadot/api');



async function main() {
    const wsProvider = new WsProvider('wss://rpc.polkadot.io');
    const api = await ApiPromise.create({ provider: wsProvider });

    const chain = await api.rpc.system.chain();
    console.log("print queries block new:")
    
    /*
    let count1 = 0;
    const unsubHeads = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
    console.log(`${chain}: last block #${lastHeader.number} has hash ${lastHeader.hash}`);
    if(++count1 === 10){
        //unsubHeads();
    }
    });
    
*/
   const ADDR = "0x3ff8df5aac3efee57f94c537dd401a5583a740f00241612902d4e2ab43c9009f";

    const unsub = await api.query.system.account(ADDR, ({ nonce, data: balance }) => {
        console.log(`free balance is ${balance.free} with ${balance.reserved} reserved and a nonce of ${nonce}`);
      });
   



}

main();
