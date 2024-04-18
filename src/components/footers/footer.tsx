"use client";

import { HStack, Text } from "@chakra-ui/react";

export function Footer() {
	return (
		<HStack
			justifyContent='space-between'
			w='full'
			position='absolute'
			bottom={0}
			bgColor='#ffffff'
			p={4}
		>
			<Text>Andru Mahardi {new Date().getFullYear()}</Text>
			<Text>© All rights reserved.</Text>
		</HStack>
	);
}
