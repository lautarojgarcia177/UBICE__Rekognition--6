import { Container, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export function Rekognize() {
  const navigate = useNavigate();
  return (
    <VStack>
      <Container centerContent m={5} w="80%">
        <h2 style={{ fontSize: '20px', marginBottom: '1rem' }}>
          Rekonocer y etiquetar imagenes
        </h2>
        {/* <DropFileInput onFileInputChange={onFileInputChange} onDrop={onDrop} /> */}
        <small style={{ marginTop: '0.5rem' }}>
          Haga click en la caja o arrastre las fotos al centro de la misma.
        </small>
      </Container>
      {/* {files.length && true && (
        <>
          <Container maxHeight="600px" overflow="auto">
            <List>{listFiles}</List>
          </Container>
          <Button colorScheme="blue" onClick={onRekognize}>
            Rekognize!
          </Button>
        </>
      )} */}
    </VStack>
  );
}
