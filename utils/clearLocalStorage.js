export const clearStorage = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("organid");
	localStorage.removeItem("adminname");
	localStorage.removeItem("managername");
	localStorage.removeItem("username");
	localStorage.removeItem("departmentid");
	localStorage.removeItem("code");
	localStorage.removeItem("organname");
};
