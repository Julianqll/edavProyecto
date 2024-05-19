import { useState } from "react";
import WebAssemblyWrapper from '../../wasm/adder_wasm.js';
import WebAssemblyBinary from '../../wasm/adder_wasm.wasm?url';
import { Title, Text, Button, Flex, NumberInput, Container, Avatar, Center } from '@mantine/core';
import classes from './Menu.module.css';
import { Link } from "react-router-dom";
import { desktopDir } from "@tauri-apps/api/path";
import { readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";

const wasmModuleInstance = WebAssemblyWrapper({
  locateFile: () =>{
    return WebAssemblyBinary;
  }
})


export function Menu() {
  const [cantidad, setCantidad] = useState<string | number>('');
  const [tiempo, setTiempo] = useState(0);
  const [created, setCreated] = useState(false);
  const [guardado, setGuardado] = useState(false);
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

  function handleGuardado(filepath:string): void {
    wasmModuleInstance.then(async (core: any) => {
      
        const desktop = await desktopDir();
        console.log(desktop);
        const filepathc = core.stringToNewUTF8(`${desktop}/btrees/${filepath}`);
          const res = core._pruebaGuardado(filepathc);
          if (res) {
            // Leer el archivo desde MEMFS
            //const contents = await readBinaryFile('/btree.dat');
            const fileContent = core.FS.readFile(`btree.dat`, { encoding: 'binary' });
            console.log("good");
            //await writeBinaryFile(filepathc, fileContent);
            //const filecreated = core.FS.writeFile('', fileContent);
                  // Lee el archivo desde MEMFS

            // Escribe el archivo en el disco utilizando Tauri
            await writeBinaryFile('C:/Users/user/Desktop/btrees/btree.dat', fileContent);

            // Actualiza el estado con el resultado del guardado
            setGuardado(res);
            //const fileContent = core.FS.readFile(`btree.dat`, { encoding: 'binary' });
    //
            //// Crear un blob con el contenido del archivo
            //const blob = new Blob([fileContent], { type: 'application/octet-stream' });
    //
            //// Crear un enlace de descarga
            //const link = document.createElement('a');
            //link.href = URL.createObjectURL(blob);
            //link.download = `${desktop}/btrees/${filepath}`;
    //
            //// Hacer clic en el enlace para iniciar la descarga
            //link.click();
        } else {
            console.error("Error al guardar el archivo en MEMFS.");
        }
        
        const fileContenta =  await readBinaryFile('C:/Users/user/Desktop/btrees/btree.dat');

        // Crear un archivo temporal en MEMFS para deserialización
        core.FS.writeFile("btreeread.dat", fileContenta, { encoding: 'binary' });

        // Llamar a la función de deserialización en C++
        const filepathcnew = core.stringToNewUTF8("btreeread.dat");
        const newres =core._pruebaCargado(filepathcnew);
        setGuardado(newres);
    })
  }

  return (
    <div className={classes.wrapper}>
    <div className={classes.inner}>
      <Title className={classes.title}>
        Panel de menu
      </Title>
      <Flex
        mt={50}
        mih={50}
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Container>
        {!created ? 
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
             Crear
         </Button>
          </Flex>  
        :
        <></>
        }
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
          </Flex> 
        :
        <></>
        }
        <Center>
          <Button mt={50} size="md" radius="xl" component={Link} to="/">
            Volver
          </Button>
          {created ? 
            <Button mt={50} size="md" radius="xl" ml={20}  onClick={() => handleGuardado("btree.dat")}>
              Guardar datos
            </Button>
          :
          <></>
          }
        </Center>   
        <br />
        <Center>
          {guardado ? 
            <Text size="lg" className={classes.description}>
              Datos fueron guardados
            </Text> 
            :
            <Text size="lg" className={classes.description}>
              Aun no se guardan los datos
            </Text> 
            }
        </Center>
        </Container>
        { resultado ? 
            <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Container>
                {resultado != "" ? 
                <>
                  <Text size="lg" className={classes.description}>
                    Resultado de la busqueda:
                  </Text> 
                  <Text size="lg" className={classes.description}>
                    {resultado}
                  </Text>
                </>
                :
                <></>
                }
                <Center>
                  <Avatar variant="filled" radius={100} size={150} src="https://thispersondoesnotexist.com/" />;
                </Center>
            </Container>
          </Flex>
        :
        <></>
        }
    </Flex>
    </div>
    </div>
  );
}