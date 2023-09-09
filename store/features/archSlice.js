import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchArches = createAsyncThunk(
	"arch/fetchArches",
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
			const response = await axios.post(`${url}/arch/find-all`, data, {
				headers,
			});
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchCryptoArches = createAsyncThunk(
	"arch/fetchCryptoArches",
	async ({
		id,
		data = {
			sort: "id",
			order: -1,
		},
	}) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		let dataFix = data;
		dataFix.archId = id;

		try {
			const response = await axios.post(
				`${url}/arch/get-crypto-arch`,
				dataFix,
				{ headers }
			);
			return { data: response.data.result[0] };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchAllCryptoArches = createAsyncThunk(
	"arch/fetchAllCryptoArches",
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
				`${url}/arch/find-all-cryptoarch`,
				data,
				{ headers }
			);
			return { data: response.data.result };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addArch = createAsyncThunk("arch/addArch", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.post(`${url}/arch/create`, data, { headers });
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const addCryptoArch = createAsyncThunk(
	"arch/addCryptoArch",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(
				`${url}/arch/create-crypto-arch`,
				data,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updateArch = createAsyncThunk(
	"arch/updateArch",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(`${url}/arch/update/${id}`, data, {
				headers,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updateCryptoArch = createAsyncThunk(
	"arch/updateCryptoArch",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(
				`${url}/arch/update-cryptoarch/${id}`,
				data,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const deleteArch = createAsyncThunk("arch/deleteArch", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	try {
		const response = await axios.delete(`${url}/arch/delete/${id}`, {
			headers,
		});
		return { data: response.data };
	} catch (error) {
		return { error: JSON.parse(error.request.response).errors.value };
	}
});

export const deleteCryptoArch = createAsyncThunk(
	"arch/deleteCryptoArch",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.delete(
				`${url}/arch/delete-cryptoarch/${id}`,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const slice = createSlice({
	name: "arch",
	initialState: {
		loadingData: false,
		loadingAction: false,
		error: false,
		snackMessage: "",
		data: [],
		cryptoData: [],
	},
	reducers: {
		clearSnackMessage: (state, action) => {
			state.snackMessage = "";
			state.error = false;
		},
	},
	extraReducers: (builder) => {
		//fetchArches
		builder.addCase(fetchArches.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchArches.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchCryptoArches
		builder.addCase(fetchCryptoArches.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchCryptoArches.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.cryptoData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchAllCryptoArches
		builder.addCase(fetchAllCryptoArches.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchAllCryptoArches.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.cryptoData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addArch
		builder.addCase(addArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Arch was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addCryptoArch
		builder.addCase(addCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Crypto was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updateArch
		builder.addCase(updateArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Arch was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updateCryptoArch
		builder.addCase(updateCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Crypto was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deleteArch
		builder.addCase(deleteArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Arch was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deleteCryptoArch
		builder.addCase(deleteCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Crypto was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const archActions = slice.actions;
