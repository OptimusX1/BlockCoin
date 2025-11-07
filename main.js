
import {  Blockchain, Transaction } from './src/blockchain.js';

import pkg from 'elliptic'; // Import the elliptic library ( to generate a pub, prov key , method to gen key ) as pkg
const { ec: EC } = pkg;  // destructure to get ec class as EC from pkg

import dotenv from 'dotenv'; 
dotenv.config(); // Load environment variables from .env file

//created a new blockchain instance
const blockcoin = new Blockchain();

const ec = new EC('secp256k1'); // Create an EC instance using the secp256k1 curve
const key = ec.keyFromPrivate(process.env.PRIVATE_KEY); // generating key pair from private key stored in .env file
const myWalletAddress = key.getPublic('hex'); // from public key, you can extract the public wallet address 
// console.log(myWalletAddress);

//created a transaction & sign it with your key
const txt1 = new Transaction(myWalletAddress, 'to some private address', 90);
txt1.signTransaction(key);
blockcoin.addTransaction(txt1);


const txt2 = new Transaction(myWalletAddress, 'to some private address', 10);
txt2.signTransaction(key);
blockcoin.addTransaction(txt2);

const txt3 = new Transaction(myWalletAddress, 'to some private address', 10);
txt3.signTransaction(key);
blockcoin.addTransaction(txt3);
// Store the transactions in pending transaction array
// console.log(new Transaction('address1', 'address2', 100));
// console.log(new Transaction('address1', 'address2', 100));


// Mine the pending transactions
console.log('\n mining pending transactions');
blockcoin.minePendingTransactions(myWalletAddress)

console.log('\n Balance of Xavier ', blockcoin.getBalanceOfAddress(myWalletAddress));


console.log('mining pending transactions again...');
blockcoin.minePendingTransactions(myWalletAddress)

console.log('\n Balance of Xavier ', blockcoin.getBalanceOfAddress(myWalletAddress));

console.log(blockcoin.chain);
console.log(blockcoin.isChainValid());



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
