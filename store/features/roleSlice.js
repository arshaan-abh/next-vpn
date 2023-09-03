import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchRoles = createAsyncThunk(
	"role/fetchRoles",
	async (
		data = {
			sort: "id",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.post(`${url}/role/findAll`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const addRole = createAsyncThunk("role/addRole", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.post(`${url}/role/create`, data, { headers })
		.then((response) => response.data);

	return { request, data };
});

export const updateRole = createAsyncThunk(
	"role/updateRole",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/role/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const deleteRole = createAsyncThunk("role/deleteRole", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.delete(`${url}/role/remove/${id}`, { headers })
		.then((response) => response.data);

	return { request };
});

export const slice = createSlice({
	name: "role",
	initialState: {
		loadingData: false,
		loadingAction: false,
		error: false,
		snackMessage: "",
		data: [],
	},
	reducers: {
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
			state.error = false;
		},
	},
	extraReducers: (builder) => {
		//fetchRoles
		builder.addCase(fetchRoles.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchRoles.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.request.result.data;
		});
		builder.addCase(fetchRoles.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addRole
		builder.addCase(addRole.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addRole.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Role was added successfully";
			state.error = false;
		});
		builder.addCase(addRole.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateRole
		builder.addCase(updateRole.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateRole.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Role was updated successfully";
			state.error = false;
		});
		builder.addCase(updateRole.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteRole
		builder.addCase(deleteRole.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteRole.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Role was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteRole.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const roleActions = slice.actions;
