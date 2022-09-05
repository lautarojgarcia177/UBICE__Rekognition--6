import { Menu as Feather_Menu_Icon} from 'react-feather';
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import React from 'react';
import { Link as Router_Link } from 'react-router-dom';

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
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
