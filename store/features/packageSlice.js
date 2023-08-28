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

export const fetchPackageCryptoArch = createAsyncThunk(
	"arch/fetchPackageCryptoArch",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const packagecryptoarch = await axios
			.get(`${url}/package/find-cryptoArch-package/${id}`, { headers })
			.then((response) => response.data);

		return { packagecryptoarch };
	}
);

export const addPackage = createAsyncThunk(
	"package/addPackage",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const pack = await axios
			.post(`${url}/package/create`, data, { headers })
			.then((response) => response.data);

		return { pack, data };
	}
);

export const addPackageCryptoArch = createAsyncThunk(
	"package/addPackageCryptoArch",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const packagecryptoarch = await axios
			.post(`${url}/package/create-package-cryptoArch`, data, { headers })
			.then((response) => response.data);

		return { packagecryptoarch, data };
	}
);

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

export const updatePackageCryptoArch = createAsyncThunk(
	"package/updatePackageCryptoArch",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const packagecryptoarch = await axios
			.patch(`${url}/package/update-package-cryptoArch/${id}`, data, { headers })
			.then((response) => response.data);

		return { packagecryptoarch, data };
	}
);

export const deletePackage = createAsyncThunk(
	"package/deletePackage",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const pack = await axios
			.delete(`${url}/package/delete/${id}`, { headers })
			.then((response) => response.data);

		return { pack };
	}
);

export const deletePackageCryptoArch = createAsyncThunk(
	"package/deletePackageCryptoArch",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const packagecryptoarch = await axios
			.delete(`${url}/package/delete-package-cryptoArch`, { headers })
			.then((response) => response.data);

		return { packagecryptoarch, data };
	}
);

export const slice = createSlice({
	name: "package",
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

		//fetchPackageCryptoArch
		builder.addCase(fetchPackageCryptoArch.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchPackageCryptoArch.fulfilled, (state, action) => {
			state.loadingData = false;
			state.cryptoData = action.payload.packagecryptoarch.result;
		});
		builder.addCase(fetchPackageCryptoArch.rejected, (state, action) => {
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

		//addPackageCryptoArch
		builder.addCase(addPackageCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addPackageCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Package crypto arch was added successfully";
			state.error = false;
		});
		builder.addCase(addPackageCryptoArch.rejected, (state, action) => {
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

		//updatePackageCryptoArch
		builder.addCase(updatePackageCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updatePackageCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Package crypto arch was updated successfully";
			state.error = false;
		});
		builder.addCase(updatePackageCryptoArch.rejected, (state, action) => {
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

		//deletePackageCryptoArch
		builder.addCase(deletePackageCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deletePackageCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "Package crypto arch was deleted successfully";
			state.error = false;
		});
		builder.addCase(deletePackageCryptoArch.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const packageActions = slice.actions;
