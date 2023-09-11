import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
const url = `${configData.AddressAPI}`;

export const resetPassword = createAsyncThunk(
	"password/resetPassword",
	async (data) => {
		try {
			const response = await axios.post(
				`${url}/auth/email/password/reset`,
				data
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updatePassword = createAsyncThunk(
	"password/updatePassword",
	async (data) => {
		try {
			const response = await axios.patch(
				`${url}/auth/email/password/update`,
				data
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
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
			if (!action.payload.error) {
				state.stage = "reset";
				state.snackMessage = "Reset password link was sent to your email.";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updatePassword
		builder.addCase(updatePassword.pending, (state, action) => {
			state.loading = true;
			state.error = false;
		});
		builder.addCase(updatePassword.fulfilled, (state, action) => {
			state.loading = false;
			if (!action.payload.error) {
				state.stage = "update";
				state.snackMessage = "Your password was updated successfully.";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const passwordActions = slice.actions;
