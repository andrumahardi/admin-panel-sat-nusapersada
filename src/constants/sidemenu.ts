import { URLS } from "./urls";

export const sidemenu = [
	{
		name: "Dashboard",
		link: "/",
	},
	{
		name: "User Management",
		children: [
			{
				name: "Roles",
				link: URLS.ROLES,
			},
			{
				name: "Users",
				link: URLS.USERS,
			},
		],
	},
	{
		name: "Income",
		link: URLS.INCOMES,
	},
	{
		name: "Expense",
		link: URLS.EXPENSES,
	},
];
