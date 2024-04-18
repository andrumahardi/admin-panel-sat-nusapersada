"use client";

import {
  Box,
  Button,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { URLS } from "@/constants";
import { GenericObject } from "@/types";
import { useUsers } from "./use-users";
import { TableLoader } from "@/components/loaders";
import { PaginationSizeOptions, PaginationButtonGroup } from "@/components/pagination";
import { DynamicTable } from "@/components/table";

const rootUrl = URLS.USERS;

export function Users() {
  const {
    isLoading,
    contents,
    selectAll,
    deselectAll,
    deleteSelected,
    toggleSelectRow,
    handleDelete,
    pageSize,
    setPageSize,
    page,
    pagination,
    isOpen,
    cancelDelete,
    onDelete,
    search,
    isDeleting
  } = useUsers();

  if (isLoading) {
    return <TableLoader />;
  }

  return (
    <>
      <Box bgColor="#ffffff" borderRadius="10px">
        <HStack
          p={4}
          borderBottom="1px solid"
          borderColor="#eaeaea"
          justifyContent="space-between"
        >
          <Text>User List</Text>
          <Button
            as="a"
            href={URLS.USERS_CREATE}
            variant="outline"
            colorScheme="blue"
          >
            Add User
          </Button>
        </HStack>
        {contents.length ? (
          <VStack p={4} alignItems="flex-start" spacing={4}>
            <HStack w="full" justifyContent="space-between">
              <PaginationSizeOptions pageSize={pageSize} onChange={setPageSize} />
              <HStack spacing={2}>
                <Button size="xs" colorScheme="blue" onClick={selectAll}>
                  Select all
                </Button>
                <Button
                  size="xs"
                  colorScheme="blue"
                  isDisabled={contents.every((el) => !el.checked)}
                  onClick={deselectAll}
                >
                  Deselect all
                </Button>
                <Button size="xs" colorScheme="red" onClick={deleteSelected}>
                  Delete selected
                </Button>
              </HStack>
              <HStack justifyContent="space-between">
                <HStack>
                  <Text>Search: </Text>
                  <Input onChange={search} />
                </HStack>
              </HStack>
            </HStack>
            <Box w="full">
              <DynamicTable
                data={contents as unknown as GenericObject[]}
                headColumns={[
                  {
                    key: "name",
                    name: "Name",
                  },
                  {
                    key: "username",
                    name: "User Name",
                  },
                  {
                    key: "email",
                    name: "Email",
                  },
                ]}
                toggleSelectRow={toggleSelectRow}
                handleDelete={handleDelete}
                rootUrl={rootUrl}
              />
            </Box>
            <HStack w="full" justifyContent="space-between">
              <HStack w="full" justifyContent="space-between">
                <Text>
                  Page {page} of {pagination?.pageCount || 1} from{" "}
                  {contents.length} entries
                </Text>
                <PaginationButtonGroup
                  rootUrl={rootUrl}
                  currentPage={page}
                  totalPage={+(pagination?.pageCount || 1)}
                />
              </HStack>
            </HStack>
          </VStack>
        ) : (
          <VStack p={4}>
            <Text>This table is empty ;(</Text>
          </VStack>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={cancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <VStack spacing={4} p="4">
              <Text textAlign="center">
                Are you sure you want to delete this content?
              </Text>
              <HStack justifyContent="center">
                <Button variant="ghost" mr={3} onClick={cancelDelete}>
                  Close
                </Button>
                <Button
                  colorScheme="red"
                  onClick={onDelete}
                  isLoading={isDeleting}
                >
                  Delete
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
