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

		try {
			const response = await axios.post(`${url}/group/findAll-group`, data, {
				headers,
			});
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchGroupVersions = createAsyncThunk(
	"group/fetchGroupVersions",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(
				`${url}/group/get-groupversions-group/${id}`,
				{ headers }
			);
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addGroup = createAsyncThunk("group/addGroup", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.post(`${url}/group/create-group`, data, {
			headers,
		});
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const addGroupVersion = createAsyncThunk(
	"group/addGroupVersion",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(
				`${url}/group/create-groupVersion`,
				data,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updateGroup = createAsyncThunk(
	"group/updateGroup",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(
				`${url}/group/update-group/${id}`,
				data,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updateGroupVersion = createAsyncThunk(
	"group/updateGroupVersion",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(
				`${url}/group/update-groupVersion/${id}`,
				data,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const deleteGroup = createAsyncThunk("group/deleteGroup", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.delete(`${url}/group/delete-group/${id}`, {
			headers,
		});
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const deleteGroupVersion = createAsyncThunk(
	"group/deleteGroupVersion",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.delete(
				`${url}/group/delete-groupVersion/${id}`,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
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
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchGroupVersions
		builder.addCase(fetchGroupVersions.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchGroupVersions.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.versionData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addGroup
		builder.addCase(addGroup.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addGroup.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Group was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addGroupVersion
		builder.addCase(addGroupVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addGroupVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Group version was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updateGroup
		builder.addCase(updateGroup.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateGroup.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Group was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updateGroupVersion
		builder.addCase(updateGroupVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateGroupVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Group version was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deleteGroup
		builder.addCase(deleteGroup.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteGroup.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Group was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deleteGroupVersion
		builder.addCase(deleteGroupVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteGroupVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Group version was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const groupActions = slice.actions;
