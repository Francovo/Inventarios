import { Button, useDisclosure, Input, Table, Tbody, Td, Th, Thead, Tr, Box, Stack } from '@chakra-ui/react';
import axios from 'axios';
import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import ModalNominasPut from './Nominas/ModalNominasPut';
import RegistrarNomina from './Nominas/RegistrarNomina';

const Nominas = ({ url }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [Empleados, setEmpleados] = useState([]);
	const [Search, setSearch] = useState('');
	const [DataSearch, setDataSearch] = useState([]);
	const [editData, setEditData] = useState([]);
	const [stateModal, setStateModal] = useState(0);

	const getData = () => {
		axios
			.get(url)
			.then((response) => {
				setEmpleados(response.data);
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
			const fuse = new Fuse(Empleados, {
				keys: ['CC', 'Nombre_Empleado', 'Eps'],
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
		<>
			<div className="ContainerAll">
				<RegistrarNomina />
				<div className="containerTabla">
					<Table variant="striped" colorScheme="cyan">
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
							{DataSearch?.map((data, index) => (
								<Tr key={index} maxWidth="100vw">
									<Td>{data.id}</Td>
									<Td>{data.CC}</Td>
									<Td>{data.Nombre_Empleado}</Td>
									<Td>{data.Eps}</Td>
									<Td>{data.Salario}</Td>
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
							))}
							<ModalNominasPut isOpen={isOpen} onClose={onClose} editData={editData} stateModal={setStateModal} />
						</Tbody>
					</Table>
				</div>
			</div>
		</>
	);
};

export default Nominas;
