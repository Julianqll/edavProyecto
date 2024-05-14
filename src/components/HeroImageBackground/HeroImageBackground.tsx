import { Title, Text, Container, Button } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { Link } from 'react-router-dom';
import { DropzoneButton } from '../DropzoneButton/DropzoneButton';

export function HeroImageBackground() {
  return (
    <div className={classes.wrapper}>

      <div className={classes.inner}>
        <Title className={classes.title}>
          Proyecto final de EDAV
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Puede cargar un archivo con datos ya procesados o crear nuevos datos
          </Text>
        </Container>

        <DropzoneButton></DropzoneButton>
      </div>
    </div>
  );
}