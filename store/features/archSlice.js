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

		const arches = await axios
			.post(`${url}/arch/find-all`, data, { headers })
			.then((response) => response.data);

		return { arches, data };
	}
);

export const fetchCryptoArches = createAsyncThunk(
	"arch/fetchCryptoArches",
	async ({
		id,
		data = {
			sort: "id",
			order: -1,
			filter: {},
		},
	}) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		let dataFix = data;
		dataFix.archId = id;

		const cryptoarches = await axios
			.post(`${url}/arch/get-crypto-arch`, data, { headers })
			.then((response) => response.data);

		return { cryptoarches, data };
	}
);

export const addArch = createAsyncThunk("arch/addArch", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const arch = await axios
		.post(`${url}/arch/create`, data, { headers })
		.then((response) => response.data);

	return { arch, data };
});

export const addCryptoArch = createAsyncThunk("arch/addCryptoArch", async (data) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const cryptoarch = await axios
		.post(`${url}/arch/create-crypto-arch`, data, { headers })
		.then((response) => response.data);

	return { cryptoarch, data };
});

export const updateArch = createAsyncThunk(
	"arch/updateArch",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const arch = await axios
			.patch(`${url}/arch/update/${id}`, data, { headers })
			.then((response) => response.data);

		return { arch, data };
	}
);

export const updateCryptoArch = createAsyncThunk(
	"arch/updateCryptoArch",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const cryptoarch = await axios
			.patch(`${url}/arch/update-cryptoarch/${id}`, data, { headers })
			.then((response) => response.data);

		return { cryptoarch, data };
	}
);

export const deleteArch = createAsyncThunk("arch/deleteArch", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const arch = await axios
		.delete(`${url}/arch/delete/${id}`, { headers })
		.then((response) => response.data);

	return { arch };
});

export const deleteCryptoArch = createAsyncThunk(
	"arch/deleteCryptoArch",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const cryptoarch = await axios
			.delete(`${url}/arch/delete-cryptoarch/${id}`, { headers })
			.then((response) => response.data);

		return { cryptoarch };
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
		//fetchArchs
		builder.addCase(fetchArches.pending, (state, action) => {
			state.loadingData = true;
			state.snackMessage = "";
		});
		builder.addCase(fetchArches.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.arches.result.data;
		});
		builder.addCase(fetchArches.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//fetchCryptoArches
		builder.addCase(fetchCryptoArches.pending, (state, action) => {
			state.loadingData = true;
			state.snackMessage = "";
		});
		builder.addCase(fetchCryptoArches.fulfilled, (state, action) => {
			state.loadingData = false;
			state.cryptoData = action.payload.cryptoarches.result.data;
		});
		builder.addCase(fetchCryptoArches.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addArch
		builder.addCase(addArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Arch was added successfully";
			state.error = false;
		});
		builder.addCase(addArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//addCryptoArch
		builder.addCase(addCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Crypto arch was added successfully";
			state.error = false;
		});
		builder.addCase(addCryptoArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateArch
		builder.addCase(updateArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Arch was updated successfully";
			state.error = false;
		});
		builder.addCase(updateArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateCryptoArch
		builder.addCase(updateCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Crypto arch was updated successfully";
			state.error = false;
		});
		builder.addCase(updateCryptoArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteArch
		builder.addCase(deleteArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Arch was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteCryptoArch
		builder.addCase(deleteCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Crypto arch was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteCryptoArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const archActions = slice.actions;
