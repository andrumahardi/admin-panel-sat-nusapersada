import { FetchError } from "@/types";
import {
	createClientSideFetch,
	createServerSideFetch,
	generateQueryParams,
} from "@/utils";
import { UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { detailModel, listModel } from "./user-models";

export type UsersQuery = {
	page: number;
	pageSize: number;
};

export type CreateUserVariables = {
	username: string;
	email: string;
	role: number;
	password: string;
};

export type UpdateUserVariables = CreateUserVariables & {
	id: string;
};

export type DeleteUserVariables = Pick<UpdateUserVariables, "id">;

export const userKeys = {
	all: ["USER"],
	list: (query: UsersQuery) => [
		...userKeys.all,
		"LIST",
		generateQueryParams(query),
	],
};

export async function getUsers(
	query: UsersQuery,
	fetch:  ReturnType<typeof createClientSideFetch | typeof createServerSideFetch>
) {
	const res = await fetch.get(`/users${generateQueryParams(query)}`);
	return {
		data: listModel(res.data),
		meta: res.data.meta,
	};
}

type GetUsersCache = Awaited<ReturnType<typeof getUsers>>;

export function useGetUsers(query: UsersQuery) {
	return useQuery<GetUsersCache, AxiosError<FetchError>, GetUsersCache>(
		userKeys.list(query),
		async () => {
			const fetch = createClientSideFetch();
			return await getUsers(query, fetch);
		}
	);
}