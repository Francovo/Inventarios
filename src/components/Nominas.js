import {
  Button,
  useDisclosure,
  Input,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Box,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Fuse from "fuse.js";
import React, { useEffect, useState } from "react";
import ModalNominas from "./Nominas/ModalNominas";

const Nominas = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Empleados, setEmpleados] = useState([]);
  const [Search, setSearch] = useState("");
  const [DataSearch, setDataSearch] = useState([]);

  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        setEmpleados(response.data);
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

  /////////////////////// Barra de Busqueda ///////////////////////
  useEffect(() => {
    if (Search.length >= 1) {
      const fuse = new Fuse(Empleados, {
        keys: ["CC", "Nombre_Empleado", "Eps"],
        includeScore: true,
        threshold: 0.2,
      });
      const result = fuse.search(Search);
      setDataSearch(result.map((item) => item.item));
    } else {
      setDataSearch(Empleados);
    }
  }, [Empleados, Search]);

  return (
    <div className="ContainerAll">
      <div>
        <Stack justifyContent="center" alignItems="center" padding="0.5rem">
          <Box>
            <Input
              border="solid 1px"
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

        <ModalNominas isOpen={isOpen} onClose={onClose} setDataSearch = {setDataSearch}/>
      </div>

      <div className="containerTabla">
        <Table variant="striped" colorScheme="purple">
          <Thead>
            <Tr maxWidth="100vw">
              <Th>Id</Th>
              <Th>CC</Th>
              <Th>Nombre_Empleado</Th>
              <Th>Eps</Th>
              <Th>Salario</Th>
            </Tr>
          </Thead>
          <Tbody>
            {DataSearch.map((data, index) => (
              <Tr key={index} maxWidth="100vw">
                <Td>{data.id}</Td>
                <Td>{data.CC}</Td>
                <Td>{data.Nombre_Empleado}</Td>
                <Td>{data.Eps}</Td>
                <Td>{data.Salario}</Td>
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

export default Nominas;
