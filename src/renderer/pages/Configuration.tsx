import { Center, Container, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import AwsCredentialsModal from 'renderer/components/aws-credentials-modal/AwsCredentialsModal';

export function Configuration() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Center marginBottom="2rem">
        <VStack>
          <Heading>Configuracion</Heading>
          <AwsCredentialsModal closeDrawer={onClose} />
        </VStack>
      </Center>
    </>
  );
}
