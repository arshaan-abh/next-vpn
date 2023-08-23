import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { clearLocalStorage } from "../../utils/handleLocalStorage";
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

export const slice = createSlice({
	name: "login",
	initialState: {
		loading: false,
		error: false,
		logged: false,
		snackMessage: "",
	},
	reducers: {
		clearLogged: (state, action) => {
			state.logged = false;
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
			setLocalStorageItem("token", action.payload.login.result.token, 360);
			setLocalStorageItem(
				"role",
				action.payload.login.result.roles.map((item, i) => item.name),
				360
			);
			state.loading = false;
			state.logged = true;
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
	},
});

export default slice.reducer;
export const loginActions = slice.actions;
