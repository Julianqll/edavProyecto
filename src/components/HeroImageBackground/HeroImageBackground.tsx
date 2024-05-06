import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { Link } from 'react-router-dom';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>

      <div className={classes.inner}>
        <Title className={classes.title}>
          Plantilla Inicial con Mantine
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Este es un ejemplo inicial de la distribución de carpetas y archivos
          </Text>
        </Container>

        <DropzoneButton></DropzoneButton>
      </div>
    </div>
  );
}