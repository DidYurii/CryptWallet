const EthLib = require('../eth/EthLib')
const Converter = require('/src/core/helpers/Erc20Converter')
const ERC20_ABI = require('./erc20_abi');
const contractAddress = process.env.ERC20_CONTRACT_ADDRESS   
const GAS_LIMIT = 300000;
const DECIMALS = 8



class ERC20Lib extends EthLib {
    constructor(app){
        super(app)
        this.setContract()
        this.converter = new Converter()
    }

    setContract(){
        this.contract = this.composeContract()
    }

    composeContract(){
        let contract = new this.provider.eth.Contract(ERC20_ABI, this.getContractAddress())
        return contract
    }

    getContractAddress(){
        console.log('getContractAddress()==',contractAddress )
        return contractAddress
    }

    getContract(){
        return this.contract
    }

    getCurrentBalance(){
        return new Promise(async(resolve,reject)=>{
            try {
                
                let address = await this.getAddress()
                let balance = await this.getBalance(address)
                return resolve(balance)
            } catch (error) {
                return reject(error) 
            }
        })
    }

    getBalance(address){
        return new Promise(async(resolve,reject)=>{
            try { 
                this.validator.validateAddress(address);
                 let balance = await this.getContract().methods.balanceOf(address).call();
                 balance = this.toDecimals(balance)
                return resolve(balance)
            } catch (error) {
                return reject(error)
            }
        })
    }

    getGasLimit(){
        return GAS_LIMIT
    }

    sendCurrency(to,amount){
        return new Promise(async(resolve,reject)=>{
            try{
                console.log('getContractAddress()=', this.getContractAddress())
                amount = this.fromDecimals(amount);
                let data = this.getContract().methods.transfer(to, amount).encodeABI();
                console.log("sendCurrency data",data);
                let txData = await this._formatTransactionsParams(this.getContractAddress(),"0",data);
                let hash = await this._sendTransaction(txData);
                return resolve(hash);
            }catch (e){
                return reject(e);
            }
        });
    }


    toDecimals(amount){
        return this.converter.toDecimals(amount,this.getDecimals())
    }
    fromDecimals(amount){
        return this.converter.fromDecimals(amount,this.getDecimals());
    }
    getDecimals(){
        return DECIMALS
    }
 }
module.exports = ERC20Lib;
