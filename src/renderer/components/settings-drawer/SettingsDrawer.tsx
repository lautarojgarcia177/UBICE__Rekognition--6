import { SettingsIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
// import AwsCredentialsModal from './aws-credentials-modal/AwsCredentialsModal';
// import AwsRekognitionSettingsModal from './aws-rekognition-settings-modal/AwsRekognitionSettingsModal';

export default function SettingsDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label="settings"
        icon={<SettingsIcon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Configuración</DrawerHeader>

          <DrawerBody>
            <Flex direction='column' alignItems='start'>
              {/* <AwsCredentialsModal closeDrawer={onClose} />
              <br></br>
              <AwsRekognitionSettingsModal closeDrawer={onClose} /> */}
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
