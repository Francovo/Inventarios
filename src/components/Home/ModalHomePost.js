import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, FormControl, Input, InputGroup, InputLeftElement, Stack } from '@chakra-ui/react';
import axios from 'axios';
import React from 'react';
import { useForm } from '../../hooks/useForm';

const ModalPost = ({ isOpen, onClose, setDataSearch }) => {
	let url = 'https://datasena.herokuapp.com/inventario/';

	const handleSubmit = (e) => {
		e.preventDefault();
		onClose();
	};

	const [values, handleInputChange] = useForm({
		Tipo: '',
		Nombre_Producto: '',
		Precio_Producto: '',
		Cantidad_Producto: '',
	});

	const { Tipo, Nombre_Producto, Precio_Producto, Cantidad_Producto } = values;

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
										<Input id="InputTipo" placeholder="Tipo De Producto" name="Tipo" value={Tipo} onChange={handleInputChange} />
									</InputGroup>
								</FormControl>
								<FormControl>
									<InputGroup>
										<InputLeftElement pointerEvents="none" />
										<Input id="InputNombre_Producto" placeholder="Nombre Producto" name="Nombre_Producto" value={Nombre_Producto} onChange={handleInputChange} />
									</InputGroup>
								</FormControl>
								<FormControl>
									<InputGroup>
										<InputLeftElement pointerEvents="none" color="gray.300" />
										<Input id="InputPrecioProducto" placeholder="Precio Producto" type="number" name="Precio_Producto" value={Precio_Producto} onChange={handleInputChange} />
									</InputGroup>
								</FormControl>
								<FormControl>
									<InputGroup>
										<InputLeftElement pointerEvents="none" />
										<Input id="InputCantidadProducto" placeholder="Cantidad Producto" name="Cantidad_Producto" value={Cantidad_Producto} onChange={handleInputChange} />
									</InputGroup>
								</FormControl>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Button bg="red.500" color="white" mr={3} onClick={onClose}>
								Cerrar
							</Button>
							<Button bg="purple.600" color="white" _hover={{ bg: '#000000' }} _active={{ bg: '#000000' }} type="submit" onClick={postData}>
								Guardar Cambios
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</div>
	);
};

export default ModalPost;
