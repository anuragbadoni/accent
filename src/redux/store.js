//! This file contains the main redux store

import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./AuthSlice";
import PostSlice from "./PostSlice";

export const store = configureStore({
	reducer: {
		auth: AuthSlice,
		post: PostSlice,
	},
});
