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
		try {
			const response = await axios.post(`${url}/auth/email/register`, data);
			return { data: response.data, email: data.email };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const emailResend = createAsyncThunk(
	"register/emailResend",
	async () => {
		const email = getLocalStorageItem("verifyemail");

		try {
			const response = await axios.post(`${url}/auth/email/resend`, {
				email: email,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const emailVerify = createAsyncThunk(
	"register/emailVerify",
	async (data) => {
		try {
			const response = await axios.post(`${url}/auth/email/verify`, data);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
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
			state.stage = "";
			state.loading = true;
			state.error = false;
			state.snackMessage = "";
		});
		builder.addCase(emailRegister.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload.error) {
				clearLocalStorage();
				setLocalStorageItem("verifyemail", action.payload.email, 1);
				state.snackMessage = "A verification token is sent to your email.";
				state.stage = "register";
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
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
			if (!action.payload.error) {
				state.snackMessage = "Your verification token is resent to your email.";
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//emailVerify
		builder.addCase(emailVerify.pending, (state, action) => {
			state.loading = true;
			state.error = false;
			state.snackMessage = "";
		});
		builder.addCase(emailVerify.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload.error) {
				clearLocalStorage();
				state.snackMessage = "Your email is successfully verified.";
				state.stage = "verify";
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const registerActions = slice.actions;
