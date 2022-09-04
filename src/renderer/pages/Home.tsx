import { ChakraProvider, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import MenuDrawer from 'renderer/components/menu-drawer/MenuDrawer';

export function Home() {
  return (
    <ChakraProvider>
      <MenuDrawer />
      <Container marginTop="15px">
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
