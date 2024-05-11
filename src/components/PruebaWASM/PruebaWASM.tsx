import { useState } from "react";
import reactLogo from "../../assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "../../App.css";
import WebAssemblyWrapper from '../../wasm/adder_wasm.js';
import WebAssemblyBinary from '../../wasm/adder_wasm.wasm?url';

const wasmModuleInstance = WebAssemblyWrapper({
  locateFile: () =>{
    return WebAssemblyBinary;
  }
})


export function PruebaWASM() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [numbers, setNumbers] = useState({a:0, b:0});
  const [result, setResult] = useState(0);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  function handleClick(): void {
    wasmModuleInstance.then((core:any)=>{
      console.log("a",numbers.a);
      console.log("b",numbers.b);
      const res = core._create();
      console.log(res);
    })
  }

  return (
    <div className="container">
      <h1>Proyecto de EDAV</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>

      <div>
        <input
          type="number"
          onChange={e=>setNumbers({...numbers, a: parseInt(e.currentTarget.value)})}
        />
        <input
          type="number"
          onChange={e=>setNumbers({...numbers, b: parseInt(e.currentTarget.value)})}
        />
        <button onClick={() => handleClick()}></button>
        <br />
        <p>Result: {result}</p>
      </div>
    </div>
  );
}