const CURRENCY = "ETH"
 const WalletUi = require('./core/ui/WalletUi')
 const BlockchainService = require('./core/blockchain/BlockchainService')
 const HttpService = require('./core/services/HttpService')

class Application {
     constructor(){
        this.setCurrency(CURRENCY)
        this.httpService = new HttpService(this)
        this.walletUi = new WalletUi(this)
        this.blockchain = new BlockchainService(this);
       
    }    

    prepareInterface(){
        this.walletUi.prepareInterface()
           }

    changeCurrency(currency){
        this.setCurrency(currency)
        this.prepareInterface()


    }
     setCurrency(currency){
        this.currency=currency

     }
    getCurrency(){
return this.currency
    }    

    getCurrentBalance(){
        return new Promise(async(resolve, reject) => {
            try {                 
               let balance = await this.blockchain.getCurrentBalance() 
                return resolve(balance)                           
            } catch (error) {
                return reject(error)
            }
        })
    }   
   
    getAddress(){
        return new Promise(async(resolve, reject) => {
            try {
                 let address = await this.blockchain.getAddress() 
                    return resolve(address)                   
            } catch (error) {
                return reject(error)
            }
        })
    }

   
    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
               let result = await this.blockchain.sendCurrency(to,amount)
                //document.getElementById('send_button').textContent = 'Success'                  
                console.log('result= ', result)
                
          return resolve(result);
                
            }catch (e){
                return reject(e);
            }
        })
    }
    generateMnemonic(){
        return new Promise(async(resolve,reject)=>{
            try{
                let result =await this.blockchain.generateMnemonic();
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    importMnemonic(mnemonic){
        return new Promise(async(resolve,reject)=>{
            try{             

                let result =await this.blockchain.importMnemonic(mnemonic);
                if(result != 0){
                    app.prepareInterface();
                }
                
                return resolve(result);
            }catch (e){
                return reject(e);
            }
        })
    }

    

}

document.getElementById('logo').addEventListener('click',()=>{
    alert("Please insert mnemonic");
})

document.getElementById('mainnet').addEventListener('click',()=>{
    location.reload()
})
document.getElementById('testnet').addEventListener('click',()=>{
    location.reload()
})


let app = new Application()



