import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const url = `${configData.AddressAPI}`;

export const fetchVpns = createAsyncThunk(
	"vpn/find-all",
	async (
		data = {
			sort: "createdAt",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.post(`${url}/vpn/find-all`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const addVpn = createAsyncThunk("vpn/create", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.post(`${url}/vpn/create`, data, { headers })
		.then((response) => response.data);

	return { request, data };
});

export const updateVpn = createAsyncThunk(
	"vpn/update",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/vpn/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const deleteVpn = createAsyncThunk("vpn/delete", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.delete(`${url}/vpn/delete/${id}`, { headers })
		.then((response) => response.data);

	return { request };
});

export const addPackage = createAsyncThunk("vpn/addPackage", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.post(`${url}/vpn/add-vpn-package`, data, { headers })
		.then((response) => response.data);

	return { request, data };
});

export const slice = createSlice({
	name: "vpn",
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
		//fetchVpns
		builder.addCase(fetchVpns.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchVpns.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.request.result.data;
		});
		builder.addCase(fetchVpns.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addVpn
		builder.addCase(addVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Vpn was added successfully";
			state.error = false;
		});
		builder.addCase(addVpn.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateVpn
		builder.addCase(updateVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Vpn was updated successfully";
			state.error = false;
		});
		builder.addCase(updateVpn.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteVpn
		builder.addCase(deleteVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Vpn was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteVpn.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addPackage
		builder.addCase(addPackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addPackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Vpn was added successfully";
			state.error = false;
		});
		builder.addCase(addPackage.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const vpnActions = slice.actions;
