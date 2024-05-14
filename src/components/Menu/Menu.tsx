import { useState } from "react";
import WebAssemblyWrapper from '../../wasm/adder_wasm.js';
import WebAssemblyBinary from '../../wasm/adder_wasm.wasm?url';
import { Title, Text, Button, Flex, NumberInput } from '@mantine/core';
import classes from './Menu.module.css';

const wasmModuleInstance = WebAssemblyWrapper({
  locateFile: () =>{
    return WebAssemblyBinary;
  }
})


export function Menu() {
  const [order, setOrder] = useState<string | number>('');
  const [value, setValue] = useState<string | number>('');
  const [andres, setAndres] = useState<string | number>('');
  const [pruebaAndres, setPruebaAndres] = useState(0);
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
        if (res) {
            const resultPtr = core._traverseTreeF();
            const resultStr = core.UTF8ToString(resultPtr); // Convertir el puntero a cadena UTF-8
            setTraverse(resultStr);
        }
    })
  }

  function handleAndres(): void {
    wasmModuleInstance.then((core: any) => {
        const res = core._pruebaAndres(andres);
        setPruebaAndres(res);
    })
  }


  return (
    <div className={classes.wrapper}>
    <div className={classes.inner}>
      <Title className={classes.title}>
        Panel de menu
      </Title>
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >

        <Text size="lg" className={classes.description}>
          Cantidad de datos
        </Text> 
        <NumberInput
          variant="filled"
          size="sm"
          radius="md"
          placeholder="Input placeholder"
          value={andres}
          onChange={setAndres}
        />
        <Button size="md" radius="xl" onClick={() => handleAndres()}>
            Probar
        </Button>
        <Text size="lg" className={classes.description}>
         Se demoró {pruebaAndres} milisegundos
        </Text> 
      </Flex>     

    </div>
    </div>
  );
}