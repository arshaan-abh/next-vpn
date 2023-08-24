import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	clearLocalStorage,
	getLocalStorageItem,
	removeLocalStorageItem,
} from "../../utils/handleLocalStorage";
import axios from "axios";
import configData from "../config.json";
import { setLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const login = createAsyncThunk("login/login", async (data) => {
	clearLocalStorage();
	const login = await axios
		.post(`${url}/auth/login`, data)
		.then((response) => response.data);

	return { login, data };
});

export const addRole = createAsyncThunk("login/addRole", async (data) => {
	const token = getLocalStorageItem("token");
	const roles = getLocalStorageItem("roles");
	const roleName = roles.find((item) => item._id === data.id).name;	
	const headers = { Authorization: `Bearer ${token}` };
	const role = await axios
		.post(`${url}/auth/add-role${data.id}`, null, { headers })
		.then((response) => response.data);

	return { role, data, roleName };
});

export const slice = createSlice({
	name: "login",
	initialState: {
		loading: false,
		stage: "",
		snackMessage: "",
	},
	reducers: {
		logout: (state, action) => {
			state.stage = "";
			clearLocalStorage();
		},
		clearStage: (state, action) => {
			state.stage = "";
		},
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
		},
	},
	extraReducers: (builder) => {
		//login
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			clearLocalStorage();
			setLocalStorageItem("token", action.payload.login.result.token, 30);
			setLocalStorageItem("roles", action.payload.login.result.roles, 30);
			state.loading = false;
			state.stage = "login";
		});
		builder.addCase(login.rejected, (state, action) => {
			clearLocalStorage();
			state.loading = false;

			if (action.error.code === "ERR_BAD_REQUEST") {
				state.snackMessage = "Email or username is not correct.";
			} else {
				state.snackMessage = action.error.message;
			}
		});

		//addRole
		builder.addCase(addRole.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addRole.fulfilled, (state, action) => {
			removeLocalStorageItem("token");
			setLocalStorageItem("roletoken", action.payload.role.result.token, 30);
			setLocalStorageItem("role", action.payload.roleName, 30);
			state.loading = false;
			state.stage = "roleadd";
		});
		builder.addCase(addRole.rejected, (state, action) => {
			state.loading = false;
			state.snackMessage = action.error.message;
		});
	},
});

export default slice.reducer;
export const loginActions = slice.actions;
