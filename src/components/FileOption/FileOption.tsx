import { Title, Text, Container, Flex, Box, Avatar, Center, rem, Button } from '@mantine/core';
import { IconFileDatabase, IconFileDescription } from '@tabler/icons-react';
import classes from './FileOption.module.css';

interface FileOptionProps {
  type: 'binary' | 'text';
  handler: () => void;
}

export function FileOption({ type, handler }: FileOptionProps) {
  let iconHeader = <div></div>;
  let subtitle = '';
  let description = '';

  if (type === 'binary') {
    iconHeader = <IconFileDatabase style={{ width: rem(75), height: rem(75) }} stroke={1.3} />;
    subtitle = "Cargar archivo binario";
    description = "Selecciona un archivo procesado previamente con los datos de los ciudadanos en formato binario (.bin) para gestionar los datos mediante la aplicación";
  } else if (type === 'text') {
    iconHeader = <IconFileDescription style={{ width: rem(75), height: rem(75) }} stroke={1.3} />;
    subtitle = "Cargar archivo de texto";
    description = "Selecciona un archivo no procesado con los datos de los ciudadanos en formato de texto (.txt/.zst) para su procesamiento y posterior gestión en la aplicación";
  }

  return (
    <div>
      <Center>
        <Avatar variant="transparent" color="blue" radius="xl" size={100}>
          {iconHeader}
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
            {subtitle}
          </Title>
          <Box maw={400}>
            <Text size="lg" className={classes.description}>
              {description}
            </Text>
          </Box>
        </Container>
        <Button size="md" radius="xl" onClick={handler}>
          Seleccionar archivo
        </Button>
      </Flex>
    </div>
  );
}
