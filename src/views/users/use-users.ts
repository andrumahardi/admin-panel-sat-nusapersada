import { URLS } from "@/constants";
import { useErrorHandler, usePagination, useTableActions } from "@/hooks";
import { useDisclosure } from "@chakra-ui/react";
import { useDeleteUser, useGetUsers } from "./queries";

const rootUrl = URLS.USERS;

export function useUsers() {
  
	const {
		query: { page, pageSize },
		setPageSize,
	} = usePagination({ targetUrl: rootUrl });

	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		data,
		isLoading,
		error: getError,
		refetch,
	} = useGetUsers({ page, pageSize });
	const {
		mutate: deleteFn,
		isLoading: isDeleting,
		error: deleteError,
	} = useDeleteUser();
	useErrorHandler({ error: getError || deleteError });

	const { pagination } = data?.meta || { pagination: {} };
	const {
		contents,
		selectedId,
		search,
		toggleSelectRow,
		deleteSelected,
		selectAll,
		deselectAll,
		setSelectedId,
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
		deleteFn(
			{ id: `${selectedId}` },
			{
				onSuccess: () => {
					refetch();
					setSelectedId(null);
					onClose();
				},
			}
		);
	}

  return {
    isLoading,
    contents,
    selectAll,
    deselectAll,
    deleteSelected,
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
    isDeleting
  }
}