const Transaction = require("ethereumjs-tx")
const Web3 = require('web3') 
const EthConverter = require('/src/core/helpers/EthConverter');
const Validator = require('/src/core/validators/blockchain/EthValidator');
const AbstractCurrencyLib = require('/src/core/blockchain/AbstractCurrencyLib')
const isProduction = require('/src/isProduction')
let PROVIDER_URL_MAIN = process.env.ETH_PROVIDER_URL
let PROVIDER_URL_TEST = process.env.ETH_PROVIDER_URL_TEST

let GWEI = 10**9
let GasPrice = 70*GWEI
let GasLimit = 21000

 class EthLib extends AbstractCurrencyLib {
    constructor(app){
       
        let PROVIDER_URL = isProduction?PROVIDER_URL_MAIN:PROVIDER_URL_TEST
       
        let web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL))
        let converter = new EthConverter();
        let validator = new Validator();
        super(app, web3,validator,converter);
           
    }

     getBalance(address){
        return new Promise(async(resolve, reject) => {
            try {
                this.validator.validateAddress(address);               
                let balance =await this.provider.eth.getBalance(address);
                balance = this.converter.toDecimals(balance);
               return resolve(balance)
                           
            } catch (error) {
                return reject(error)
            }
        })
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try {
                this.validator.validateAddress(to,"Tx Receiver");
                this.validator.validateNumber(amount,"sendCurrency amount");
             let txData = await this._formatTransactionsParams(to, amount)
             let hash = await this._sendTransaction(txData)
                 return resolve(hash)   
            } catch (error) {
                return reject(error)
            }
        })
    }
    _getChainId(){
        let chainId = isProduction?1:11155111
                return chainId
    }
 
    _formatTransactionsParams( to,value,data=""){ 
        return new Promise(async(resolve,reject)=>{
            try {
                this.validator.validateAddress(to);
                this.validator.validateNumber(value);
                this.validator.validateString(data);
                let privateKey = await this.getPrivatKey()
                this.validator.validateString(privateKey);

                let privKeyBuffer=Buffer.from(privateKey, 'hex')
                let nonce = await this.getNextNonce()
                let from = await this.getAddress()
                //message ? await this.web3.utils.toHex(message) : undefined
                //message = await this.web3.utils.toHex(message)
                 value = this.fromDecimals(value)
                 let gasPrice = this.getGasPrice();
                 this.validator.validateNumber(gasPrice);
 
                 let gasLimit = this.getGasLimit();
                 this.validator.validateNumber(gasLimit);
                 let chainId = this._getChainId();
                this.validator.validateNumber(chainId);

                let txParams = {
                    "from": from,
                    "to": to,
                    "privateKey": privKeyBuffer,
                    //"value": this.web3.utils.numberToHex(value),
                    "value":this.provider.utils.numberToHex(value),
                    "gasPrice":this.provider.utils.numberToHex(gasPrice),
                    //"gasPrice": this.web3.utils.numberToHex(gasPrice),
                    "gasLimit": gasLimit,
                    "nonce": nonce,
                    "data": data,
                    "chainId":chainId           

                }
                return resolve(txParams)
            } catch (error) {
                return reject(error)
            }
        })
    }

    toDecimals(amount){
        return this.converter.toDecimals(amount);
    }
    fromDecimals(amount){
        return this.converter.fromDecimals(amount);
    }

    getGasPrice(){
      return GasPrice
    }

    getGasLimit(){
        return GasLimit

    }
    getNextNonce(){
        return new Promise(async(resolve,reject)=>{
            try {             
             let address = await this.getAddress() 
             let nonce =await this.provider.eth.getTransactionCount(address);
                 return resolve(nonce)   
            } catch (error) {
                return reject(error)
            }
        })
    }


    _sendTransaction(data){
        return new Promise(async(resolve, reject)=>{
            try {
                let raw = await this._makeTransaction(data)
                this.provider.eth.sendSignedTransaction(raw).on("receipt", (data)=>{
                    let txHash = data["transactionHash"];
                    return resolve(txHash)
                }).on("error", (e)=>{console.error(e); return reject(e)})
               
                
            } catch (error) {
                return reject(error)
            }
        })
    }

    _makeTransaction(txParams){
        return new Promise(async(resolve,reject)=>{
            try {
                
                let tx = new Transaction(txParams)
               
                tx.sign(txParams.privateKey)

                let raw = "0x" + tx.serialize().toString('hex')
                    return resolve(raw)
                
                
            } catch (error) {
                return reject(error)
            }
        })
    }
    
}
module.exports = EthLib