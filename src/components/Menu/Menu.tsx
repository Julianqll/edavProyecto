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
  const [cantidad, setCantidad] = useState<string | number>('');
  const [tiempo, setTiempo] = useState(0);
  const [created, setCreated] = useState(false);
  const [dniBusqueda, setDniBusqueda] = useState<string | number>('');
  const [resultado, setResultado] = useState("");

  //function handleInsert(): void {
  //  wasmModuleInstance.then((core: any) => {
  //      const res = core._insertToTree(value);
  //      if (res) {
  //          const resultPtr = core._traverseTreeF();
  //          const resultStr = core.UTF8ToString(resultPtr); // Convertir el puntero a cadena UTF-8
  //          setTraverse(resultStr);
  //      }
  //  })
  //}

  function handleCreation(): void {
    wasmModuleInstance.then((core: any) => {
        const res = core._pruebaCreacion(cantidad);
        setCreated(true);
        setTiempo(res);
    })
  }

  function handleBusqueda(): void {
    wasmModuleInstance.then((core: any) => {
        const res = core._pruebaBusqueda(dniBusqueda);
        const resultStr = core.UTF8ToString(res); // Convertir el puntero a cadena UTF-8
        setResultado(resultStr);
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
          placeholder="Ingrese un número"
          value={cantidad}
          onChange={setCantidad}
        />
        <Button size="md" radius="xl" onClick={() => handleCreation()}>
            Probar
        </Button>
      </Flex>  

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
                Se demoró {tiempo} milisegundos en crear el arbol con {cantidad} datos.
              </Text> 
              <br />
              <Text size="lg" className={classes.description}>
                Numero de DNI a buscar
              </Text> 
              <NumberInput
                variant="filled"
                size="sm"
                radius="md"
                placeholder="Ingrese numero de DNI"
                value={dniBusqueda}
                onChange={setDniBusqueda}
              />
              <Button size="md" radius="xl" onClick={() => handleBusqueda()}>
                  Buscar
              </Button>
              <br />
              {resultado != "" ? 
              <Text size="lg" className={classes.description}>
                Resultado de la busqueda: {resultado}
              </Text> 
              :
              <></>
              }

            </Flex> 
        :
        <></>
        }   

    </div>
    </div>
  );
}