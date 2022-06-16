import { Avatar, Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <Flex
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.300"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            bg="#805AD5"
            padding="-2"
            src="https://img2.freepng.es/20180411/qhq/kisspng-alpha-and-omega-book-of-revelation-symbol-gods-5acddd68909046.0562167115234410005921.jpg"
          />
          <Heading color="#000000">Bienvenido</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <Button
                  borderRadius={0}
                  type="submit"
                  bg="#805AD5"
                  variant="solid"
                  width="full"
                  color="white"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                  onClick={() => loginWithRedirect()}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Login;
