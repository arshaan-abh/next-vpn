import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configData from "../config.json";

// Define the state shape for the feature slice
interface FeatureState {
	loading: boolean; // Indicates if fetching or updating features is in progress
	handleLoading: boolean; // Indicates if adding or deleting a feature is in progress
	data: any[]; // Holds the fetched feature data
	ready: boolean; // Indicates if the feature data is ready
	error: string | undefined; // Holds the error message, if any, during fetching features
	handleError: string | undefined; // Holds the error message, if any, during adding or deleting a feature
}

const initialState: FeatureState = {
	loading: false,
	handleLoading: false,
	data: [],
	ready: false,
	error: "",
	handleError: "",
};

interface UpdateFeaturePayload {
	id?: number;
	data?: any;
}

const url = `${configData.address}/Features`; // The API endpoint URL for features

// Async thunk for fetching features
export const fetchFeatures = createAsyncThunk(
	"feature/fetchFeatures",
	async (organid) => {
		// Perform an HTTP GET request to fetch the features based on the organization ID
		return axios
			.get(`${url}?OrganizationFeatureId=${organid}`)
			.then((response) => response.data);
	}
);

// Async thunk for adding a feature
export const addFeature = createAsyncThunk(
	"feature/addFeature",
	async (data) => {
		// Perform an HTTP POST request to add a new feature
		return axios.post(`${url}`, data).then((response) => response.data);
	}
);

// Async thunk for updating a feature
export const updateFeature = createAsyncThunk(
	"feature/updateFeature",
	async ({ id, data }: UpdateFeaturePayload) => {
		// Perform an HTTP PUT request to update an existing feature
		return axios.put(`${url}/${id}`, data).then((response) => response.data);
	}
);

// Async thunk for deleting a feature
export const deleteFeature = createAsyncThunk(
	"feature/deleteFeature",
	async (id: number) => {
		// Perform an HTTP DELETE request to delete an existing feature
		return axios.delete(`${url}/${id}`).then((response) => response.data);
	}
);

// Create a Redux slice for the feature
export const slice = createSlice({
	name: "feature",
	initialState,
	reducers: {
		clearHandleError: (state) => {
			// Action reducer to clear the handle error message
			state.handleError = "";
		},
	},
	extraReducers: (builder) => {
		// Fetch features
		builder.addCase(fetchFeatures.pending, (state) => {
			// Set the loading state to indicate the fetch operation is in progress
			state.loading = true;
		});
		builder.addCase(fetchFeatures.fulfilled, (state, action) => {
			// Set the loading state to false and update the feature data when fetch is successful
			state.loading = false;
			state.data = action.payload;
			state.ready = true; // Indicate that the feature data is ready
			state.error = ""; // Reset the error message
		});
		builder.addCase(fetchFeatures.rejected, (state, action) => {
			// Set the loading state to false and update the error message when fetch is unsuccessful
			state.loading = false;
			state.ready = false; // Indicate that the feature data is not ready
			state.error = action.error.message; // Store the error message
		});

		// Add feature
		builder.addCase(addFeature.pending, (state) => {
			// Set the handle loading state to indicate the add operation is in progress
			state.handleLoading = true;
		});
		builder.addCase(addFeature.fulfilled, (state) => {
			// Set the handle loading state to false and indicate the add operation was successful
			state.handleLoading = false;
			state.handleError = "success"; // Set the handle error message to success
		});
		builder.addCase(addFeature.rejected, (state, action) => {
			// Set the handle loading state to false and update the handle error message when add is unsuccessful
			state.handleLoading = false;
			state.handleError = action.error.message; // Store the handle error message
		});

		// Update feature
		builder.addCase(updateFeature.pending, (state) => {
			// Set the handle loading state to indicate the update operation is in progress
			state.handleLoading = true;
		});
		builder.addCase(updateFeature.fulfilled, (state) => {
			// Set the handle loading state to false and indicate the update operation was successful
			state.handleLoading = false;
			state.handleError = "success"; // Set the handle error message to success
		});
		builder.addCase(updateFeature.rejected, (state, action) => {
			// Set the handle loading state to false and update the handle error message when update is unsuccessful
			state.handleLoading = false;
			state.handleError = action.error.message; // Store the handle error message
		});

		// Delete feature
		builder.addCase(deleteFeature.pending, (state) => {
			// Set the handle loading state to indicate the delete operation is in progress
			state.handleLoading = true;
		});
		builder.addCase(deleteFeature.fulfilled, (state) => {
			// Set the handle loading state to false and indicate the delete operation was successful
			state.handleLoading = false;
			state.handleError = "success"; // Set the handle error message to success
		});
		builder.addCase(deleteFeature.rejected, (state, action) => {
			// Set the handle loading state to false and update the handle error message when delete is unsuccessful
			state.handleLoading = false;
			state.handleError = action.error.message; // Store the handle error message
		});
	},
});

export default slice.reducer;
export const featureActions = slice.actions;
