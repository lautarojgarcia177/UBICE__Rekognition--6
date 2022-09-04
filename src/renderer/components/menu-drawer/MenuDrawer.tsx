import { Menu as Feather_Menu_Icon} from 'react-feather';
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
import { Link as Router_Link } from 'react-router-dom';
// import AwsCredentialsModal from './aws-credentials-modal/AwsCredentialsModal';
// import AwsRekognitionSettingsModal from './aws-rekognition-settings-modal/AwsRekognitionSettingsModal';

export default function MenuDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onOpen}
        aria-label="settings"
        icon={<Feather_Menu_Icon />}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Flex direction='column' alignItems='start'>
            <Router_Link to="/" onClick={onClose}>Rekonocer numeros</Router_Link>
            <Router_Link to="config" onClick={onClose}>Configuracion</Router_Link>
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
