import { useEffect, useState } from "react";
import { Title, Text, Button, Flex, NumberInput, Container, Avatar, Center, Group, Box, LoadingOverlay, Loader } from '@mantine/core';
import classes from './Menu.module.css';
import { Link, useLocation } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import { createTree, deserializeTree, searchTree } from '../../services/api';

export function Menu() {
  const [tiempoCreado, setTiempoCreado] = useState<number | undefined>();
  const [tiempoLeido, setTiempoLeido] = useState<number | undefined>();

  const [tiempoCargado, setTiempoCargado] = useState<number | undefined>();

  const [dniBusqueda, setDniBusqueda] = useState<string | number>('');
  const [resultado, setResultado] = useState<string | null>("");

  //falta para agregar
  //falta para eliminar

  const [guardado, setGuardado] = useState(false);

  const [visible, { open, close }] = useDisclosure(false);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  const fetchData = async (selectedFile : string, fileType: string) => {
    // Mostrar el overlay de carga  
    try {
      // Llamar al api
      //let apiResponse;
      if (fileType === "binary"){
      //  //apiResponse = await deserializeTree();
      setTiempoCargado(5);
      }
      else {
      //  //apiResponse = await createTree();
      // actualiza estados con respuesta
        setTiempoLeido(5);
        setTiempoCreado(5);
      }
      console.log("Llamada a API");
    } catch (error) {
      setError('Ocurrió un Error');
    }
  }; 

  function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const fetchInitialData = async () => {
      if (location.state) {
        console.log('recibidos');

        if (location.state.selectedFile && location.state.fileType) {
            open(); 
            await sleep(3000);
            fetchData(location.state.selectedFile, location.state.fileType);
            close();
        }
      }
    };

    fetchInitialData();
  }, []);
  

  async function handleBusqueda(): Promise<void> {
    //let apiResponse = await searchTree(String(dniBusqueda));
    console.log(dniBusqueda);
    setResultado('Prueba');
  }

  function handleGuardado(filepath: string): void {
    setGuardado(true);
  }

  return (
    <Box 
      pos="relative"
      p={50} 
      className={classes.wrapper}
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <LoadingOverlay  
        visible={visible} 
        zIndex={1000} 
        styles={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
          },
        }}
        overlayProps={{ 
          radius: "sm", 
          blur: 2 ,

        }}
      />      
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
            {tiempoCargado != null ? 
              <>
                <Text size="lg" className={classes.description}>
                  El arbol fue cargado en {tiempoCargado} milisegundos
                </Text> 
              </>
              :
              <></>
            }   
            {tiempoCreado != null ? 
              <>
                <Text size="lg" className={classes.description}>
                  El archivo fue leído en {tiempoLeido} milisegundos
                </Text> 
                <Text size="lg" className={classes.description}>
                  El arbol fue creado en {tiempoCreado} milisegundos
                </Text> 
              </>
              :
              <></>
            }
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
            <Group>
              <Button size="md" radius="xl" onClick={() => handleBusqueda()}>
                Buscar
              </Button>
              <Button size="md" color="yellow" radius="xl" onClick={() => handleBusqueda()}>
                Agregar
              </Button>
              <Button size="md" color="red" radius="xl" onClick={() => handleBusqueda()}>
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
                {resultado !== "" ? 
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
                  null
                }
              </Container>
              <Container>
                {resultado !== "" ? 
                  <>
                    <Center>
                      <Avatar variant="filled" radius={100} size={150} src="https://thispersondoesnotexist.com/" />
                    </Center>
                  </>
                  :
                  null
                }
              </Container>
            </Flex>
            :
            null
          }
        </Flex>
        <Center>
          <Button mt={50} size="md" color="green" radius="xl" ml={20} onClick={() => handleGuardado("btree.dat")}>
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
