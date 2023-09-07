import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const url = `${configData.AddressAPI}`;

export const fetchAdminVpns = createAsyncThunk(
	"vpn/fetchAdminVpns",
	async (
		data = {
			sort: "createdAt",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(`${url}/vpn/find-all`, data, {
				headers,
			});
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchUserVpns = createAsyncThunk(
	"vpn/fetchUserVpns",
	async (
		data = {
			sort: "createdAt",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(`${url}/vpn/get-user-vpns`, data, {
				headers,
			});
			return { data: response.data.result };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchUserAdminVpns = createAsyncThunk(
	"vpn/fetchUserAdminVpns",
	async (
		data = {
			sort: "createdAt",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(
				`${url}/vpn/get-users-vpns-admin`,
				data,
				{ headers }
			);
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addVpn = createAsyncThunk("vpn/addVpn", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.post(`${url}/vpn/create`, data, { headers });
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const buyVpn = createAsyncThunk("vpn/buyVpn", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.post(`${url}/vpn/buy`, data, { headers });
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const updateVpn = createAsyncThunk(
	"vpn/updateVpn",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(`${url}/vpn/update/${id}`, data, {
				headers,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const deleteVpn = createAsyncThunk("vpn/deleteVpn", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.delete(`${url}/vpn/delete/${id}`, { headers });
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const addPackage = createAsyncThunk("vpn/addPackage", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.post(`${url}/vpn/add-vpn-package`, data, {
			headers,
		});
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const slice = createSlice({
	name: "vpn",
	initialState: {
		loadingData: false,
		loadingAction: false,
		error: false,
		snackMessage: "",
		data: [],
		userData: [],
	},
	reducers: {
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
			state.error = false;
		},
	},
	extraReducers: (builder) => {
		//fetchAdminVpns
		builder.addCase(fetchAdminVpns.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchAdminVpns.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchUserVpns
		builder.addCase(fetchUserVpns.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchUserVpns.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.userData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchUserAdminVpns
		builder.addCase(fetchUserAdminVpns.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchUserAdminVpns.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addVpn
		builder.addCase(addVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Vpn was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//buyVpn
		builder.addCase(buyVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(buyVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Vpn was purchased successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updateVpn
		builder.addCase(updateVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Vpn was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deleteVpn
		builder.addCase(deleteVpn.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteVpn.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Vpn was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addPackage
		builder.addCase(addPackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addPackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Vpn package was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const vpnActions = slice.actions;
