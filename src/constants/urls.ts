export const URLS = {
	RESET_PASSWORD: "/reset-password",
	LOGIN: "/login",

	USERS: "/users",
	USERS_CREATE: "/users/form",
	USERS_UPDATE: (id: string | number) => `${URLS.USERS_CREATE}/${id}`,
};
