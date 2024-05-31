import { UserType } from "@/app/_schema/user/user.type";
import { FormCore } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	formCoreOriginal: FormCore.Form;
	formCoreBackUp: FormCore.Form;
};

const formInitital = {
	_id: "",
	form_title: "",
	form_button_label: "",
	form_avatar_state: false,
	form_background_state: false,
	form_inputs: [],
	form_setting_default: {
		form_avatar_default_url: "",
		form_background_default_url: "",
		form_title_size_default: 14,
		form_title_style_default: "normal",
		form_title_color_default: "#00000",
	},
	form_state: "isDraff" as FormCore.FormState,
};

const initialState: InitialState = {
	formCoreOriginal: formInitital,
	formCoreBackUp: formInitital,
};

const formEditSlice = createSlice({
	name: "formEdit",
	initialState,
	reducers: {
		onFetchForm: (state, data: PayloadAction<{ form: FormCore.Form }>) => {
			state.formCoreOriginal = data.payload.form;
			state.formCoreBackUp = data.payload.form;
		},

		onEditForm: (state, data: PayloadAction<{ form: FormCore.Form }>) => {
			state.formCoreOriginal = data.payload.form;
		},
	},
});

export const { onFetchForm, onEditForm } = formEditSlice.actions;
export default formEditSlice.reducer;
