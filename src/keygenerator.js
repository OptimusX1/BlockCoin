
import pkg from 'elliptic'; // Import the elliptic library ( to generate a pub, prov key , method to gen key ) as pkg
const { ec: EC } = pkg;  // destructure to get ec as EC from pkg

const ec = new EC('secp256k1'); // Create an EC instance using the secp256k1 curve

const key = ec.genKeyPair(); // calling the genKeypair() in elliptic to generate a new key pair obj
// console.log(key);


const publicKey = key.getPublic('hex'); // getting the public key in hex format
console.log('public key :' ,publicKey);

console.log("\n");

const privateKey = key.getPrivate('hex');
console.log('private key :' ,privateKey);