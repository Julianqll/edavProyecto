import { useEffect, useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Flex } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './DropzoneButton.module.css';
import { Link } from 'react-router-dom';
import { open } from '@tauri-apps/api/dialog';
// Open a selection dialog for image files

export function DropzoneButton() {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    if (files.length > 0) {
      handleUpload();
    }
  }, [files]);

  const handleUpload = async () => {
    for (const file of files) {
      console.log(file);
    }
    setResult("good");
  };

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

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        className={classes.dropzone}
        radius="md"
        accept={{
          'application/json': ['.json'],
          'application/octet-stream': ['.dat']
        }}
        onDrop={(acceptedFiles) => setFiles(acceptedFiles)}
      >
        <div style={{ pointerEvents: 'none' }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} 
              color="var(--mantine-color-blue-filled)"/>
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl" c="white">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Cargar datos</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Suelta&apos;n&apos;tu archivo aquí para cargarlo. Solo se aceptan archivos <i>.json</i>
          </Text>
        </div>
      </Dropzone>
      <Flex
      mih={50}
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      {result}
      <Button size="md" radius="xl" onClick={() => handleDialog()}>
        Seleccionar archivo
      </Button>
      <Button  size="md" radius="xl" component={Link} to="/menu">
        Nuevos datos
      </Button>
    </Flex>

    </div>
  );
}