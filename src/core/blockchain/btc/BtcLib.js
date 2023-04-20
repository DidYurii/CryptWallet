 const AbstractCurrencyLib = require('../AbstractCurrencyLib')
 const BtcConverter = require('/src/core/helpers/BtcConverter')
 const BtcValidator = require('/src/core/validators/blockchain/BtcValidator') 
 const BlockcypherProvider = require('./BlockcypherProvider')
 const isProduction = require('/src/isProduction')

const {ECPair,TransactionBuilder,networks} = require('bitcoinjs-lib');

class BtcLib extends AbstractCurrencyLib{

    constructor(app) {
        let validator = new BtcValidator();       
        let converter = new BtcConverter(); 
        let provider = new BlockcypherProvider(app,validator,converter);  
        super(app,provider,validator,converter);
            }

            
   

    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try{
                this.validator.validateAddress(address);
                   
                let balance = await this.provider.getBalance(address);
                
                balance = this.converter.toDecimals(balance);
                console.log("getBalance balance toDecimals = ",balance);
                return resolve(balance);
            }catch (e){
                return reject(e);
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log("btcLib sendCurrency start")
                let txParams = await this._formatTransactionParameters(to,amount)
                console.log("btcLib sendCurrency formatTxParams",txParams)
                let rawTx = await this._createSignRawTx(txParams);
                console.log("btcLib sendCurrency rawTx",rawTx)
                let txHash = await this.provider.sendTx(rawTx);
                console.log("btcLib sendCurrency sendTx",txHash)
                return resolve(txHash);
            }catch (e) {
                return reject(e)
            }
        })
    }

    _getNetwork(){
        return isProduction?networks.bitcoin:networks.testnet;
        //return networks.testnet
    }

   
    _createSignRawTx(txParams){
        return new Promise(async(resolve,reject)=>{
            try {
                const  BTC_WIF = await this.getPrivatKey()
                console.log("btc lib createSignRawTx BTC_WIF =  ", BTC_WIF);
                let keyring = await ECPair.fromWIF(BTC_WIF,this._getNetwork());
                console.log("keyring",keyring);
                console.log("btcLib txb")
                let txb = new TransactionBuilder(this._getNetwork());
                console.log("btcLib addSignedUtxos");
                txb = await this.provider.addSignedUtxos(keyring,txb,txParams["from"],txParams["to"],txParams["amount"],txParams["fee"]);
                console.log("btcLib txb")
                let txHash = txb.build().toHex();
                this.validator.validateString(txHash,'txHash');
                console.log('_createSignRawTx end txHash ',txHash);
                return resolve(txHash)
            }catch (e){
                return reject(e);
            }
        })
    }


    _formatTransactionParameters(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                let from = await this.getAddress();
                let fee = await this.getFee();
                console.log('formatTxParams fee',fee)
                amount = parseFloat(amount);
                console.log('formatTxParams amount',amount)
                this.validator.validateAddress(to);
                this.validator.validateNumber(amount);
                this.validator.validateNumber(fee);
                console.log('formatTxParams validate over')
                amount = this.fromDecimals(amount);
                fee = this.fromDecimals(fee);
                console.log('formatTxParams afterDecimals',fee)
                amount = Math.round(amount);
                fee = Math.round(fee);
                console.log('formatTxParams before txParams',amount)
                let txParams={
                    from:from,
                    to:to,
                    amount:amount,
                    fee:fee
                }
                console.log('formatTxParams txDParams',txParams)
                return resolve(txParams);
            }catch (e){
                return reject(e);
            }
        })
    }


    getFee(){
        return new Promise(async(resolve,reject)=>{
            try{
                let fee = await this.provider.getFee()
                console.log("btcLib getFee",fee);
                return resolve(fee);
            }catch(e){
                return reject(e)
            }
        })
    }

    
}
module.exports = BtcLib;


