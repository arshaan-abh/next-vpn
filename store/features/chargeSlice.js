import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const url = `${configData.AddressAPI}`;

export const fetchCharges = createAsyncThunk(
	"charge/fetchCharges",
	async () => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const request = await axios
			.get(`${url}/charge/user-charges`, { headers })
			.then((response) => response.data);

		return { request };
	}
);

export const addCharge = createAsyncThunk("charge/addCharge", async () => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const request = await axios
		.get(`${url}/charge/user-wallet`, { headers })
		.then((response) => response.data);

	return { request };
});

export const slice = createSlice({
	name: "charge",
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
		//fetchCharges
		builder.addCase(fetchCharges.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchCharges.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.request.result.data;
		});
		builder.addCase(fetchCharges.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addCharge
		builder.addCase(addCharge.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addCharge.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Charge done successfully";
			state.error = false;
		});
		builder.addCase(addCharge.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const chargehargeActions = slice.actions;
