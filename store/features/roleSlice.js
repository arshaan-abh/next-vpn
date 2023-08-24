import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
const url = `${configData.AddressAPI}`;

export const fetchRoles = createAsyncThunk("role/fetchRoles", async (data) => {
	const roles = await axios
		.post(`${url}/role/findAll`, data)
		.then((response) => response.data);

	return { roles, data };
});

export const slice = createSlice({
	name: "role",
	initialState: {
		loadingData: false,
		loadingAction: false,
		error: false,
		data: [],
		snackMessage: "",
	},
	reducers: {
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
		},
	},
	extraReducers: (builder) => {
		//fetchRoles
		builder.addCase(fetchRoles.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchRoles.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action;
		});
		builder.addCase(fetchRoles.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = action.error.message;
		});
	},
});

export default slice.reducer;
export const loginActions = slice.actions;
