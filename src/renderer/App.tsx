import { useEffect } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { RecoilRoot, useRecoilState } from 'recoil';
import { Configuration } from './pages/Configuration';
import { Home } from './pages/Home';
import { Rekognize } from './pages/Rekognize';
import { useToast } from '@chakra-ui/react';
import { IAWSCredentials } from 'interfaces';
import {
  awsCredentialsState,
  awsRekognitionSettingsState,
} from './recoil/atoms';
import Rekognizing from './pages/Rekognizing';

export default function App() {
  const toast = useToast();
  useEffect(() => startUp(), []);
  const [awsCredentials, setAwsCredentials] =
    useRecoilState(awsCredentialsState);
  const [awsRekognitionSettings, setAwsRekognitionSettings] = useRecoilState(
    awsRekognitionSettingsState
  );

  function startUp() {
    // Check if there are credentials loaded
    window.electron.getAWSCredentials().then((credentials) => {
      if (
        !credentials ||
        !credentials.awsAccessKeyId ||
        !credentials.awsSecretAccessKey
      ) {
        toast({
          title: 'No se encontraron las credenciales de AWS',
          description: 'Porfavor configure sus credenciales de AWS',
          status: 'warning',
          duration: 4000,
          isClosable: true,
        });
      } else {
        // Load app state
        setAwsCredentials(credentials);
      }
    });
    window.electron.getAWSRekognitionSettings().then((settings) => {
      if (!settings) {
      } else {
        // Load app state
        setAwsRekognitionSettings(settings);
      }
    });
    // Subscribe to show error toasts
    window.electron.onError((_event, error: Error) => {
      toast({
        title: error.name,
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    });
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Rekognize />} />
          <Route path="rekognizing" element={<Rekognizing />} />
          <Route path="config" element={<Configuration />} />
        </Route>
      </Routes>
    </Router>
  );
}
