import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Box,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../../styles/Home.scss";
import axios from "axios";
import { useForm } from "../../hooks/useForm";
import NavBar from "../NavBar";
import GetData from "./GetData";

const Home = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [values, handleInputChange, setValues, reset] = useForm({
    Tipo: "",
    Nombre_Producto: "",
    Precio_Producto: "",
    Cantidad_Producto: "",
  });

  const { Tipo, Nombre_Producto, Precio_Producto, Cantidad_Producto } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const postData = () => {
    axios
      .post(url, values)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <div className="ContainerAll">
      <NavBar />

      <div>
        <Stack justifyContent="center" alignItems="center" padding="0.5rem">
          <Box>
            <Input
              bg="purple.300"
              border="solid"
              borderColor="#6a32e2"
              placeholder="Buscar Usuario"
              size="md"
              width={{ base: "300px", md: "500px" }}
            />
          </Box>

          <Button
            bg="purple.100"
            // color="White"
            _hover={{ bg: "#322659", color: "white " }}
            _active={{ bg: "#000000" }}
            onClick={() => {
              onOpen();
            }}
          >
            ◌◈◌ Registrar Nueva Data ◌◈◌
          </Button>
        </Stack>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={handleSubmit}>
              <ModalHeader>Nuevo Producto</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        id="InputTipo"
                        placeholder="Tipo De Producto"
                        name="Tipo"
                        value={Tipo}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        id="InputNombre_Producto"
                        placeholder="Nombre Producto"
                        name="Nombre_Producto"
                        value={Nombre_Producto}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        id="InputPrecioProducto"
                        placeholder="Precio Producto"
                        type="number"
                        name="Precio_Producto"
                        value={Precio_Producto}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        id="InputCantidadProducto"
                        placeholder="Cantidad Producto"
                        name="Cantidad_Producto"
                        value={Cantidad_Producto}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button bg="red.500" color="white" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
                <Button
                  bg="purple.600"
                  color="white"
                  _hover={{ bg: "#000000" }}
                  _active={{ bg: "#000000" }}
                  type="submit"
                  onClick={postData}
                >
                  Guardar Cambios
                </Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </div>

      <GetData url={url} />
    </div>
  );
};

export default Home;
