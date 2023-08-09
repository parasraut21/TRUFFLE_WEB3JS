// import React, { useState, useEffect } from "react";
// import getWeb3 from "./getWeb3"; 
// import SimpleStorage from "./contracts/SimpleStorage.json"; 


// const App = () => { 
//   const [state, setState] = useState({ web3: null, contract: null, }); 
//   const [storageValue, setStorageValue] = useState(null);

// useEffect(() => {
//    const init = async () => { 
//      try { 
//        const web3 = await getWeb3();

//     const networkId = await web3.eth.net.getId();
//     const deployedNetwork = SimpleStorage.networks[networkId];
//     console.log(deployedNetwork.address);
//     const instance = new web3.eth.Contract(
//       SimpleStorage.abi,
//       deployedNetwork && deployedNetwork.address
//     );

//     setState({ web3, contract: instance });
//   } catch (error) {
//     alert(
//       "Failed to load web3, accounts, or contract Check console for details."
//     );
//     console.error(error);
//   }
// };
// init();
// }, []);

// useEffect(() => { 
//   async function getValue() { 
//     const { contract } = state; 
//     const value = await contract.methods.get().call();
//      setStorageValue(value); } state.contract && getValue();
//      }, [state,state.contract]);

// return (
//   <div className="App" >
//     <div>
//       The stored value is : {storageValue}
//     </div>
//   </div>

// ); };
// export default App;

import React, { useState, useEffect } from "react";
import Web3 from "web3";
import SimpleStorage from "./contracts/SimpleStorage.json";

const App = () => {
  const [state, setState] = useState({ web3: null, contract: null });
  const [storageValue, setStorageValue] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        // Connect to the Web3 provider
        if (window.ethereum) {
          await window.ethereum.enable();
          const web3 = new Web3(window.ethereum);
          setState({ web3 });

          const networkId = await web3.eth.net.getId();
          const deployedNetwork = SimpleStorage.networks[networkId];

          if (deployedNetwork) {
            const instance = new web3.eth.Contract(
              SimpleStorage.abi,
              deployedNetwork.address
            );
            setState((prevState) => ({ ...prevState, contract: instance }));
          } else {
            console.error("Contract not deployed on the current network");
          }
        } else {
          console.error("Web3 provider not detected");
        }
      } catch (error) {
        alert("Failed to load web3, accounts, or contract. Check console for details.");
        console.error(error);
      }
    };

    init();
  }, []);

  useEffect(() => {
    async function getValue() {
      const { contract } = state;
      if (contract) {
        const value = await contract.methods.get().call();
        setStorageValue(value);
      }
    }

    getValue();
  }, [state.contract]);

  return (
    <div className="App">
      <div>The stored value is: {storageValue}</div>
    </div>
  );
};

export default App;

