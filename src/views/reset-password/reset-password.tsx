"use client";

import { Button, FormControl, Input, Text, VStack } from "@chakra-ui/react";
import { useResetPassword } from "./use-reset-password";

export function ResetPassword() {
	const { state, isLoading, onChange, onSubmit } = useResetPassword()

	return (
		<VStack
			as='form'
			onSubmit={onSubmit}
			bgColor='#ffffff'
			w='400px'
			padding='20px'
			borderRadius='5px'
			boxShadow='4px 10px 20px #0000003d'
			spacing={4}
		>
			<Text textAlign='center'>Reset Password</Text>
			<FormControl>
				<Input name='email' onChange={onChange} placeholder='Email' />
			</FormControl>
			<Button
				isLoading={isLoading}
				w='full'
				colorScheme='blue'
				type='submit'
				isDisabled={!state.values.email}
			>
				Send Password Reset Link
			</Button>
		</VStack>
	);
}
