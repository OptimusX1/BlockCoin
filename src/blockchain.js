
import pkg from 'crypto-js';
const { SHA256 } = pkg;

import pkg2  from 'elliptic'; // Import the elliptic library ( to generate a pub, prov key , method to gen key ) as pkg
const { ec: EC } = pkg2;  // destructure to get ec as EC from pkg

const ec = new EC('secp256k1'); // Create an EC instance using the secp256k1 curve

// This demonstrates, How a transaction in blockchain look like

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    // this.signTransaction();
   
    
  }

  calculateHash(){
    return SHA256(this.fromAddress + this.toAddress + this.amount).toString();
  }

  // private key is used to sign the transaction
  signTransaction(signingKey){
    //check if the from address matches with the public key of the signing key
    // console.log(signingKey);
    //  checking whether the signing key matches the from address

    //checking whether user uses his wallet amount
   if(signingKey.getPublic('hex') !== this.fromAddress){
      throw new Error('public key not matched, You cannot sign transactions for other wallets!');
    }  
    //calculating the hash of the Transaction
    const hashTx = this.calculateHash();
    //signing the hash with the signing key(private key)
    const sig = signingKey.sign(hashTx, 'base64');
    //converting the signature to DER format and storing it as hex string in signature property of the transaction
    this.signature = sig.toDER('hex');
    // console.log(this.signature + "   signature");
    
  }

  isValid(){
    //If from address is null , it is a mining reward transaction
    if(this.fromAddress === null) return true;

    if(!this.signature || this.signature.length === 0){
      throw new Error('No signature in this transaction');
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    // console.log(publicKey);
    // console.log("cal hash" , this.calculateHash());
    
    
    return publicKey.verify(this.calculateHash(), this.signature);
}

}

// This demonstrates, How a block in blockchain look like
class Block {
  constructor( timestamp, transactions, previousHash) {
    // this.index = index;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
    // console.log(Block);
   
  }

  // Calculates Hash of the current block by using SHA256 Algo
  calculateHash() {
    return SHA256(this.previousHash + this.timestamp + this.nonce + JSON.stringify(this.transactions)).toString();
  }

  //POW Algorithm implementation
  mineBlock(difficulty) {
    // Array(difficulty + 1).join("0") -- creates an empty array, with ( diff + 1 ) length and joins "0" to each element of the array
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    // console.log(this.hash);
   
    return this.hash;

  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    // console.log(typeof(this.chain));
    this.difficulty = 2;
    this.pendingTransactions = [];
    this.miningReward = 100;

  }

  createGenesisBlock() {
    return new Block("01/01/2025", "Genesis", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {  
    //creating an Instance of the Block class.
    let block = new Block(new Date(), this.pendingTransactions, this.getLatestBlock().hash);
    // console.log('Block Instance ' , block);
   
    // console.log(block.mineBlock(this.difficulty));
    block.mineBlock(this.difficulty); // Mining the block with POW algorithm....

    console.log("Block mined");
    // console.log('Mined Block : ' , block);
   
    this.chain.push(block); // pushing into the chain
    // console.log(this.chain);
   
    this.pendingTransactions = [
      // creates a new transaction to reward the miner
      new Transaction(null, miningRewardAddress, this.miningReward)
  
    ];
    // console.log(miningRewardAddress);
    
    // console.log(this.pendingTransactions);
   
  }

  addTransaction(transaction) {

    // console.log(transaction);
    
    if(!transaction.fromAddress || !transaction.toAddress){
      throw new Error('Transaction must include from and to address');
    }

    if(!transaction.isValid()){
      throw new Error('Cannot add invalid transaction to chain');
    }
    this.pendingTransactions.push(transaction);
    // console.log(this.pendingTransactions);
    console.log('Transaction pushed into the chain ');
    
  }

  getBalanceOfAddress(address) {      
    let balance = 0;
    // console.log(this.chain);
   
    for (const block of this.chain) {
      // console.log(block);
     
      for (const trans of block.transactions) {
        // console.log(trans);
       
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    // console.log(balance);
   
    return balance;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length - 1; i++) {
      let currentBlock = this.chain[i];
      let previousBlock = this.chain[i - 1];
      let nextBlock = this.chain[i + 1];

      if (currentBlock.hash == currentBlock.calculateHash() && currentBlock.hash == nextBlock.previousHash) {

        return "True Block";

      }
      return "False Block";

    }
  }

}

export { Block, Blockchain, Transaction };
