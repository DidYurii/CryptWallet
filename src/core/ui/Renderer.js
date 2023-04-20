const { values } = require("../blockchain/erc20/erc20_abi")


class Renderer{
       constructor(app){
        this.app = app
       //Renderer.addEventListeners()
        //this.listenerSetter.setEventListeners()
        this.qrcode = new QRCode("qrcode");
       }


    renderUI(){
        this.renderCurrency()
        this.renderBalance()
        this.renderAddress()
        //this.renderMakeCode()
    }

    renderCurrency(){
        let elements = document.getElementsByClassName('currency_symbol')
        for (let index = 0; index < elements.length; index++) {
            let element = elements[index];
            element.innerHTML = this.app.getCurrency()
            
        }
    }

    renderBalance(){
        let element = document.getElementById('balance_text')
        
        this.app.getCurrentBalance().then((balance) =>{
            element.innerHTML = balance 
         })

                
    }
     
    renderAddress(){
        let element = document.getElementById('address_text');
        let oldAddr = element.innerHTML
        console.log('oldAddr= ',oldAddr )
       
        this.app.getAddress().then((address) => {
            let newaddress = address
            console.log('address= ',newaddress )

            
          element.innerHTML = newaddress;
        
           
               this.renderMakeCode(newaddress)

                 
          
       

        })
        
    }

renderMakeCode(address){
                       
          this.qrcode.makeCode(address)

        }
}
    
   


module.exports = Renderer;