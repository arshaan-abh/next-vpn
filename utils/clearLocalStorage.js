export const clearStorage = () => {
	localStorage.removeItem("verifyemail");
	localStorage.removeItem("token");
	localStorage.removeItem("role");
};
