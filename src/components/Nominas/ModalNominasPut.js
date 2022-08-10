import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useForm } from '../../hooks/useForm';

const ModalNominasPut = ({ isOpen, onClose, editData, stateModal }) => {
	let url = `https://datasena.herokuapp.com/Nominas/${editData.id}`;

	const handleSubmit = (e) => {
		e.preventDefault();
		onClose();
	};

	const [values, handleInputChange] = useForm({
		CC: '',
		Nombre_Empleado: '',
		Eps: '',
		Salario: '',
	});

	const { CC, Nombre_Empleado, Eps, Salario } = values;

	const putData = () => {
		axios
			.put(url, values)
			.then((response) => {
				console.log(response);
			})
			.catch((error) => console.log(error));
		stateModal(1);
	};
	return (
		<>
			<div>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<form onSubmit={handleSubmit}>
							<ModalHeader>Editar Nomina</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								<Stack>
									<FormControl>
										<InputGroup>
											<InputLeftElement pointerEvents="none" />
											<Input id="InputCC" placeholder="CC" name="CC" type="number" value={CC} onChange={handleInputChange} />
										</InputGroup>
									</FormControl>
									<FormControl>
										<InputGroup>
											<InputLeftElement pointerEvents="none" />
											<Input id="InputNombre_Empleado" placeholder="Nombre Completo" name="Nombre_Empleado" value={Nombre_Empleado} onChange={handleInputChange} />
										</InputGroup>
									</FormControl>
									<FormControl>
										<InputGroup>
											<InputLeftElement pointerEvents="none" color="gray.300" />
											<Input id="InputEPs" placeholder="Eps" name="Eps" value={Eps} onChange={handleInputChange} />
										</InputGroup>
									</FormControl>
									<FormControl>
										<InputGroup>
											<InputLeftElement pointerEvents="none" />
											<Input id="InputSalario" type="number" placeholder="Salario" name="Salario" value={Salario} onChange={handleInputChange} />
										</InputGroup>
									</FormControl>
								</Stack>
							</ModalBody>

							<ModalFooter>
								<Button bg="red.500" color="white" mr={3} onClick={onClose}>
									Cerrar
								</Button>
								<Button bg="purple.600" color="white" _hover={{ bg: '#000000' }} _active={{ bg: '#000000' }} type="submit" onClick={putData}>
									Guardar Cambios
								</Button>
							</ModalFooter>
						</form>
					</ModalContent>
				</Modal>
			</div>
		</>
	);
};

export default ModalNominasPut;
