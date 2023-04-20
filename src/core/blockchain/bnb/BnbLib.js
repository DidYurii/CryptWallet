const Web3 = require('web3');
const EthLib = require('/src/core/blockchain/eth/EthLib');
const BnbValidator = require('/src/core/validators/blockchain/BnbValidator')
const BnbConverter = require('/src/core/helpers/BnbConverter');
let PROVIDER_URL_MAIN = process.env.BNB_PROVIDER_URL
let PROVIDER_URL_TEST = process.env.BNB_PROVIDER_URL_TEST


const isProduction = require('/src/isProduction')
class BnbLib extends EthLib{
    constructor(app) {
        let PROVIDER_URL = isProduction? PROVIDER_URL_MAIN:PROVIDER_URL_TEST;
        console.log('let PROVIDER_URL =',PROVIDER_URL )
        super(app);
        this.validator = new BnbValidator();
        this.converter = new BnbConverter();
        this.provider = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
    }

    _getChainId(){
        let chainId = isProduction?56:97;
        console.log('chainId', chainId)
        //return this.app.isProduction()?1:11155111;
        //return 11155111
        return chainId
    }
}
module.exports = BnbLib;

