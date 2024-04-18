"use client";

import { createQueryString } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

type UsePaginationProps = {
	targetUrl: string;
};

export function usePagination({ targetUrl }: UsePaginationProps) {
	const router = useRouter();
	const query = {
		page: 1,
		pageSize: 10,
	};

	function setPageSize(e: ChangeEvent<HTMLSelectElement>) {
		const params = createQueryString("", "pageSize", e.target.value);
		router.push(`${targetUrl}${params}`);
	}

	return {
		query,
		setPageSize,
	};
}
