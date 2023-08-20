var routes = [
	{
		path: "/",
		panel: "panel",
		name: "Dashboard",
		icon: "ni ni-tv-2 text-primary",
		layout: "/panel",
	},
	{
		path: "/admin",
		panel: "admin",
		name: "Dashboard",
		icon: "ni ni-tv-2 text-primary",
		layout: "/panel",
	},
	{
		path: "/admin-role",
		panel: "admin",
		name: "Role",
		icon: "ni ni-circle-08 text-green",
		layout: "/panel",
	},
	{
		path: "/admin-users",
		panel: "admin",
		name: "Users",
		icon: "ni ni-single-02 text-yellow",
		layout: "/panel",
	},
	{
		path: "/admin-arches",
		panel: "admin",
		name: "Arches",
		icon: "ni ni-align-center text-orange",
		layout: "/panel",
	},
	{
		path: "/admin-packages",
		panel: "admin",
		name: "Packages",
		icon: "ni ni-bullet-list-67 text-red",
		layout: "/panel",
	},
	{
		path: "/charge",
		panel: "panel",
		name: "Charge",
		icon: "ni ni-check-bold text-green",
		layout: "/panel",
	},
	{
		path: "/admin-charge",
		panel: "admin",
		name: "Charge",
		icon: "ni ni-check-bold text-teal",
		layout: "/panel",
	},
	{
		path: "/convert",
		panel: "panel",
		name: "Convert",
		icon: "ni ni ni-shop text-red",
		layout: "/panel",
	},
	{
		path: "/exchange",
		panel: "panel",
		name: "Exchange",
		icon: "ni ni-money-coins text-cyan",
		layout: "/panel",
	},
	{
		path: "/admin-vpnList",
		panel: "admin",
		name: "Vpn list",
		icon: "ni ni-lock-circle-open text-indigo",
		layout: "/panel",
	},
	{
		path: "/reports",
		panel: "panel",
		name: "Reports",
		icon: "ni ni-align-center text-purple",
		layout: "/panel",
	},
	{
		path: "/admin-reports",
		panel: "admin",
		name: "Reports",
		icon: "ni ni-align-center text-pink",
		layout: "/panel",
	},
	// {
	//   path: "/support",
	//   name: "Support",
	//   icon: "ni ni-support-16 text-blue",
	//   layout: "/panel",
	// },
	{
		path: "/login",
		name: "Login",
		icon: "ni ni-key-25 text-info",
		layout: "/auth",
	},
	{
		path: "/register",
		name: "Register",
		icon: "ni ni-circle-08 text-pink",
		layout: "/auth",
	},
	{
		path: "/forgetPassword",
		name: "Forget Password",
		icon: "ni ni-lock-circle-open text-orange",
		layout: "/auth",
	},
];
export default routes;
