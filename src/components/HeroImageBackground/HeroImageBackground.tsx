import { Title, Flex, Box } from '@mantine/core';
import classes from './HeroImageBackground.module.css';
import { FileOption } from '../FileOption/FileOption';
import { open as tauriOpen } from '@tauri-apps/api/dialog';
import { useNavigate } from 'react-router-dom';

export function HeroImageBackground() {
  const navigate = useNavigate();

  const handleDialog = (type: string) => {
    return async (): Promise<void> => {
      const selected = await tauriOpen({
        multiple: true,
        filters: [{
          name: 'Image',
          extensions: [type == 'binary' ? 'bin' : 'txt']
        }]
      });
      if (selected && selected.length > 0) {
        const selectedFile = selected[0];
        const fileType = type; 
        navigate('/menu', { state: { selectedFile, fileType } });
      }
    };
  };

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
          <FileOption type="text" handler={handleDialog('text')} />
          <FileOption type="binary" handler={handleDialog('binary')} />
        </Flex>
      </Flex>
    </Box>
  );
}
