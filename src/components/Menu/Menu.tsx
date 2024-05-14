import { useState } from "react";
import WebAssemblyWrapper from '../../wasm/adder_wasm.js';
import WebAssemblyBinary from '../../wasm/adder_wasm.wasm?url';
import { Title, Text, Container, Button, Flex, NumberInput } from '@mantine/core';
import classes from './Menu.module.css';

const wasmModuleInstance = WebAssemblyWrapper({
  locateFile: () =>{
    return WebAssemblyBinary;
  }
})


export function Menu() {
  const [order, setOrder] = useState<string | number>('');
  const [value, setValue] = useState<string | number>('');

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
    <div className={classes.wrapper}>
    <div className={classes.inner}>
      <Title className={classes.title}>
        Panel de menu
      </Title>

      <div>
        {created ?   
          <Text size="lg" className={classes.description}>
            ¡Btree creado!
          </Text>       
          :
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Text size="lg" className={classes.description}>
                Ingrese el orden
              </Text> 
              <NumberInput
                variant="filled"
                size="sm"
                radius="md"
                placeholder="Input placeholder"
                value={order}
                onChange={setOrder}
              />
              <Button size="md" radius="xl" onClick={() => handleOrder()}>
                  Crear
              </Button>
            </Flex>     
      }
      </div>

     
      {created ? 
      <Flex
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="column"
        wrap="wrap"
      >
        <Text size="lg" className={classes.description}>
          Añada un valor
        </Text> 
        <NumberInput
          variant="filled"
          size="sm"
          radius="md"
          placeholder="Input placeholder"
          value={value}
          onChange={setValue}
        />
        <Button size="md" radius="xl" onClick={() => handleInsert()}>
          Insertar
        </Button>
        <br />
        <Text size="lg" className={classes.description}>
          Arbol:
        </Text> 
        <Text size="lg" className={classes.description}>
          {traverse}
        </Text> 
      </Flex>  
      :
      <></>
      }
    </div>
    </div>
  );
}