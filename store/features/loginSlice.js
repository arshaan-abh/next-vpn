import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearStorage } from "../../utils/clearLocalStorage";
import axios from "axios";
import configData from "../config.json";
const url = `${configData.AddressAPI}`;

export const userLogin = createAsyncThunk("login/userLogin", async (data) => {
	clearStorage();
	const login = await axios
		.post(`${url}/User/login`, data)
		.then((response) => response.data);

	return { login, data };
});

export const managerLogin = createAsyncThunk(
	"login/managerLogin",
	async (data) => {
		clearStorage();
		const login = await axios
			.post(`${url}/identity/manager/login`, data)
			.then((response) => response.data);
		
		// console.log(login);

		const manager = await axios
			.get(`${url}/identity/manager/username?username=${data.username}`, {
				headers: {
					Authorization: `Bearer ${login.token}`,
				},
			})
			.then((response) => response.data);
		// console.log(manager);

		const organization = await axios
			.get(`${url}/Organization/${manager.organizationId}`, {
				headers: {
					Authorization: `Bearer ${login.token}`,
				},
			})
			.then((response) => response.data);
		// console.log(organization);

		return { login, data, manager, organization };
	}
);

export const adminLogin = createAsyncThunk("login/adminLogin", async (data) => {
	clearStorage();
	const login = await axios
		.post(`${url}/identity/admin/login`, data)
		.then((response) => response.data);

	return { login, data };
});

export const slice = createSlice({
	name: "login",
	initialState: {
		loading: false,
		logged: false,
		error: "",
	},
	reducers: {
		logout: (state, action) => {
			clearStorage();
			state.logged = false;
		},
		clearError: (state, action) => {
			state.error = "";
		},
	},
	extraReducers: (builder) => {
		//user login
		builder.addCase(userLogin.pending, (state, action) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(userLogin.fulfilled, (state, action) => {
			clearStorage();
			localStorage.setItem("token", JSON.stringify(action.payload.login));
			localStorage.setItem(
				"username",
				JSON.stringify(action.payload.data.username)
			);
			state.logged = true;
			state.loading = false;
			state.error = "";
		});
		builder.addCase(userLogin.rejected, (state, action) => {
			clearStorage();
			state.loading = false;
			state.error = action.error.message;
		});

		//manager login
		builder.addCase(managerLogin.pending, (state, action) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(managerLogin.fulfilled, (state, action) => {
			clearStorage();
			localStorage.setItem("token", JSON.stringify(action.payload.login));
			localStorage.setItem(
				"managername",
				JSON.stringify(action.payload.data.username)
			);
			localStorage.setItem(
				"organid",
				JSON.stringify(action.payload.manager.organizationId)
			);
			localStorage.setItem(
				"departmentid",
				JSON.stringify(action.payload.organization.rootDepartmentId)
			);
			localStorage.setItem(
				"code",
				JSON.stringify(action.payload.organization.refrenceCode)
			);
			state.logged = true;
			state.loading = false;
			state.error = "";
		});
		builder.addCase(managerLogin.rejected, (state, action) => {
			clearStorage();
			state.loading = false;
			state.error = action.error.message;
		});

		//admin login
		builder.addCase(adminLogin.pending, (state, action) => {
			state.loading = true;
			state.error = "";
		});
		builder.addCase(adminLogin.fulfilled, (state, action) => {
			clearStorage();
			localStorage.setItem("token", JSON.stringify(action.payload.login));
			localStorage.setItem(
				"adminname",
				JSON.stringify(action.payload.data.username)
			);
			state.logged = true;
			state.loading = false;
			state.error = "";
		});
		builder.addCase(adminLogin.rejected, (state, action) => {
			clearStorage();
			state.loading = false;
			state.error = action.error.message;
		});
	},
});

export default slice.reducer;
export const loginActions = slice.actions;
