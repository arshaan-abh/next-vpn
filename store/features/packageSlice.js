import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchPackages = createAsyncThunk(
	"package/fetchPackages",
	async (
		data = {
			sort: "id",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const packages = await axios
			.post(`${url}/package/findAll`, data, { headers })
			.then((response) => response.data);

		return { packages, data };
	}
);

export const addPackage = createAsyncThunk("package/addPackage", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const pack = await axios
		.post(`${url}/package/create`, data, { headers })
		.then((response) => response.data);

	return { pack, data };
});

export const updatePackage = createAsyncThunk(
	"package/updatePackage",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const pack = await axios
			.patch(`${url}/package/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { pack, data };
	}
);

export const deletePackage = createAsyncThunk("package/deletePackage", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const pack = await axios
		.delete(`${url}/package/delete/${id}`, { headers })
		.then((response) => response.data);

	return { pack };
});

export const slice = createSlice({
	name: "package",
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
		//fetchPackages
		builder.addCase(fetchPackages.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchPackages.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.packages.result.data;
		});
		builder.addCase(fetchPackages.rejected, (state, action) => {
			state.loadingData = false;
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
			state.snackMessage = "Package was added successfully";
			state.error = false;
		});
		builder.addCase(addPackage.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updatePackage
		builder.addCase(updatePackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updatePackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Package was updated successfully";
			state.error = false;
		});
		builder.addCase(updatePackage.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deletePackage
		builder.addCase(deletePackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deletePackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Package was deleted successfully";
			state.error = false;
		});
		builder.addCase(deletePackage.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const packageActions = slice.actions;
