   
        const options = ["mainnet", "testnet"];
        const selectedOption = window.prompt(`Please select the Network and Login with your Mnemonic phrase:\n\n${options.join("\n")}`);

        if (selectedOption === null || !options.includes(selectedOption)) {
            // Display an error message and exit the program
            window.alert("Invalid option selected. Program terminated.");
          } else {
            // Run the program using the selected option
            if(selectedOption == 'mainnet'){
                const element = document.getElementById("mainnet");
                element.classList.replace("text-gray-500", "text-green-500");
                element.classList.add("border-b-4","border-green-500" );
                const elementT = document.getElementById("testnet");
                elementT.classList.replace("text-green-500", "text-gray-500");
                elementT.classList.remove("border-b-4","border-green-500" );
                net = selectedOption=='mainnet'?true: false;
            }
            if(selectedOption == 'testnet'){
                const element = document.getElementById("testnet");
                element.classList.replace("text-gray-500", "text-green-500");
                element.classList.add("border-b-4","border-green-500" );
                const elementT = document.getElementById("mainnet");
                elementT.classList.replace("text-green-500", "text-gray-500");
                elementT.classList.remove("border-b-4","border-green-500" );
                net = selectedOption=='mainnet'?true: false;
            }
          }

   net = selectedOption=='mainnet'?true: false;
   
module.exports = net