import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NavBar = () => {
  const { logout } = useAuth0();

  return (
    <div>
      <Box
        display="flex"
        gap="5"
        flexDirection={{ base: "column", md: "row" }}
        bg="#322659"
        padding="2"
        justifyContent="space-around"
      >
        <Link to={"/home"}>
          <Button>↢ Inventario ↣</Button>
        </Link>
        <Link to={"/proveedores"}>
          <Button>↢ Proveedores ↣</Button>
        </Link>
        <Link to={"/nominas"}>
          <Button>↢ Nominas ↣</Button>
        </Link>
        <Button
          backgroundColor={"black"}
          textColor={"white"}
          _hover={{ bg: "white", color: "black " }}
          _active={{ bg: "#000000" }}
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          ↢ Cerrar Sesion ↣
        </Button>
      </Box>
    </div>
  );
};

export default NavBar;
