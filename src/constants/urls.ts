export const URLS = {
	RESET_PASSWORD: "/reset-password",
	LOGIN: "/login",
	EXPENSES: "/expenses",
	INCOMES: "/incomes",

	USERS: "/users",
	USERS_CREATE: "/users/form",
	USERS_UPDATE: (id: string | number) => `${URLS.USERS_CREATE}/${id}`,

	ROLES: "/roles",
	ROLES_CREATE: "/roles/form",
	ROLES_UPDATE: (id: string | number) => `${URLS.ROLES_CREATE}/${id}`,
};
