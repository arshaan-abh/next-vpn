import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import registerSlice from "./features/registerSlice";

const store = configureStore({
	reducer: {
		login: loginSlice,
		register: registerSlice,
	},
});

export default store;
