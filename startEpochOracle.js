let cron = require('node-cron');
let Web3  = require('web3');

let web3 = new Web3(new Web3.providers.HttpProvider('http://94.130.94.162:8545'));

cron.schedule('* 0,12 * * *', startEpoch);

function startEpoch(){
  return new Promise((resolve, reject)=>{

    const nodeHolderAddress = ''; // Add NodeHolder Contract Address!
    const nodeHolderAbi = require('./NodesHolder.json');
    const senderPrivateKey = ''; // Add NodeHolder Contract Address creator private key!

    let nodeHolderContract = new web3.eth.Contract(nodeHolderAbi, nodeHolderAddress);

    let getData = nodeHolderContract.methods.startEpoch().encodeABI();
    web3.eth.accounts.signTransaction({
      to: nodeHolderAddress,
      data: getData,
      gas: 3000000
    }, senderPrivateKey)
      .then(result => {
        web3.eth.sendSignedTransaction(result.rawTransaction)
          .on('receipt', (result) => {
            console.log("Got receipt from startEpoch:");
            console.log(result);
            resolve();
          })
          .on('error', (err) => {
            reject(err);
          })
      })
      .catch((err) => {
        reject(err);
      })
    });
}
