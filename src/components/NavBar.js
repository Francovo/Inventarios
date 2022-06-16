import { Box, Button} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


const NavBar = () => {

  const {logout} = useAuth0()

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
          <Button>
            <Link to={'/home'}>↢ Inventario ↣</Link>
          </Button>
          <Button>
            <Link to={"/proveedores"}>↢ Proveedores ↣</Link>
          </Button>

          <Button onClick={() => logout({returnTo: window.location.origin})}>
          ↢ Cerrar Sesion ↣
          </Button>
      </Box>
    </div>
  );
};

export default NavBar;
