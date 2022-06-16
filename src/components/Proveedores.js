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
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import NavBar from "./NavBar";

const Proveedores = ({ url }) => {
  const [Proveedores, setProveedores] = useState([]);
  const [Search, setSearch] = useState("");
  const [DataSearch, setDataSearch] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [values, handleInputChange] = useForm({
    Tipo: "",
    Nombre_Proveedor: "",
    Contacto: "",
    Deuda_Mensual: "",
  });

  const { Tipo, Nombre_Proveedor, Contacto, Deuda_Mensual } = values;

  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        setProveedores(response.data);
        console.log(response);
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

  /////////////////////// Barra de Busqueda ///////////////////////
  useEffect(() => {
    if (Search.length >= 1) {
      const fuse = new Fuse(Proveedores, {
        keys: ["Tipo", "Nombre_Producto"],
        includeScore: true,
        threshold: 0.2,
      });
      const result = fuse.search(Search);
      setDataSearch(result.map((item) => item.item));
    } else {
      setDataSearch(Proveedores);
    }
  }, [Proveedores, Search]);

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
            ◌◈◌ Registrar Nuevo Proveedor ◌◈◌
          </Button>
        </Stack>
      </div>
      <div>
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
                        placeholder="Tipo De Proveedor"
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
                        id="InputNombre_Proveedor"
                        placeholder="Nombre Proveedor"
                        name="Nombre_Proveedor"
                        value={Nombre_Proveedor}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.300" />
                      <Input
                        id="InputContacto"
                        placeholder="Numero de Contacto"
                        type="number"
                        name="Contacto"
                        value={Contacto}
                        onChange={handleInputChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <FormControl>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" />
                      <Input
                        id="InputDeuda_Mensual"
                        placeholder="Deuda Mensual"
                        name="Deuda_Mensual"
                        value={Deuda_Mensual}
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
              <Th>Numero De Contacto</Th>
              <Th>Pago a realizar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {DataSearch.map((data) => (
              <Tr key={data.id}>
                <Td>{data.id}</Td>
                <Td>{data.Tipo}</Td>
                <Td>{data.Nombre_Proveedor}</Td>
                <Td>{data.Contacto}</Td>
                <Td>{data.Deuda_Mensual}</Td>
                <Td>
                  {/* <Button
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      console.log("laksdjlaksjd");
                    }}
                  >
                    Editar
                  </Button> */}
                </Td>
                <Td>
                  <Button
                    style={{ cursor: "pointer" }}
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

export default Proveedores;
