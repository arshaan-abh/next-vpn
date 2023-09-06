import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchGroups = createAsyncThunk(
	"group/fetchGroups",
	async (data = { filter: {}, sort: "id", order: -1 }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.post(`${url}/group/findAll-group`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const fetchGroupVersions = createAsyncThunk(
	"arch/fetchGroupVersions",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.get(`${url}/group/get-groupversions-group/${id}`, { headers })
			.then((response) => response.data);

		return { request };
	}
);

export const addGroup = createAsyncThunk("group/addGroup", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.post(`${url}/group/create-group`, data, { headers })
		.then((response) => response.data);

	return { request, data };
});

export const addGroupVersion = createAsyncThunk(
	"package/addGroupVersion",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.post(`${url}/group/create-groupVersion`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const updateGroup = createAsyncThunk(
	"group/updateGroup",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/group/update-group/${id}`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const updateGroupVersion = createAsyncThunk(
	"group/updateGroupVersion",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/group/update-groupVersion/${id}`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const deleteGroup = createAsyncThunk("group/deleteGroup", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.delete(`${url}/group/delete-group/${id}`, { headers })
		.then((response) => response.data);

	return { request };
});

export const deleteGroupVersion = createAsyncThunk(
	"group/deleteGroupVersion",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.delete(`${url}/group/delete-groupVersion/${id}`, { headers })
			.then((response) => response.data);

		return { request };
	}
);

export const slice = createSlice({
	name: "group",
	initialState: {
		loadingData: false,
		loadingAction: false,
		error: false,
		snackMessage: "",
		data: [],
		versionData: [],
	},
	reducers: {
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
			state.error = false;
		},
	},
	extraReducers: (builder) => {
		//fetchGroups
		builder.addCase(fetchGroups.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchGroups.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.request.result.data;
		});
		builder.addCase(fetchGroups.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//fetchGroupVersions
		builder.addCase(fetchGroupVersions.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchGroupVersions.fulfilled, (state, action) => {
			state.loadingData = false;
			state.versionData = action.payload.request.result.data;
		});
		builder.addCase(fetchGroupVersions.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addGroup
		builder.addCase(addGroup.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addGroup.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Group was added successfully";
			state.error = false;
		});
		builder.addCase(addGroup.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addGroupVersion
		builder.addCase(addGroupVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addGroupVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Group version was added successfully";
			state.error = false;
		});
		builder.addCase(addGroupVersion.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateGroup
		builder.addCase(updateGroup.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateGroup.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Group was updated successfully";
			state.error = false;
		});
		builder.addCase(updateGroup.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateGroupVersion
		builder.addCase(updateGroupVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateGroupVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Group version was updated successfully";
			state.error = false;
		});
		builder.addCase(updateGroupVersion.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteGroup
		builder.addCase(deleteGroup.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteGroup.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Group was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteGroup.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteGroupVersion
		builder.addCase(deleteGroupVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteGroupVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Group version was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteGroupVersion.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const groupActions = slice.actions;
