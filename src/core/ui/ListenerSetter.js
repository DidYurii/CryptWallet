class ListenerSetter{

    constructor(app){
        this.app = app
            }
    
    setEventListeners(){
        this.setSendListener()
        this.setChangeCurrencyListener()
        this.setMnemonicListeners()
             
    }

    setSendListener(){
               
        document.getElementById('send_button').addEventListener('click', async (MouseEvent)=>{
                    
                    let to =  document.getElementById('addressTo').value
                     let amount = document.getElementById('amount').value
                     document.getElementById('send_button').textContent = 'Sending...'
                     document.getElementById('send_button').classList.add("bg-green-500", "hover:bg-green-700");
                     document.getElementById('spin').classList.remove('hidden')
                     document.getElementById('spin').classList.add('inline')
                     let result =  await this.app.sendCurrency(to,amount)
                          alert(result);
                      document.getElementById('send_button').textContent = 'Send Now'
                      document.getElementById('send_button').classList.remove("bg-green-500", "hover:bg-green-700");
                      document.getElementById('spin').classList.add('hidden')
                      document.getElementById('spin').classList.remove('inline')
                      document.getElementById('addressTo').value = ""
                      document.getElementById("amount").value = ""
                     
                     this.app.changeCurrency(this.app.getCurrency())

        })
    }

 
    setChangeCurrencyListener(){
        // main menu change currency
        const elements = document.querySelectorAll("#symbol");
               for (let i = 0; i < elements.length; i++) {
            elements[i].addEventListener("click", (event) => {

                for (let t = 0; t < elements.length; t++) {
                    if (elements[t].classList.contains("text-green-500")) {
                        elements[t].classList.replace("text-green-500", "text-gray-500");
                        elements[t].classList.remove("border-b-4","border-green-500" );
                       }  
                       
                       if (elementsM[t].classList.contains("bg-green-500")) {
                        elementsM[t].classList.remove('bg-green-500' );
                          }                      
                 }
                
               
                      elements[i].classList.replace("text-gray-500", "text-green-500");
                      elements[i].classList.add("border-b-4","border-green-500" );
                      elementsM[i].classList.add('bg-green-500' );
                      let el = event.target;
                      let currency = el.getAttribute("data-value")
                      this.app.changeCurrency(currency);
                                })
        
        }
           // mobile menu change currency
               const elementsM = document.querySelectorAll("#symbolM");
               for (let i = 0; i < elementsM.length; i++) {
            elementsM[i].addEventListener("click", (event) => {

                for (let t = 0; t < elementsM.length; t++) {
                    if (elementsM[t].classList.contains("bg-green-500")) {
                        elementsM[t].classList.remove('bg-green-500' );
                                                
                }
                if (elements[t].classList.contains("text-green-500")) {
                    elements[t].classList.replace("text-green-500", "text-gray-500");
                    elements[t].classList.remove("border-b-4","border-green-500" );
                                         
            }

            }
            elements[i].classList.replace("text-gray-500", "text-green-500");
            elements[i].classList.add("border-b-4","border-green-500" );

                      elementsM[i].classList.add('bg-green-500' );
                       let el = event.target;
                       let currency = el.getAttribute("data-value")
                       this.app.changeCurrency(currency);
                               
                
            })
        
        }

    }
    setMnemonicListeners(){
        this.setGenerateMnemonicListener();
        this.setImportMnemonicOnInputListener();
    }

    setGenerateMnemonicListener(){
        document.getElementById("generate-mnemonic").addEventListener("click",async()=>{
            let mnemonic = await this.app.generateMnemonic();
            alert(mnemonic);
        })
    }

 submitMnemonic(){
            let mnemonic = document.getElementById("import-mnemonic").value;
            this.app.importMnemonic(mnemonic)
            document.getElementById("import-mnemonic").value = ""
            
          }
    setImportMnemonicOnInputListener(){
        
             document.getElementById("submit-mnemonic").addEventListener("click",async()=>{
             this.submitMnemonic()
            document.getElementById('loginForm').classList.toggle('hidden')
            
        })

    }

   
   
}

module.exports = ListenerSetter;