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
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useForm } from "../../hooks/useForm";

const ModalProveedores = ({ isOpen, onClose, setDataSearch }) => {
  let url = "https://datasena.herokuapp.com/Proveedores/";

  const [values, handleInputChange] = useForm({
    Tipo: "",
    Nombre_Proveedor: "",
    Contacto: "",
    Deuda_Mensual: "",
  });

  const { Tipo, Nombre_Proveedor, Contacto, Deuda_Mensual } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  const postData = () => {
    axios
      .post(url, values)
      .then((response) => {
        console.log(response);
        setDataSearch((DataSearch) => [...DataSearch, response.data]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      {" "}
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
  );
};

export default ModalProveedores;
