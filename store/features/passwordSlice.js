import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";

const url = `${configData.AddressAPI}`;

export const resetPassword = createAsyncThunk(
	"password/resetPassword",
	async (data) => {
		const request = await axios
			.post(`${url}/auth/email/password/reset`, data)
			.then((response) => response.data);
		return { request, data };
	}
);

export const slice = createSlice({
	name: "password",
	initialState: {
		loading: false,
		error: false,
		stage: "",
		snackMessage: "",
	},
	reducers: {
		clearStage: (state, action) => {
			state.stage = "";
		},
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
			state.error = false;
		},
	},
	extraReducers: (builder) => {
		//resetPassword
		builder.addCase(resetPassword.pending, (state, action) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.loading = false;
			state.stage = "reset";
			state.snackMessage =
				"Reset password instructions was sent to your email.";
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.loading = false;
			state.error = true;

			if (action.error.code === "ERR_BAD_REQUEST") {
				state.snackMessage = "Email is not correct or token is already sent.";
			} else {
				state.snackMessage = action.error.message;
			}
		});
	},
});

export default slice.reducer;
export const passwordActions = slice.actions;
