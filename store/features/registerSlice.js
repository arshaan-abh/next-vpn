import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
const url = `${configData.AddressAPI}`;

export const userRegister = createAsyncThunk("register/userRegister", async (data) => {
	const register = await axios
		.post(`${url}/User/register`, data)
		.then((response) => response.data);

	return { register, data };
});

export const managerRegister = createAsyncThunk(
	"register/managerRegister",
	async (data) => {
		const register = await axios
			.post(`${url}/User/register`, data)
			.then((response) => response.data);

		return { register, data };
	}
);

export const slice = createSlice({
	name: "register",
	initialState: {
		loading: false,
		handleLoading: false,
		logged: false,
		error: "",
		handleError: "",
	},
	reducers: {
		clearError: (state, action) => {
			state.error = "";
		},
		clearHandleError: (state, action) => {
			state.handleError = "";
		},
	},
	extraReducers: (builder) => {
		// userRegister
		builder.addCase(userRegister.pending, (state, action) => {
			state.handleLoading = true;
		});
		builder.addCase(userRegister.fulfilled, (state, action) => {
			state.handleLoading = false;
			state.handleError = "success";
		});
		builder.addCase(userRegister.rejected, (state, action) => {
			state.handleLoading = false;
			state.handleError = action.error.message;
		});

		// managerRegister
		builder.addCase(managerRegister.pending, (state, action) => {
			state.handleLoading = true;
		});
		builder.addCase(managerRegister.fulfilled, (state, action) => {
			state.handleLoading = false;
			state.handleError = "success";
		});
		builder.addCase(managerRegister.rejected, (state, action) => {
			state.handleLoading = false;
			state.handleError = action.error.message;
		});
	},
});

export default slice.reducer;
export const registerActions = slice.actions;
