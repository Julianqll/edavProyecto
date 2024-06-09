import { Title, Text, Container, Flex, Box, Avatar, Center, rem, Button } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';
import { IconFileDatabase, IconFileDescription } from '@tabler/icons-react';

export function HeroImageBackground() {
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
      <Title mt={20} mb={50} className={classes.title}>
        Proyecto final de EDAV
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
          <div>
            <Center>
            <Avatar variant="transparent" color="blue" radius="xl" size={100}>
              <IconFileDescription style={{ width: rem(75), height: rem(75) }} stroke={1.3}/>
            </Avatar>
            </Center>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Container size={640}>
                <Title mt={20} className={classes.subtitle}>
                  Cargar archivo de texto
                </Title>
                <Box maw={400}>
                  <Text size="lg" className={classes.description}>
                    Selecciona un archivo no procesado con los datos de los ciudadanos en formato de texto (.txt)
                    para su procesamiento y posterior gestión en la aplicación
                  </Text>
                </Box>
              </Container>
              <Button size="md" radius="xl">
                Seleccionar archivo
              </Button>
            </Flex>
          </div>        
          <div>
            <Center>
              <Avatar variant="transparent" color="blue" radius="xl" size={100}>
                <IconFileDatabase style={{ width: rem(75), height: rem(75) }} stroke={1.3}/>
              </Avatar>
            </Center>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="column"
              wrap="wrap"
            >
              <Container size={640}>
                <Title mt={20} className={classes.subtitle}>
                  Cargar archivo binario
                </Title>
                <Box maw={400}>
                  <Text size="lg" className={classes.description}>
                    Selecciona un archivo procesado previamente con los datos de los ciudadanos en formato binario (.bin)
                    para gestionar los datos mediante la aplicación
                  </Text>
                </Box>
              </Container>
              <Button size="md" radius="xl">
                Seleccionar archivo
              </Button>
            </Flex>
          </div>
      </Flex>
    </Flex>
    </Box>
  );
}