import { Button, Progress, Spinner, useToast, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filesState } from 'renderer/recoil/atoms';
import { filesStateLengthSelector } from 'renderer/recoil/selectors';

type ProcessProgressProps = {
  title: string;
  progressValue: number;
};
function ProcessProgress(props: ProcessProgressProps) {
  return (
    <>
      <h3>{props.title}</h3>
      <Spinner thickness="4px" speed="0.65s" size="xl" />
      <Progress
        width="80%"
        hasStripe
        isAnimated
        value={props.progressValue}
        size="md"
        borderRadius="20px"
      />
    </>
  );
}

const Rekognizing = () => {
  const navigate = useNavigate();
  const [rekognitionProgress, setRekognitionProgress] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const toast = useToast();
  const selectedFilesLength = useRecoilValue(filesStateLengthSelector);
  const [stateFiles, setStateFiles] = useRecoilState(filesState);

  useEffect(() => {
    window.electron.startImagesRekognition(stateFiles);
  }, []);

  function handleCancel(): void {
    setStateFiles([]);
    navigate('/');
  }

  return (
    <>
      <VStack>
        <ProcessProgress
          title="Rekonociendo numeros y etiquetando las imagenes"
          progressValue={rekognitionProgress}
        />
        <p>
          {progressCount} de {selectedFilesLength} Fotos
        </p>
        <Button colorScheme="red" onClick={handleCancel}>
          Cancel
        </Button>
        ;
      </VStack>
      {/* https://chakra-ui.com/docs/components/alert-dialog */}
    </>
  );
};

export default Rekognizing;
