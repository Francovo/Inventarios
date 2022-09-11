import { Box, Button, Input, Stack, useDisclosure } from '@chakra-ui/react';
import React from 'react';
import ModalNominasPost from './ModalNominasPost';

const RegistrarNomina = ({ setSearch, setDataSearch }) => {
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
					bg="cyan.300"
					// color="White"
					_hover={{ bg: '#065666', color: 'white ' }}
					_active={{ bg: '#000000' }}
					onClick={() => {
						onOpen();
					}}>
					◌◈◌ Registrar Empleado ◌◈◌
				</Button>
				<Button
					bg="cyan.100"
					// color="White"
					_hover={{ bg: '#065666', color: 'white ' }}
					_active={{ bg: '#000000' }}>
					◌◈◌ Descargar informe ◌◈◌
				</Button>
			</Stack>

			<ModalNominasPost isOpen={isOpen} onClose={onClose} setDataSearch={setDataSearch} />
		</div>
	);
};

export default RegistrarNomina;
