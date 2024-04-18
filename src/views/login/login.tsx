"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { URLS } from "@/constants";
import { useLogin } from "./use-login";

export function Login() {
  const { onSubmit, onChange, canLogin } = useLogin();

  return (
    <VStack
      as="form"
      onSubmit={onSubmit}
      bgColor="#ffffff"
      w="400px"
      padding="20px"
      borderRadius="5px"
      boxShadow="4px 10px 20px #0000003d"
      spacing={4}
    >
      <Text textAlign="center">Login</Text>
      <FormControl>
        <Input name="email" onChange={onChange} placeholder="Email" />
      </FormControl>
      <FormControl>
        <Input
          name="password"
          onChange={onChange}
          type="password"
          placeholder="Password"
        />
      </FormControl>
      <HStack w="full" justifyContent="space-between">
        <Checkbox fontWeight="semibold">Remember me</Checkbox>
        <Button colorScheme="blue" type="submit" isDisabled={!canLogin}>
          Login
        </Button>
      </HStack>
      <Box w="full" color="#003ccd" fontWeight="medium">
        <Link href={URLS.RESET_PASSWORD}>Forgot your password?</Link>
      </Box>
    </VStack>
  );
}
