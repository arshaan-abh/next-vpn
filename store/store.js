import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import registerSlice from "./features/registerSlice";
import passwordSlice from "./features/passwordSlice";
import roleSlice from "./features/roleSlice";
import userSlice from "./features/userSlice";
import archSlice from "./features/archSlice";

const store = configureStore({
	reducer: {
		login: loginSlice,
		register: registerSlice,
		password: passwordSlice,
		role: roleSlice,
		user: userSlice,
		arch: archSlice,
	},
});

export default store;
