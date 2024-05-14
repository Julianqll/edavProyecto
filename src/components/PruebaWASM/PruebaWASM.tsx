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
  const [order, setOrder] = useState(0);
  const [value, setValue] = useState(0);
  const [created, setCreated] = useState(false);
  const [traverse, setTraverse] = useState("");

  function handleOrder(): void {
    wasmModuleInstance.then((core:any)=>{
      const res = core._createTree(order);
      setCreated(res);
    })
  }

  function handleInsert(): void {
    wasmModuleInstance.then((core: any) => {
        const res = core._insertToTree(value);
        console.log(res);
        if (res) {
            const resultPtr = core._traverseTreeF();
            const resultStr = core.UTF8ToString(resultPtr); // Convertir el puntero a cadena UTF-8
            setTraverse(resultStr);
        }
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

      <div
        className="row"
      >
        {created ?          
        <p>Btree creado!</p>:
          <>
          <p>Ingrese el orden</p>
            <input
            type="number"
            onChange={e=>setOrder( parseInt(e.currentTarget.value))}
          />
          <button onClick={() => handleOrder()}></button>
          </>         
      }
      </div>

     
      {created ? 
      <>
        <div>
        <p>Añada un valor</p>
            <input
            type="number"
            onChange={e=>setValue(parseInt(e.currentTarget.value))}
          />
        <button onClick={() => handleInsert()}></button>
        <br />
        <p>Arbol: {traverse}</p>
      </div>
      </>
      :
      <></>
      }
    </div>
  );
}