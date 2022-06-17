import {
  Button,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Input,
  Box,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../styles/Home.scss";
import axios from "axios";
import Fuse from "fuse.js";
import ModalHome from "./Home/ModalHome";

const Home = ({ url }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [DataInventario, setDataInventario] = useState([]);
  const [Search, setSearch] = useState("");
  const [DataSearch, setDataSearch] = useState([]);

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

  useEffect(() => {
    getData();
  }, []);

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
        <ModalHome
          isOpen={isOpen}
          onClose={onClose}
          setDataSearch={setDataSearch}
        />
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
