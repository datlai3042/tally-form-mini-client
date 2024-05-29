"use client";
import { FormCore } from "@/type";
import React, { SetStateAction, createContext, useState } from "react";

type TFormEditContext = {
	formInitial: FormCore.Form;
	setFormInitial: React.Dispatch<SetStateAction<FormCore.Form>>;
};

export const FormEditContext = createContext<TFormEditContext>({
	formInitial: {
		_id: "",
		form_avatar_state: false,
		form_background_state: false,
		form_title: "",
		form_button_label: "",
		form_inputs: [],
		form_setting_default: { form_avatar_default_url: "", form_background_default_url: "" },
		form_state: "isDraff",
	},

	setFormInitial: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const FormEditContextProvider = (props: TProps) => {
	const { children } = props;
	const [formInitial, setFormInitial] = useState<FormCore.Form>({
		_id: "",
		form_title: "",
		form_button_label: "",
		form_avatar_state: false,
		form_background_state: false,
		form_inputs: [],
		form_setting_default: {
			form_avatar_default_url: "",
			form_background_default_url: "",
		},
		form_state: "isDraff",
	});

	return <FormEditContext.Provider value={{ formInitial, setFormInitial }}>{children}</FormEditContext.Provider>;
};

export default FormEditContextProvider;
