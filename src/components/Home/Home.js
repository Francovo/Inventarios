import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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
import Fuse from "fuse.js";
import NavBar from "../NavBar";
import { useForm } from "../../hooks/useForm";

const Home = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [DataInventario, setDataInventario] = useState([]);
  const [Search, setSearch] = useState("");
  const [DataSearch, setDataSearch] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const [values, handleInputChange] = useForm({
    Tipo: "",
    Nombre_Producto: "",
    Precio_Producto: "",
    Cantidad_Producto: "",
  });

  const { Tipo, Nombre_Producto, Precio_Producto, Cantidad_Producto } = values;

  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        setDataInventario(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const deleteData = (id) => {
    axios
      .delete(url + id)
      .then((response) => {
        getData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postData = () => {
    axios
      .post(url, values)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  /////////////////////// Barra de Busqueda ///////////////////////
  useEffect(() => {
    if (Search.length >= 1) {
      const fuse = new Fuse(DataInventario, {
        keys: ["Tipo", "Nombre_Producto"],
        includeScore: true,
        threshold: 0.2,
      });
      const result = fuse.search(Search);
      setDataSearch(result.map((item) => item.item));
    } else {
      setDataSearch(DataInventario);
    }
  }, [DataInventario, Search]);

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
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
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
            ◌◈◌ Registrar Producto ◌◈◌
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

      <div className="containerTabla">
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr maxWidth="100vw">
              <Th>Id</Th>
              <Th>Tipo</Th>
              <Th>Nombre</Th>
              <Th>Precio Unidad</Th>
              <Th>Cantidad</Th>
            </Tr>
          </Thead>
          <Tbody>
            {DataSearch.map((data, index) => (
              <Tr key={index} maxWidth="100vw">
                <Td>{data.id}</Td>
                <Td>{data.Tipo}</Td>
                <Td>{data.Nombre_Producto}</Td>
                <Td>{data.Precio_Producto}</Td>
                <Td>{data.Cantidad_Producto}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      deleteData(data.id);
                    }}
                  >
                    Eliminar
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Home;
