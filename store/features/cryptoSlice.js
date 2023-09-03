import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchCryptos = createAsyncThunk(
	"crypto/fetchCryptos",
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
			.post(`${url}/crypto/findAll`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const addCrypto = createAsyncThunk("crypto/addCrypto", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.post(`${url}/crypto/create`, data, { headers })
		.then((response) => response.data);

	return { request, data };
});

export const updateCrypto = createAsyncThunk(
	"crypto/updateCrypto",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.patch(`${url}/crypto/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { request, data };
	}
);

export const deleteCrypto = createAsyncThunk("crypto/deleteCrypto", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.delete(`${url}/crypto/delete/${id}`, { headers })
		.then((response) => response.data);

	return { request };
});

export const slice = createSlice({
	name: "crypto",
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
		//fetchCryptos
		builder.addCase(fetchCryptos.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchCryptos.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.request.result.data;
		});
		builder.addCase(fetchCryptos.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addCrypto
		builder.addCase(addCrypto.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addCrypto.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Crypto was added successfully";
			state.error = false;
		});
		builder.addCase(addCrypto.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateCrypto
		builder.addCase(updateCrypto.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateCrypto.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Crypto was updated successfully";
			state.error = false;
		});
		builder.addCase(updateCrypto.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteCrypto
		builder.addCase(deleteCrypto.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteCrypto.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Crypto was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteCrypto.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const cryptoActions = slice.actions;
