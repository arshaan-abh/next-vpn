import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const url = `${configData.AddressAPI}`;

export const fetchUserCharges = createAsyncThunk(
	"charge/fetchUserCharges",
	async () => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(`${url}/charge/user-charges`, {
				headers,
			});
			return { data: response.data.result.data.chargeHistory };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchAdminCharges = createAsyncThunk(
	"charge/fetchAdminCharges",
	async () => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(`${url}/charge/get-charge-report`, {
				headers,
			});
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addCharge = createAsyncThunk("charge/addCharge", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.post(`${url}/charge/charge-wallet`, data, {
			headers,
		});
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const checkTransaction = createAsyncThunk(
	"charge/checkTransaction",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(
				`${url}/charge/check-transaction`,
				data,
				{
					headers,
				}
			);
			return { data: response.data.result };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const slice = createSlice({
	name: "charge",
	initialState: {
		loadingData: false,
		loadingAction: false,
		error: false,
		snackMessage: "",
		stage: "",
		data: [],
		userData: [],
		transactionData: {},
	},
	reducers: {
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
			state.error = false;
		},
		clearStage: (state, action) => {
			state.stage = "";
		},
	},
	extraReducers: (builder) => {
		//fetchUserCharges
		builder.addCase(fetchUserCharges.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchUserCharges.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.userData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchAdminCharges
		builder.addCase(fetchAdminCharges.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchAdminCharges.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addCharge
		builder.addCase(addCharge.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addCharge.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Charge done successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//checkTransaction
		builder.addCase(checkTransaction.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(checkTransaction.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Transaction was successfully verfied";
				state.stage = "purchased";
				state.transactionData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const chargeActions = slice.actions;
