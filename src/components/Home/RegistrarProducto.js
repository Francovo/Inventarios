import { Box, Button, Input, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ModalPost from './ModalHomePost';

const RegistrarProducto = ({ setSearch, setDataSearch }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
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
					bg="purple.100"
					// color="White"
					_hover={{ bg: '#322659', color: 'white ' }}
					_active={{ bg: '#000000' }}
					onClick={() => {
						onOpen();
					}}>
					◌◈◌ Registrar Producto ◌◈◌
				</Button>
			</Stack>
			<ModalPost isOpen={isOpen} onClose={onClose} setDataSearch={setDataSearch} />
		</div>
	);
};

export default RegistrarProducto;
