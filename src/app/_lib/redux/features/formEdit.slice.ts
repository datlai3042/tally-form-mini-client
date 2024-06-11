import { UserType } from "@/app/_schema/user/user.type";
import { FormCore } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	formCoreOriginal: FormCore.Form;
	formCoreBackUp: FormCore.Form;
};

const formInitital: FormCore.Form = {
	_id: "",
	form_owner: "",
	form_title: {
		form_title_mode_image: "Normal",
		form_title_value: "",
		form_title_size: 40,
		form_title_color: "#2568aa",
		form_title_style: "normal",
		form_title_sub: [],
	},
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
		form_avatar_default_mode: "circle",
		form_avatar_default_postion: "left",
		form_background_position_default: { x: 0, y: 0 },
		input_color: "",
		input_size: 14,
		input_style: "normal",
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
