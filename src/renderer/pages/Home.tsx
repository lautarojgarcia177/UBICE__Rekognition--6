import { ChakraProvider, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import NavBar from "renderer/components/navbar/NavBar";

export function Home() {
  return (
    <ChakraProvider>
      <Container>
        <NavBar />
        <Outlet />
      </Container>
    </ChakraProvider>
  );
}
