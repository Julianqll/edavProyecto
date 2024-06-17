import { Title, Flex, Box } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { FileOption } from '../FileOption/FileOption';
import { open } from '@tauri-apps/api/dialog';

async function handleDialog(): Promise<void> {
  const selected = await open({
    multiple: true,
    filters: [{
      name: 'Image',
      extensions: ['bin']
    }]
  });
  console.log(selected);
}


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
          <FileOption type="text" handler={handleDialog} />
          <FileOption type="binary" handler={handleDialog} />
      </Flex>
    </Flex>
    </Box>
  );
}