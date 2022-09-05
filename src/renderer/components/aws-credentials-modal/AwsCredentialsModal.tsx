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
  useToast,
  Text,
  useUpdateEffect,
} from '@chakra-ui/react';
import { IAWSCredentials } from 'interfaces';
import { useEffect, useState } from 'react';
import { Save } from 'react-feather';
import { useRecoilState } from 'recoil';
import { awsCredentialsState } from 'renderer/recoil/atoms';

export default function AwsCredentialsModal({ closeDrawer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [awsCredentials, setAwsCredentials] =
    useRecoilState(awsCredentialsState);
  const [showCredentialsSaved, setShowCredentialsSaved] = useState(false);

  useUpdateEffect(() => {
    setShowCredentialsSaved(true);
    setTimeout(() => setShowCredentialsSaved(false), 1500);
  }, [awsCredentials]);

  return (
    <>
      <Button onClick={onOpen}>Credenciales de aws</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Credenciales de aws</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl marginBottom={2}>
              <FormLabel htmlFor="awsAccessKeyId">Access Key Id</FormLabel>
              <Input
                type="text"
                value={awsCredentials.awsAccessKeyId}
                name="awsAccessKeyId"
                id="awsAccessKeyId"
                onChange={(event) => {
                  setAwsCredentials((awsCredentials) => ({
                    ...awsCredentials,
                    awsAccessKeyId: event.target.value,
                  }));
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="awsSecretAccessKey">
                Secret Access Key
              </FormLabel>
              <Input
                type="text"
                value={awsCredentials.awsSecretAccessKey}
                name="awsSecretAccessKey"
                id="awsSecretAccessKey"
                onChange={(event) => {
                  setAwsCredentials((awsCredentials) => ({
                    ...awsCredentials,
                    awsSecretAccessKey: event.target.value,
                  }));
                }}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
           {showCredentialsSaved && <Text color="#276749">Los cambios han sido guardados</Text> }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
