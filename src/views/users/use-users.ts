import { URLS } from "@/constants";
import { useErrorHandler, usePagination, useTableActions } from "@/hooks";
import { useDisclosure } from "@chakra-ui/react";
import { useGetUsers } from "./queries";
import { useState } from "react";

const rootUrl = URLS.USERS;

let timeout: NodeJS.Timeout | null = null;

export function useUsers() {
  const [isDeleting, setIsDeleting] = useState(false);
  const {
    query: { page, pageSize },
    setPageSize,
  } = usePagination({ targetUrl: rootUrl });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading, error: getError } = useGetUsers({ page, pageSize });
  useErrorHandler({ error: getError });

  const { pagination } = data?.meta || { pagination: {} };
  const {
    contents,
    selectedId,
    search,
    toggleSelectRow,
    selectAll,
    deselectAll,
    setSelectedId,
    setContents,
  } = useTableActions({ data: data?.data || [] });

  function handleDelete(id: number) {
    setSelectedId(id);
    onOpen();
  }

  function cancelDelete() {
    setSelectedId(null);
    onClose();
  }

  function onDelete() {
    setIsDeleting(true);
    timeout = setTimeout(() => {
      if (selectedId) {
        setContents(contents.filter((el) => el.id !== selectedId));
				setSelectedId(null);
      } else {
        setContents(contents.filter((el) => !el.checked));
      }
      timeout && clearTimeout(timeout);
      setIsDeleting(false);
      onClose();
    }, 1e3);
  }

  function handleBulkDelete() {
    const haveSelection = contents.some((el) => el.checked);

    if (haveSelection) {
      onOpen();
    }
  }

  return {
    isLoading,
    contents,
    selectAll,
    deselectAll,
    toggleSelectRow,
    handleDelete,
    pageSize,
    setPageSize,
    search,
    page,
    pagination,
    isOpen,
    cancelDelete,
    onDelete,
    isDeleting,
    handleBulkDelete,
  };
}
