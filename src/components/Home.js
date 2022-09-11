import { Button, Table, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import '../styles/Home.scss';
import axios from 'axios';
import Fuse from 'fuse.js';
import ModalPut from './Home/ModalHomePut';
import RegistrarProducto from './Home/RegistrarProducto';

const Home = ({ url }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [DataInventario, setDataInventario] = useState([]);
	const [Search, setSearch] = useState('');
	const [DataSearch, setDataSearch] = useState([]);
	const [editData, setEditData] = useState([]);
	const [stateModal, setStateModal] = useState(0);

	const getData = () => {
		axios
			.get(url)
			.then((response) => {
				setDataInventario(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		setStateModal(0);
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
	}, [stateModal]);

	/////////////////////// Barra de Busqueda ///////////////////////
	useEffect(() => {
		if (Search.length >= 1) {
			const fuse = new Fuse(DataInventario, {
				keys: ['Tipo', 'Nombre_Producto'],
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
		<>
			<div className="ContainerAll">
				<RegistrarProducto setSearch={setSearch} setDataSearch={setDataSearch} />
				<div className="containerTabla">
					<Table variant="striped" colorScheme="cyan">
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
							{DataSearch?.map((data, index) => (
								<>
									<Tr key={index} maxWidth="100vw">
										<Td>{data.id}</Td>
										<Td>{data.Tipo}</Td>
										<Td>{data.Nombre_Producto}</Td>
										<Td>{data.Precio_Producto}</Td>
										<Td>{data.Cantidad_Producto}</Td>
										<Td>
											<Button
												onClick={() => {
													onOpen();
													setEditData(data);
												}}>
												Editar
											</Button>
										</Td>
										<Td>
											<Button
												onClick={() => {
													deleteData(data.id);
												}}>
												Eliminar
											</Button>
										</Td>
									</Tr>
								</>
							))}
							<ModalPut isOpen={isOpen} onClose={onClose} editData={editData} stateModal={setStateModal} />
						</Tbody>
					</Table>
				</div>
			</div>
		</>
	);
};

export default Home;
