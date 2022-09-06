import { CloseIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { IAWSRekognitionSettings } from 'interfaces';
import { useEffect, useState } from 'react';
import { Save } from 'react-feather';

export default function AWSRekognitionSettingsModal({ closeDrawer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [awsRekognitionSettings, setAwsRekognitionSettings] =
    useState<IAWSRekognitionSettings>({
      minConfidence: 95,
    });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.electron
      .getAWSRekognitionSettings()
      .then((_awsRekognitionSettings: IAWSRekognitionSettings) => {
        if (isNaN(_awsRekognitionSettings.minConfidence)) {
          _awsRekognitionSettings.minConfidence = 95;
        }
        setAwsRekognitionSettings(_awsRekognitionSettings);
        setIsLoading(false);
      });
  }, []);

  function onSave() {
    window.electron.setAWSRekognitionSettings(awsRekognitionSettings);
  }

  function handleMinConfidenceChange(event): void {
    const value = Math.max(0, Math.min(100, Number(event.target.value)));
    setAwsRekognitionSettings({
      ...awsRekognitionSettings,
      minConfidence: value,
    });
  }

  const Form = (
    <FormControl marginBottom={2}>
      <FormLabel htmlFor="minConfidence">Confianza mínima</FormLabel>
      <Text textAlign="justify">
        Establece la confianza de la detección de palabras. Las palabras con una
        confianza de detección inferior a esta se excluirán del resultado.
        <br />
        Tipo de dato: Número positivo entre 0 y 100, puede llevar decimales. Por
        defecto es 95.
      </Text>
      <Input
        type="number"
        value={awsRekognitionSettings!.minConfidence}
        name="minConfidence"
        id="minConfidence"
        min="0"
        max="100"
        onChange={handleMinConfidenceChange}
      />
    </FormControl>
  );

  return (
    <>
      <Button onClick={onOpen}>Variables de reconocimiento en AWS</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Configuracion variables de reconocimiento en AWS
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>{!isLoading ? Form : <Spinner />}</ModalBody>
          <ModalFooter>
            <IconButton
              onClick={onClose}
              aria-label="Cancelar"
              colorScheme="red"
              icon={<CloseIcon />}
              marginEnd={4}
            />
            <IconButton
              aria-label="Guardar"
              icon={<Save />}
              colorScheme="green"
              type="button"
              onClick={onSave}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
