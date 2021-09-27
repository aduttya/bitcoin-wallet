const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

const network = bitcoin.networks.testnet;

const path = `m/44'/1'/0'/0`;

let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)
const root = bip32.fromSeed(seed,network)

let account = root.derivePath(path)
let node = account.derive(0).derive(0)

let btcAddress = bitcoin.payments.p2pkh({
    pubkey:node.publicKey,
    network:network
}).address

console.log(`
    Wallet Generated :
    - Address : ${btcAddress},
    - Key : ${node.toWIF()},
    -Mnemonic : ${mnemonic} 
`)