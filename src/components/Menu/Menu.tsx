import { useState } from "react";
import WebAssemblyWrapper from '../../wasm/adder_wasm.js';
import WebAssemblyBinary from '../../wasm/adder_wasm.wasm?url';
import { Title, Text, Button, Flex, NumberInput, Container, Avatar, Center, Group } from '@mantine/core';
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
    setGuardado(true);
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
        {created ? 
          <Flex
            mih={50}
            gap="sm"
            justify="center"
            align="center"
            direction="column"
            wrap="wrap"
          >
            <Text size="lg" className={classes.description}>
              El arbol fue creado en {tiempo} milisegundos
            </Text> 
            <br />
            <Text size="lg" className={classes.description}>
              Ingrese el DNI del ciudadano
            </Text> 
            <NumberInput
              variant="filled"
              size="sm"
              radius="md"
              placeholder="Ingrese numero de DNI"
              value={dniBusqueda}
              onChange={setDniBusqueda}
            />
            <br />
            <Group
            >
              <Button size="md" radius="xl" onClick={() => handleBusqueda()}>
                  Buscar
              </Button>
              <Button size="md" radius="xl" onClick={() => handleBusqueda()}>
                  Agregar
              </Button>
              <Button size="md" radius="xl" onClick={() => handleBusqueda()}>
                  Eliminar
              </Button>
            </Group> 
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