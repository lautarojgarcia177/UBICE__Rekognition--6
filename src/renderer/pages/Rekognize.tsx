import { Button, Container, List, ListIcon, ListItem, VStack } from '@chakra-ui/react';
import { IRekognitionFile } from 'interfaces';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import DropFileInput from 'renderer/components/drop-file-input/DropFileInput';
import { filesState } from 'renderer/recoil/atoms';
import { Image } from 'react-feather';

export function Rekognize() {
  const navigate = useNavigate();
  const [statefiles, setStateFiles] = useRecoilState(filesState);

  function onFileInputChange(event: any): void {
    const { files } = event.target;
    prepareFiles(files);
  }

  function onDrop(files: any, event: any): void {
    prepareFiles(files);
  }

  function prepareFiles(files: any) {
    // Convert object to array
    const filesArray = Object.keys(files).map(function (key) {
      return files[key];
    });
    let _files: IRekognitionFile[] = [];
    // Extract some props from files to make it serializable for storing in state
    // Filter by supported file type
    files = filesArray.filter(
      (file) => file.type === 'image/jpeg' || file.type === 'image/png'
    );
    for (let i = 0; i < files.length; i++) {
      _files.push({
        id: i,
        name: files[i].name,
        path: files[i].path,
        numbers: [],
      });
    }
    setStateFiles(_files);
  }

  const listFiles = statefiles.map((file) => (
    <ListItem key={file.id} className='li__file-name'>
      <ListIcon as={Image} />
      <span>{file.name}</span>
    </ListItem>
  ));

  function onRekognize(): void {
    navigate('rekognizing');
  }

  return (
    <VStack>
      <Container centerContent m={5} w="80%">
        <h2 style={{ fontSize: '20px', marginBottom: '1rem' }}>
          Rekonocer y etiquetar imagenes
        </h2>
        <DropFileInput onFileInputChange={onFileInputChange} onDrop={onDrop} />
        <small style={{ marginTop: '0.5rem' }}>
          Haga click en la caja o arrastre las fotos al centro de la misma.
        </small>
      </Container>
      {statefiles.length && true && (
        <>
          <Container maxHeight="600px" overflow="auto">
            <List>{listFiles}</List>
          </Container>
          <Button colorScheme="blue" onClick={onRekognize}>
            Rekognize!
          </Button>
        </>
      )}
    </VStack>
  );
}
