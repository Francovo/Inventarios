import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { useForm } from "../../hooks/useForm";

const GetData = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [DataInventario, setDataInventario] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const [values, handleInputChange, setValues, reset] = useForm({
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

  //   const editData = (id) => {
  //     axios
  //       .put(url + id, values)
  //       .then((response) => console.log(response))
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  useEffect(() => {
    getData();
  }, []);

  return (
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
          {DataInventario.map((data, index) => (
            <Tr key={index} maxWidth="100vw">
              <Td>{data.id}</Td>
              <Td>{data.Tipo}</Td>
              <Td>{data.Nombre_Producto}</Td>
              <Td>{data.Precio_Producto}</Td>
              <Td>{data.Cantidad_Producto}</Td>
              <Td>
                {/* <Button
                  onClick={() => {
                    onOpen();
                  }}
                >
                  Editar
                </Button> */}
                <Modal isOpen={isOpen} onClose={onClose}>
                  <ModalOverlay />
                  <ModalContent>
                    <form onSubmit={handleSubmit}>
                      <ModalHeader>Editar Producto</ModalHeader>
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
                              <InputLeftElement
                                pointerEvents="none"
                                color="gray.300"
                              />
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
                        <Button
                          bg="red.500"
                          color="white"
                          mr={3}
                          onClick={onClose}
                        >
                          Cerrar
                        </Button>
                        <Button
                          bg="purple.600"
                          color="white"
                          _hover={{ bg: "#000000" }}
                          _active={{ bg: "#000000" }}
                          type="submit"
                        >
                          Guardar Cambios
                        </Button>
                      </ModalFooter>
                    </form>
                  </ModalContent>
                </Modal>
              </Td>
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
  );
};

export default GetData;
