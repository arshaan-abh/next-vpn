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

		try {
			const response = await axios.post(`${url}/package/findAll`, data, {
				headers,
			});
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchPackageCryptoArches = createAsyncThunk(
	"package/fetchPackageCryptoArches",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(
				`${url}/package/find-cryptoArch-package/${id}`,
				{ headers }
			);
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchAllPackageCryptoArches = createAsyncThunk(
	"package/fetchAllPackageCryptoArches",
	async () => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(
				`${url}/package/find-all-PackageCryptoArch`,
				{ headers }
			);
			return { data: response.data.result.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const fetchPackageVpns = createAsyncThunk(
	"package/fetchPackageVpns",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.get(`${url}/package/get-vpn-package/${id}`, {
				headers,
			});
			return { data: response.data.result[0].vpn };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addPackage = createAsyncThunk(
	"package/addPackage",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(`${url}/package/create`, data, {
				headers,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const addPackageCryptoArch = createAsyncThunk(
	"package/addPackageCryptoArch",
	async (data) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.post(
				`${url}/package/create-package-cryptoArch`,
				data,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updatePackage = createAsyncThunk(
	"package/updatePackage",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(`${url}/package/update/${id}`, data, {
				headers,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const updatePackageCryptoArch = createAsyncThunk(
	"package/updatePackageCryptoArch",
	async ({ id, data }) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.patch(
				`${url}/package/update-package-cryptoArch/${id}`,
				data,
				{
					headers,
				}
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const deletePackage = createAsyncThunk(
	"package/deletePackage",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.delete(`${url}/package/remove/${id}`, {
				headers,
			});
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
	}
);

export const deletePackageCryptoArch = createAsyncThunk(
	"package/deletePackageCryptoArch",
	async (id) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		try {
			const response = await axios.delete(
				`${url}/package/delete-package-cryptoArch/${id}`,
				{ headers }
			);
			return { data: response.data };
		} catch (error) {
			return { error: JSON.parse(error.request.response).errors.value };
		}
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
		vpnData: [],
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
			if (!action.payload.error) {
				state.data = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchPackageCryptoArches
		builder.addCase(fetchPackageCryptoArches.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchPackageCryptoArches.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.cryptoData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchAllPackageCryptoArches
		builder.addCase(fetchAllPackageCryptoArches.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchAllPackageCryptoArches.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.cryptoData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//fetchPackageVpns
		builder.addCase(fetchPackageVpns.pending, (state, action) => {
			state.loadingData = true;
		});
		builder.addCase(fetchPackageVpns.fulfilled, (state, action) => {
			state.loadingData = false;
			if (!action.payload.error) {
				state.vpnData = action.payload.data;
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addPackage
		builder.addCase(addPackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addPackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Package was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//addPackageCryptoArch
		builder.addCase(addPackageCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(addPackageCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Package crypto arch was added successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updatePackage
		builder.addCase(updatePackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updatePackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Package was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//updatePackageCryptoArch
		builder.addCase(updatePackageCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updatePackageCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Package crypto arch was updated successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deletePackage
		builder.addCase(deletePackage.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deletePackage.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Package was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});

		//deletePackageCryptoArch
		builder.addCase(deletePackageCryptoArch.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deletePackageCryptoArch.fulfilled, (state, action) => {
			state.loadingAction = false;
			if (!action.payload.error) {
				state.snackMessage = "Package crypto arch was deleted successfully";
				state.error = false;
			} else {
				state.snackMessage = action.payload.error;
				state.error = true;
			}
		});
	},
});

export default slice.reducer;
export const packageActions = slice.actions;
