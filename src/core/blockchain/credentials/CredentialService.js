const MnemonicGenerator = require("/src/core/blockchain/credentials/MnemonicGenerator");
const EthWallet = require('/src/core/blockchain/credentials/protocols/EthWallet');
const Erc20Wallet = require('/src/core/blockchain/credentials/protocols/Erc20Wallet');
const BtcWallet = require('/src/core/blockchain/credentials/protocols/BtcWallet');
const LtcWallet = require('/src/core/blockchain/credentials/protocols/LtcWallet')
const BnbWallet = require('/src/core/blockchain/credentials/protocols/BnbWallet')
const BTC = "BTC";
const ETH = "ETH";
const DID_Token = "DID_Token";


const Validator = require("/src/core/validators/Validator");
class CredentialsService {
    constructor(app) {
        this.app = app;
        this.validator = new Validator();
        this.generator = new MnemonicGenerator();
        let eth = new EthWallet();
        let erc20 = new Erc20Wallet();
        let btc = new BtcWallet();
        let ltc = new LtcWallet();
        let bnb = new BnbWallet();
        this.mnemonic = "";
        this.protocols = {
            BTC:btc,
            ETH:eth,
            DID_Token:erc20,
            LTC:ltc,
            BNB:bnb
        }
    }

    _getActiveProtocol(){
        
        
        return this.protocols[this.app.getCurrency()];
    }
    generateMnemonic(){
        return this.generator.generateMnemonic();
    }

    _setMnemonic(mnemonic){
        this.validator.validateString(mnemonic);
        this.mnemonic = mnemonic;
        //console.log('_getMnemonic()==', mnemonic )
    }
    _getMnemonic(){
        //console.log('_getMnemonic()==',this.mnemonic )
        return this.mnemonic;
    }
    importMnemonic(mnemonic){
        this._setMnemonic(mnemonic);
    }


    getAddress(){
        return new Promise(async(resolve,reject)=>{
            try {
                return resolve(
                    this._getActiveProtocol().provideAddress(
                        this._getMnemonic()));
            } catch (e) {
                return reject(e);
            }
        })
    }


    getPrivateKey(){
        return new Promise(async(resolve,reject)=>{
            try {
                //console.log('privKey=========',this._getActiveProtocol().providePrivateKey(this._getMnemonic()))
                return resolve(this._getActiveProtocol().providePrivateKey(this._getMnemonic()));
            } catch (e) {
                return reject(e);
            }
        })
    }
}

module.exports = CredentialsService;