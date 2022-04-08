import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
// mport {
//   Connection,
//   LAMPORTS_PER_SOL,
//   PublicKey,
//   SystemProgram,
// } from "@solana/web3.js";i

import DEMO from "./DEMO";
const { gomobileServices } = require("incognito-chain-web-js/build/wallet");

// let solana: any = undefined;

// window.addEventListener("solana#initialized", function (event) {
//   // @ts-ignore
//   solana = window.solana;
//   solana.on("stateChanged", async (state: any) => {
//     console.log(" stateChanged => ", state);

//     if (state.state === "unlocked") {
//       const { cluster } = await solana.request({
//         method: "wallet_getCluster",
//         params: {},
//       });
//       const connection = new Connection(cluster.endpoint);

//       await sendTransaction(connection);
//     }
//   });
// });

// async function sendTransaction(connection: any) {
//   let { accountResult } = await solana.request({
//     method: "wallet_requestAccounts",
//     params: {},
//   });
//   const accounts = accountResult.accounts as string[];

//   const transaction = SystemProgram.transfer({
//     fromPubkey: new PublicKey(accounts[0]),
//     toPubkey: new PublicKey(accounts[0]),
//     lamports: 2 * LAMPORTS_PER_SOL,
//   });

// const { blockhash } = await connection.getRecentBlockhash();
// transaction.recentBlockhash = blockhash;

// const message = bs58.encode(transaction.serializeMessage());
// const { result } = await solana.request({
//   method: "wallet_signTransaction",
//   params: { message: message, signer: accounts },
// });

// result.signatureResults.forEach((signatureResult: any) => {
//   transaction.addSignature(
//     new PublicKey(signatureResult.publicKey),
//     bs58.decode(signatureResult.signature)
//   );
// });

// let transactionID = await connection.sendRawTransaction(
//   transaction.serialize()
// );
// await connection.confirmTransaction(transactionID);
// }

function App() {
  const test = async () => {
    try {
      console.log("11 TYPE ", typeof gomobileServices.loadWasm);
      if (typeof gomobileServices.loadWasm === "function") {
        await gomobileServices.loadWasm("http://localhost:3000/privacy.wasm");
      }
      const result = await DEMO.setupWallet();

      console.log("result ", result);
      // const pdex3Instance = result.pDexV3Instance;
      // const balanceResult = await accountSender.getBalance({
      //   tokenID:
      //     "0000000000000000000000000000000000000000000000000000000000000004",
      //   version: 2,
      // });
      // console.log("balanceResult ", balanceResult);
    } catch (error) {
      console.log("3 error: ", error);
    }
  };
  useEffect(() => {
    test();
  }, []);

  const loginOnPressed = () => {
    console.log("loginOnPressed  TO DO ");
  };
  const getBalance = () => {
    console.log("getBalance  TO DO ");
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Button onClick={loginOnPressed} variant="contained">
          Login
        </Button>
        <p />
        {/* <label>AAA </label> */}
        <p />
        <Button onClick={getBalance} variant="contained">
          Get Balance
        </Button>
      </header>
    </div>
  );
}

export default App;
