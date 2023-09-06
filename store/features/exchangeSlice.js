import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchExchanges = createAsyncThunk(
	"exchange/fetchExchanges",
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
			.post(`${url}/exchange/findAll`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const fetchExchangeVersions = createAsyncThunk(
	"exchange/fetchExchangeVersions",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.get(`${url}/exchange-versioning/get-exchange-versions/${id}`, {
				headers,
			})
			.then((response) => response.data);

		return { request };
	}
);

export const fetchAllExchangeVersions = createAsyncThunk(
	"exchange/fetchAllExchangeVersions",
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
			.post(`${url}/exchange-versioning/find-all-version`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const addExchange = createAsyncThunk(
	"exchange/addExchange",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.post(`${url}/exchange/create`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const addExchangeVersion = createAsyncThunk(
	"exchange/addExchangeVersion",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.post(`${url}/exchange-versioning/create-version`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const updateExchange = createAsyncThunk(
	"exchange/updateExchange",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/exchange/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const updateExchangeVersion = createAsyncThunk(
	"exchange/updateExchangeVersion",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/exchange-versioning/update-version/${id}`, data, {
				headers,
			})
			.then((response) => response.data);

		return { request, data };
	}
);

export const deleteExchange = createAsyncThunk(
	"exchange/deleteExchange",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.delete(`${url}/exchange/delete/${id}`, { headers })
			.then((response) => response.data);

		return { request };
	}
);

export const deleteExchangeVersion = createAsyncThunk(
	"exchange/deleteExchangeVersion",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.delete(`${url}/exchange-versioning/delete-version/${id}`, { headers })
			.then((response) => response.data);

		return { request };
	}
);

export const slice = createSlice({
	name: "exchange",
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
		//fetchExchanges
		builder.addCase(fetchExchanges.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchExchanges.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.request.result.data;
		});
		builder.addCase(fetchExchanges.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//fetchExchangeVersions
		builder.addCase(fetchExchangeVersions.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchExchangeVersions.fulfilled, (state, action) => {
			state.loadingData = false;
			state.versionData = action.payload.request.result;
		});
		builder.addCase(fetchExchangeVersions.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//fetchAllExchangeVersions
		builder.addCase(fetchAllExchangeVersions.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchAllExchangeVersions.fulfilled, (state, action) => {
			state.loadingData = false;
			state.versionData = action.payload.request.result.data;
		});
		builder.addCase(fetchAllExchangeVersions.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addExchange
		builder.addCase(addExchange.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addExchange.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Exchange was added successfully";
			state.error = false;
		});
		builder.addCase(addExchange.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addExchangeVersion
		builder.addCase(addExchangeVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addExchangeVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Exchange version was added successfully";
			state.error = false;
		});
		builder.addCase(addExchangeVersion.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateExchange
		builder.addCase(updateExchange.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateExchange.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Exchange was updated successfully";
			state.error = false;
		});
		builder.addCase(updateExchange.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateExchangeVersion
		builder.addCase(updateExchangeVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateExchangeVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Exchange version was updated successfully";
			state.error = false;
		});
		builder.addCase(updateExchangeVersion.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteExchange
		builder.addCase(deleteExchange.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteExchange.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Exchange was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteExchange.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteExchangeVersion
		builder.addCase(deleteExchangeVersion.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteExchangeVersion.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Exchange version was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteExchangeVersion.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const exchangeActions = slice.actions;
