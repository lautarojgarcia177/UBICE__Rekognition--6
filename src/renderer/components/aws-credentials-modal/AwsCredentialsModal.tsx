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
} from '@chakra-ui/react';
import { Save } from 'react-feather';

export default function AwsCredentialsModal({ closeDrawer }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Credenciales de aws</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Credenciales de aws</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {/* <FormControl marginBottom={2}>
              <FormLabel htmlFor="awsAccessKeyId">Access Key Id</FormLabel>
              <Input
                type="text"
                value={awsCredentials.awsAccessKeyId}
                name="awsAccessKeyId"
                id="awsAccessKeyId"
                onChange={handleAccessKeyIdChange}
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
                onChange={handleSecretAccessKeyChange}
              />
            </FormControl> */}
          </ModalBody>
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
              // onClick={onSave}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
