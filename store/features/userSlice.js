import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";
import { getLocalStorageItem } from "../../utils/handleLocalStorage";
const url = `${configData.AddressAPI}`;

export const fetchUsers = createAsyncThunk(
	"role/fetchUsers",
	async (
		data = {
			sort: "id",
			order: -1,
			filter: {},
		}
	) => {
		const roletoken = getLocalStorageItem("roletoken");
		const headers = { Authorization: `Bearer ${roletoken}` };

		const users = await axios
			.post(`${url}/user/findall-user`, data, { headers })
			.then((response) => response.data);

		return { users, data };
	}
);

export const updateUser = createAsyncThunk("user/updateUser", async ({ id, data }) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const user = await axios
		.patch(`${url}/user/update/${id}`, data, { headers })
		.then((response) => response.data);

	return { user, data };
});

export const deleteUser = createAsyncThunk("user/deleteUser", async (id) => {
	const roletoken = getLocalStorageItem("roletoken");
	const headers = { Authorization: `Bearer ${roletoken}` };

	const user = await axios
		.delete(`${url}/user/remove/${id}`, { headers })
		.then((response) => response.data);

	return { user };
});

export const slice = createSlice({
	name: "user",
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
		//fetchUsers
		builder.addCase(fetchUsers.pending, (state, action) => {
			state.loadingData = true;
			state.snackMessage = "";
		});
		builder.addCase(fetchUsers.fulfilled, (state, action) => {
			state.loadingData = false;
			state.data = action.payload.users.result.data;
		});
		builder.addCase(fetchUsers.rejected, (state, action) => {
			state.loadingData = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//updateUser
		builder.addCase(updateUser.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(updateUser.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "User was updated successfully";
			state.error = false;
		});
		builder.addCase(updateUser.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});

		//deleteUser
		builder.addCase(deleteUser.pending, (state, action) => {
			state.loadingAction = true;
			state.snackMessage = "";
		});
		builder.addCase(deleteUser.fulfilled, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = "User was deleted successfully";
			state.error = false;
		});
		builder.addCase(deleteUser.rejected, (state, action) => {
			state.loadingAction = false;
			state.snackMessage = action.error.message;
			state.error = true;
		});
	},
});

export default slice.reducer;
export const userActions = slice.actions;
