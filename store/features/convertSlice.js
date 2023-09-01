import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";

const url = `${configData.AddressAPI}`;

export const fetchConverts = createAsyncThunk(
	"convert/fetchConverts",
	async () => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const converts = await axios
			.get(`${url}/convert/findAll-user-converts`, { headers })
			.then((response) => response.data);

		return { converts };
	}
);

export const addConvert = createAsyncThunk("convert/addConvert", async () => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const convert = await axios
		.get(`${url}/convert/create-convert`, { headers })
		.then((response) => response.data);

	return { convert };
});

export const slice = createSlice({
	name: "convert",
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
		//fetchConverts
		builder.addCase(fetchConverts.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchConverts.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.converts.result.data;
		});
		builder.addCase(fetchConverts.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addConvert
		builder.addCase(addConvert.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addConvert.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Convert done successfully";
			state.error = false;
		});
		builder.addCase(addConvert.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const convertActions = slice.actions;
