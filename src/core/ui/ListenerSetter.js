class ListenerSetter{

    constructor(app){
        this.app = app
            }
    
    setEventListeners(){
        this.setSendListener()
        this.setChangeCurrencyListener()
        this.setMnemonicListeners()
        //this.setChangeNetListener()
       
    }

    setSendListener(){
               
        document.getElementById('send_button').addEventListener('click', async (MouseEvent)=>{
                    
                    let to =  document.getElementById('addressTo').value
                     let amount = document.getElementById('amount').value
                     document.getElementById('send_button').textContent = 'Sending...'
                     document.getElementById('send_button').classList.add("bg-green-500", "hover:bg-green-700");
                     //document.getElementById('send_button').classList.remove("bg-blue-500", "hover:bg-blue-700");
                     //console.log(document.getElementById('send_button'))
                     document.getElementById('spin').classList.remove('hidden')
                     document.getElementById('spin').classList.add('inline')
                     let result =  await this.app.sendCurrency(to,amount)
                     //document.getElementById('send_button').textContent = 'Success'
                      alert(result);
                      
                     //location.reload() 
                     document.getElementById('send_button').textContent = 'Send Now'
                      document.getElementById('send_button').classList.remove("bg-green-500", "hover:bg-green-700");
                      document.getElementById('spin').classList.add('hidden')
                      document.getElementById('spin').classList.remove('inline')
                    //  document.getElementById('send_button').classList.add( "hover:bg-blue-700");
                     //"bg-blue-500",
                     document.getElementById('addressTo').value = ""
                     document.getElementById("amount").value = ""
                     
                     this.app.changeCurrency(this.app.getCurrency())

        })
    }

//    setChangeNetListener(){
   
//         // main menu change currency
//         const elements = document.querySelectorAll("#net");
//         //console.log(elements)   
//         for (let i = 0; i < elements.length; i++) {
//             elements[i].addEventListener("click", (event) => {

//                 for (let t = 0; t < elements.length; t++) {
//                     if (elements[t].classList.contains("text-green-500")) {
//                         elements[t].classList.replace("text-green-500", "text-gray-500");
//                         elements[t].classList.remove("border-b-4","border-green-500" );
//                        }  
                       
//                     //    if (elementsM[t].classList.contains("bg-green-500")) {
//                     //     elementsM[t].classList.remove('bg-green-500' );
//                     //       }                      
//                  }
                
               
//                       elements[i].classList.replace("text-gray-500", "text-green-500");
//                       elements[i].classList.add("border-b-4","border-green-500" );

//                       //elementsM[i].classList.add('bg-green-500' );
                      
//                       let el = event.target;
//                       //console.log(el) 
//                       let net = el.getAttribute("data-value")
//                      console.log('el.getAttribute("data-value")', net);
//                       this.app.changeNet(net);
//                       //console.log("currency=",currency);            
                
//             })
        
//         }
//    }

  
 
    setChangeCurrencyListener(){
        // main menu change currency
        const elements = document.querySelectorAll("#symbol");
        //console.log(elements)   
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
                      //console.log(el) 
                      let currency = el.getAttribute("data-value")
                    // console.log(currency);
                      this.app.changeCurrency(currency);
                      //console.log("currency=",currency);            
                
            })
        
        }
           // mobile menu change currency
        //class=" block text-sm px-2 py-4 text-white border-b-4 border-green-500 font-semibold"
        const elementsM = document.querySelectorAll("#symbolM");
        //console.log(elements)   
        for (let i = 0; i < elementsM.length; i++) {
            elementsM[i].addEventListener("click", (event) => {

                for (let t = 0; t < elementsM.length; t++) {
                    if (elementsM[t].classList.contains("bg-green-500")) {
                        elementsM[t].classList.remove('bg-green-500' );
                                                
                }
                if (elements[t].classList.contains("text-green-500")) {
                    elements[t].classList.replace("text-green-500", "text-gray-500");
                    elements[t].classList.remove("border-b-4","border-green-500" );
                    //elements[t].classList.toggle("border-green-500");
                            
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
        
          //let mnemonic = document.getElementById("import-mnemonic").value
          document.getElementById("submit-mnemonic").addEventListener("click",async()=>{
            
            
            this.submitMnemonic()
            document.getElementById('loginForm').classList.toggle('hidden')
            
        })

    }

   
   
}

module.exports = ListenerSetter;