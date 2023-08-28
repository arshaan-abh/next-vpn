import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./features/loginSlice";
import registerSlice from "./features/registerSlice";
import passwordSlice from "./features/passwordSlice";
import roleSlice from "./features/roleSlice";
import userSlice from "./features/userSlice";
import archSlice from "./features/archSlice";
import vpnSlice from "./features/vpnSlice";
import cryptoSlice from "./features/cryptoSlice";
import chargeSlice from "./features/chargeSlice";
import packageSlice from "./features/packageSlice";

const store = configureStore({
	reducer: {
		login: loginSlice,
		register: registerSlice,
		password: passwordSlice,
		role: roleSlice,
		user: userSlice,
		charge: chargeSlice,
		package: packageSlice,
		arch: archSlice,
		crypto: cryptoSlice,
		vpn: vpnSlice,
	},
});

export default store;
