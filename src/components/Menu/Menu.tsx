import { useState } from "react";
import { Title, Text, Button, Flex, NumberInput, Container, Avatar, Center, Group, Box } from '@mantine/core';
import classes from './Menu.module.css';
import { Link } from "react-router-dom";
import { desktopDir } from "@tauri-apps/api/path";
import { readBinaryFile, writeBinaryFile } from "@tauri-apps/api/fs";


export function Menu() {
  const [cantidad, setCantidad] = useState<string | number>('');
  const [tiempo, setTiempo] = useState(0);
  const [created, setCreated] = useState(false);
  const [guardado, setGuardado] = useState(false);
  const [dniBusqueda, setDniBusqueda] = useState<string | number>('');
  const [resultado, setResultado] = useState("a");

  function handleCreation(): void {

  }

  function handleBusqueda(): void {

  }

  function handleGuardado(filepath:string): void {
    setGuardado(true);
  }

  return (
      <Box 
      p={50} 
      className={classes.wrapper}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      <Button 
        pos='absolute' 
        left={{ base: '14%', sm: '20%'}}
        top={{ base: '2.5%', md: '7%'}}
        m='2%'
        className={classes.backb} 
        mt={20} 
        size="md" 
        radius="xl" 
        component={Link} 
        to="/"
      >
        Volver
      </Button>
      <Title mt={50} mb={50} className={classes.title}>
        Panel de Menu
      </Title>
      <Flex
        mb={20}
        mih={50}
        gap={90}
        justify="center"
        align="center"
        direction="row"
        wrap={{ base: 'wrap', sm: 'nowrap'}}
        style={{ width: '100%' }}
        >
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
          { resultado ? 
            <Flex
            mih={50}
            gap="md"
            justify="center"
            align="center"
            direction="row"
            wrap="wrap"
          >
            <Container>
                {resultado != "" ? 
                <>
                  <Text size="lg" className={classes.description}>
                      Nombres y Apellidos
                  </Text> 
                  <Group mb={20}>
                    <Text size="lg" className={classes.description}>
                      0292039202
                    </Text>
                    <Text size="lg" className={classes.description}>
                      Nacionalidad - Sexo
                    </Text>
                  </Group>
                  <Text size="lg" className={classes.description}>
                    Direccion: Ubicacion, Distrito, Ciudad
                  </Text> 
                  <Text size="lg" className={classes.description}>
                    Departamento, Provincia
                  </Text>
                  <Text size="lg" className={classes.description}>
                    Teléfono: 93838492
                  </Text>
                  <Text size="lg" className={classes.description}>
                    Correo: johndoe@example.com
                  </Text>
                  <Text size="lg" className={classes.description}>
                    Estado Civil: Soltero
                  </Text>
                </>
                :
                <></>
                }
            </Container>
            <Container>
                {resultado != "" ? 
                <>
                  <Center>
                    <Avatar variant="filled" radius={100} size={150} src="https://thispersondoesnotexist.com/" />;
                  </Center>
                </>
                :
                <></>
                }
            </Container>
          </Flex>
        :
        <></>
        }
      </Flex>
      <Center>

          <Button mt={50} size="md" radius="xl" ml={20}  onClick={() => handleGuardado("btree.dat")}>
              Guardar datos
            </Button>
        </Center>   
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
    </Flex>
    </Box>
  );
}