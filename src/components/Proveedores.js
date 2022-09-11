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
} from '@chakra-ui/react';
import axios from 'axios';
import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import ModalProveedores from './Proveedores/ModalProveedores';

const Proveedores = ({ url }) => {
	const [Proveedores, setProveedores] = useState([]);
	const [Search, setSearch] = useState('');
	const [DataSearch, setDataSearch] = useState([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	/////////////////////// Barra de Busqueda ///////////////////////
	useEffect(() => {
		if (Search.length >= 1) {
			const fuse = new Fuse(Proveedores, {
				keys: ['Tipo', 'Nombre_Proveedor'],
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
		<>
			<div className="ContainerAll">
				<div>
					<Stack justifyContent="center" alignItems="center" padding="0.5rem">
						<Box>
							<Input
								border="solid 1px"
								borderColor="#6a32e2"
								placeholder="Buscar Usuario"
								size="md"
								width={{ base: '300px', md: '500px' }}
								onChange={(e) => {
									setSearch(e.currentTarget.value);
								}}
							/>
						</Box>

						<Button
							bg="cyan.300"
							// color="White"
							_hover={{ bg: '#065666', color: 'white ' }}
							_active={{ bg: '#000000' }}
							onClick={() => {
								onOpen();
							}}>
							◌◈◌ Registrar Nuevo Proveedor ◌◈◌
						</Button>
						<Button
							bg="cyan.100"
							// color="White"
							_hover={{ bg: '#065666', color: 'white ' }}
							_active={{ bg: '#000000' }}>
							◌◈◌ Descargar informe ◌◈◌
						</Button>
					</Stack>
					<ModalProveedores isOpen={isOpen} onClose={onClose} setDataSearch={setDataSearch} />
				</div>

				<div className="containerTabla">
					<Table variant="striped" colorScheme="cyan">
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
											style={{ cursor: 'pointer' }}
											onClick={() => {
												deleteData(data.id);
											}}>
											Eliminar
										</Button>
									</Td>
								</Tr>
							))}
						</Tbody>
					</Table>
				</div>
			</div>
		</>
	);
};

export default Proveedores;
