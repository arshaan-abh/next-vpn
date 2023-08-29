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

		const exchanges = await axios
			.post(`${url}/exchange/findAll`, data, { headers })
			.then((response) => response.data);

		return { exchanges, data };
	}
);

export const addExchange = createAsyncThunk(
	"exchange/addExchange",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const exchange = await axios
			.post(`${url}/exchange/create`, data, { headers })
			.then((response) => response.data);

		return { exchange, data };
	}
);

export const updateExchange = createAsyncThunk(
	"exchange/updateExchange",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const exchange = await axios
			.patch(`${url}/exchange/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { exchange, data };
	}
);

export const deleteExchange = createAsyncThunk(
	"exchange/deleteExchange",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const exchange = await axios
			.delete(`${url}/exchange/delete/${id}`, { headers })
			.then((response) => response.data);

		return { exchange };
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
			state.data = action.payload.exchanges.result.data;
		});
		builder.addCase(fetchExchanges.rejected, (state, action) => {
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
	},
});

export default slice.reducer;
export const exchangeActions = slice.actions;
