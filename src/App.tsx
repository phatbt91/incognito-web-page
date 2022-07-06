import React, {useEffect, useState} from "react";
import "./App.css";
import MainRoute from "./MainRoute/MainRoute";
const { init } = require("incognito-chain-web-js/build/web/wallet");

function App() {

  const [wasmLoaded, setWasmLoaded] = React.useState<boolean>(false)

  // First load wasm configs
  const loadWasmConfig = async (): Promise<void | Error> => {
    try {
      setWasmLoaded(false)
      // Load wasm config
      // Set shard number and config worker
      await init(null, 8);
    } catch (error) {
      console.log("LOAD WASM CONFIG ERROR: ", error);
    } finally {
      setWasmLoaded(true)
    }
  };

  useEffect(() => {
    loadWasmConfig().then();
  }, []);

  return (
      <div className="App">
        <header className="App-header">
          {wasmLoaded ? <MainRoute /> : <div>Loading Wasm</div>}
        </header>
      </div>
  );
}

export default App;
