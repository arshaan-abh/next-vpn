import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { clearLocalStorage } from "../../utils/handleLocalStorage";
import {
	getLocalStorageItem,
	setLocalStorageItem,
} from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const emailRegister = createAsyncThunk(
	"register/emailRegister",
	async (data) => {
		const request = await axios
			.post(`${url}/auth/email/register`, data)
			.then((response) => response.data);

		return { request, data };
	}
);

export const emailResend = createAsyncThunk(
	"register/emailResend",
	async () => {
		const email = getLocalStorageItem("verifyemail");

		const request = await axios
			.post(`${url}/auth/email/resend`, {
				email: email,
			})
			.then((response) => response.data);

		return { request };
	}
);

export const emailVerify = createAsyncThunk(
	"register/emailVerify",
	async (data) => {
		const request = await axios
			.post(`${url}/auth/email/verify`, data)
			.then((response) => response.data);

		return { request, data };
	}
);

export const slice = createSlice({
	name: "register",
	initialState: {
		stage: "",
		loading: false,
		error: false,
		snackMessage: "",
	},
	reducers: {
		clearStage: (state, action) => {
			state.stage = "";
		},
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
		},
	},
	extraReducers: (builder) => {
		//emailRegister
		builder.addCase(emailRegister.pending, (state, action) => {
			clearLocalStorage();
			state.stage = "";
			state.loading = true;
			state.error = false;
			state.snackMessage = "";
		});
		builder.addCase(emailRegister.fulfilled, (state, action) => {
			state.stage = "register";
			state.loading = false;
			state.error = false;
			state.snackMessage = "A verification token is sent to your email.";
			setLocalStorageItem("verifyemail", action.payload.data.email, 1);
		});
		builder.addCase(emailRegister.rejected, (state, action) => {
			state.loading = false;
			state.error = true;

			if (action.error.code === "ERR_BAD_REQUEST") {
				state.snackMessage = "Email or username already exists.";
			} else {
				state.snackMessage = action.error.message;
			}
		});

		//emailResend
		builder.addCase(emailResend.pending, (state, action) => {
			state.loading = true;
			state.error = false;
			state.snackMessage = "";
		});
		builder.addCase(emailResend.fulfilled, (state, action) => {
			state.loading = false;
			state.error = false;
			state.snackMessage = "Your verification token is resent to your email.";
		});
		builder.addCase(emailResend.rejected, (state, action) => {
			state.loading = false;
			state.error = true;

			if (action.error.code === "ERR_BAD_REQUEST") {
				state.snackMessage = "Email already exists.";
			} else {
				state.snackMessage = action.error.message;
			}
		});

		//emailVerify
		builder.addCase(emailVerify.pending, (state, action) => {
			state.loading = true;
			state.error = false;
			state.snackMessage = "";
		});
		builder.addCase(emailVerify.fulfilled, (state, action) => {
			state.stage = "verify";
			clearLocalStorage();
			state.loading = false;
			state.error = false;
			state.snackMessage = "Your email is successfully verified.";
		});
		builder.addCase(emailVerify.rejected, (state, action) => {
			state.loading = false;
			state.error = true;

			if (action.error.code === "ERR_BAD_REQUEST") {
				state.snackMessage = "Token is not correct.";
			} else {
				state.snackMessage = action.error.message;
			}
		});
	},
});

export default slice.reducer;
export const registerActions = slice.actions;
