import { configureStore } from "@reduxjs/toolkit";
import featureSlice from "./slice/featureSlice";

// Configure the Redux store
const store = configureStore({
	reducer: {
		feature: featureSlice, // Set the featureSlice as the reducer for the "feature" slice
	},
});

export type AppDispatch = typeof store.dispatch;

// Define RootState using ReturnType<typeof store.getState()>
export type RootState = ReturnType<typeof store.getState>;

export default store;
