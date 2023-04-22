const EthLib = require('./eth/EthLib')
const ERC20Lib = require ('./erc20/ERC20Lib')
const BtcLib = require('./btc/BtcLib')
const LtcLib = require('./ltc/LtcLib')
const BnbLib = require('./bnb/BnbLib')
const CredentialService = require('/src/core/blockchain/credentials/CredentialService');
class BlockchainService{
constructor(app){
    this.app = app
    this.credentials = new CredentialService(app)
    let eth = new EthLib(app)
    let ERC20 = new ERC20Lib(app)    
    let btc = new BtcLib(app)
    let ltc = new LtcLib(app);
    let bnb = new BnbLib(app);
       this.libraries={
        "ETH": eth,
        "DID_Token": ERC20,
        "BTC": btc,
        "LTC":ltc,
        "BNB":bnb
    }
    
     //console.log("libraries",this.libraries);
    
}

   getCurrentLibrary(){
        //console.log("getCurrentLibrary",this.libraries[this.app.getCurrency()])     
        return this.libraries[this.app.getCurrency()]
       }
    
getAddress(){
    return new Promise(async(resolve, reject) => {
        try {
             let address = await this.getCurrentLibrary().getAddress() 
                return resolve(address)                        
        } catch (error) {
            return reject(error)
        }
    })
}

sendCurrency(to,amount){
    return new Promise(async(resolve, reject) => {
        try {
            
             let result = await this.getCurrentLibrary().sendCurrency(to,amount) 
              return resolve(result)
                        
        } catch (error) {
            return reject(error)
        }
    })
}

getCurrentBalance(){
return new Promise(async(resolve, reject) => {
    try {
        let balance = await this.getCurrentLibrary().getCurrentBalance() 
        return resolve(balance)
            
    } catch (error) {
        return reject(error)
    }
})
}
generateMnemonic(){
    return new Promise(async(resolve,reject)=>{
        try{
            let result =await this.credentials.generateMnemonic();
            return resolve(result);
        }catch (e){
            return reject(e);
        }
    })
}

importMnemonic(mnemonic){
    return new Promise(async(resolve,reject)=>{
        try{
            let result =await this.credentials.importMnemonic(mnemonic);

            // TODO Update credentials
            return resolve(result);
        }catch (e){
            return reject(e);
        }
    })
}
}
module.exports = BlockchainService