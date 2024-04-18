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
				name: "Users",
				link: URLS.USERS,
			},
		],
	},
];
