import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authentication.slice";
import formEditSlice from "./features/formEdit.slice";
import formAnswerSlice from "./features/formAnswer.slice";
const store = configureStore({
	reducer: { authReducer, form: formEditSlice, formAsnwer: formAnswerSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
