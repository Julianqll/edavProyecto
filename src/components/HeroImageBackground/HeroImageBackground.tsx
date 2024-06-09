import { Title, Text, Container, Flex, Box } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';

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
        mih={50}
        gap="xl"
        justify="center"
        align="center"
        direction="row"
        wrap={{ base: 'wrap', sm: 'nowrap'}}
        style={{ width: '100%' }}
        >
          <div>
            <Container size={640}>
              <Text size="lg" className={classes.description}>
                Puede cargar un archivo con datos ya procesados o crear nuevos datos
              </Text>
            </Container>
            <DropzoneButton/>
          </div>        
          <div>
            <Container size={640}>
              <Text size="lg" className={classes.description}>
                Puede cargar un archivo con datos ya procesados o crear nuevos datos
              </Text>
            </Container>
            <DropzoneButton/>
          </div>
      </Flex>
    </Flex>
    </Box>
  );
}