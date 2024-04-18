import { createServerSideFetch } from "@/utils";
import { dehydrate } from "@tanstack/react-query";
import { getQueryClient } from "@/utils";
import { MainContainer } from "@/components/containers";
import { ReactQueryHydrate } from "@/components/hydrate-client";
import { Users } from "@/views/users";
import { getUsers, userKeys } from "@/views/users/queries";

export default async function UsersPage() {
	const query = {
		page: 1,
		pageSize: 10,
	};
	const queryClient = getQueryClient();
	await queryClient.prefetchQuery(userKeys.list(query), async () => {
		const fetch = createServerSideFetch();
		return await getUsers(query, fetch);
	});
	const dehydratedState = dehydrate(queryClient);

	return (
		<ReactQueryHydrate state={dehydratedState}>
			<MainContainer>
				<Users />
			</MainContainer>
		</ReactQueryHydrate>
	);
}
