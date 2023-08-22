import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearStorage } from "../../utils/clearLocalStorage";
import axios from "axios";
import configData from "../config.json";
const url = `${configData.AddressAPI}`;

export const login = createAsyncThunk("login/login", async (data) => {
	clearStorage();
	const login = await axios
		.post(`${url}/auth/login`, data)
		.then((response) => response.data);

	return { login, data };
});

export const slice = createSlice({
	name: "login",
	initialState: {
		loading: false,
		error: false,
		logged: false,
		snackMessage: "",
	},
	reducers: {
		logout: (state, action) => {
			clearStorage();
		},
		clearLogged: (state, action) => {
			state.logged = false;
		},
	},
	extraReducers: (builder) => {
		//login
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			clearStorage();
			localStorage.setItem(
				"token",
				JSON.stringify(action.payload.login.result.token)
			);
			localStorage.setItem(
				"role",
				JSON.stringify(
					action.payload.login.result.roles.map((item, i) => item.name)
				)
			);
			state.loading = false;
			state.logged = true;
		});
		builder.addCase(login.rejected, (state, action) => {
			clearStorage();
			state.loading = false;

			if (action.error.code === "ERR_BAD_REQUEST") {
				state.snackMessage = "Email or username is not correct.";
			} else {
				state.snackMessage = action.error.message;
			}
		});
	},
});

export default slice.reducer;
export const loginActions = slice.actions;
