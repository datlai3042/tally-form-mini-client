import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentication.slice";
import formEditSlice from "./features/formEdit.slice";
const store = configureStore({
	reducer: { authReducer, form: formEditSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
