import { Center, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import AwsCredentialsModal from 'renderer/components/aws-credentials-modal/AwsCredentialsModal';
import AWSRekognitionSettingsModal from 'renderer/components/aws-rekognition-settings-modal/AWSRekognitionSettingsModal';

export function Configuration() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center>
        <VStack>
          <Heading marginBottom="2rem">Configuracion</Heading>
          <AwsCredentialsModal closeDrawer={onClose} />
          <AWSRekognitionSettingsModal closeDrawer={onClose} />
        </VStack>
      </Center>
    </>
  );
}
