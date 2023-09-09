import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const url = `${configData.AddressAPI}`;

export const fetchUserConverts = createAsyncThunk(
	"convert/fetchUserConverts",
	async (
		data = {
			sort: "id",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(
				`${url}/convert/findAll-user-converts`,
				data,
				{
					headers,
				}
			);
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchAdminConverts = createAsyncThunk(
	"convert/fetchAdminConverts",
	async () => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(`${url}/convert/get-convert-report`, {
				headers,
			});
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addConvert = createAsyncThunk(
	"convert/addConvert",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(`${url}/convert/create-convert`, data, {
				headers,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const slice = createSlice({
	name: "convert",
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
		//fetchUserConverts
		builder.addCase(fetchUserConverts.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchUserConverts.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.userData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchAdminConverts
		builder.addCase(fetchAdminConverts.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchAdminConverts.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addConvert
		builder.addCase(addConvert.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addConvert.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Convert done successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const convertActions = slice.actions;
