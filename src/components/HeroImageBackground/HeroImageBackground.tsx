import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { Link } from 'react-router-dom';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Plantilla Inicial con Mantine
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Este es un ejemplo inicial de la distribución de carpetas y archivos
          </Text>
        </Container>

        <div className={classes.controls}>
          <Button component={Link} to="/" className={classes.control} variant="white" size="lg">
            Botón
          </Button>
        </div>
      </div>
    </div>
  );
}