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
	try {
		const response = await axios.post(`${url}/auth/login`, data);
		return { data: response.data.result };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const addRole = createAsyncThunk("login/addRole", async (data) => {
	const token = getLocalStorageItem("token");
	const headers = { Authorization: `Bearer ${token}` };

	const roles = getLocalStorageItem("roles");
	const roleName = roles.find((item) => item._id === data.id).name;

	try {
		const response = await axios.post(`${url}/auth/add-role${data.id}`, null, {
			headers,
		});
		return { data: response.data.result, roleName };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
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
			state.error = false;
		},
		setError: (state, action) => {
			state.snackMessage = action.payload;
			state.error = true;
		},
	},
	extraReducers: (builder) => {
		//login
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload.error) {
				setLocalStorageItem("token", action.payload.data.token, 1);
				setLocalStorageItem("roles", action.payload.data.roles, 1);
				setLocalStorageItem("username", action.payload.data.username, 1);
				state.stage = "login";
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addRole
		builder.addCase(addRole.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addRole.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload.error) {
				removeLocalStorageItem("token");
				setLocalStorageItem("roletoken", action.payload.data.token, 1);
				setLocalStorageItem("role", action.payload.roleName, 1);
				state.stage = "roleadd";
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const loginActions = slice.actions;
