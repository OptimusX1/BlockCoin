
import { Block, Blockchain, Transaction } from './blockchain.js';


const blockcoin = new Blockchain();

// Store the transactions in pending transaction array
// console.log(new Transaction('address1', 'address2', 100));
// console.log(new Transaction('address1', 'address2', 100));

blockcoin.createTransaction(new Transaction('address1', 'address2', 100));
blockcoin.createTransaction(new Transaction('address2', 'address1', 50));

// Mine the pending transactions
console.log('\n mining pending transactions');
blockcoin.minePendingTransactions('Xavier-address')

console.log('\n Balance of Xavier ', blockcoin.getBalanceOfAddress('Xavier-address'));



console.log('mining pending transactions again...');
blockcoin.minePendingTransactions('Xavier-address')

console.log('\n Balance of Xavier ', blockcoin.getBalanceOfAddress('Xavier-address'));



//adding new  block into the chain

// console.log("mining block 1....");
// blockcoin.addBlock(new Block(1, "11/10/2025", "2 BTC"));

// console.log("mining block 2....");
// blockcoin.addBlock(new Block(2, "11/10/2025", "2.3 BTC"))

// console.log("Is the Block valid : " + blockcoin.isChainValid());

//Tampering the block
// blockcoin.chain[1].data = "130 BTC";
// blockcoin.chain[1].hash = blockcoin.chain[1].calculateHash();

// console.log("Is the Block valid : " + blockcoin.isChainValid());

// console.log(JSON.stringify(blockcoin, null , 4 ));
