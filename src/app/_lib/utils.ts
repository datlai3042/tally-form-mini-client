import { CustomRequest, FormCore, InputCore, ReactCustom } from "@/type";
import { SetStateAction } from "react";
import { inputSettingText } from "../_constant/input.constant";
import Http from "./http";
import { ResponseApi } from "../_schema/api/response.shema";

export const validateEmail = (email: string) => {
	const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
	return email.match(regex);
};

export const normalizePath = (url: string) => {
	return url.startsWith("/") ? url.slice(1) : url;
};

export const expiresToken = (expireString: string) => {
	const expire = Date.parse(expireString);
	return expire / 1000;
};

export const getCookieValueHeader = (CookieName: string, CookiesString: string) => {
	const cookieSplit = CookiesString?.split(";");
	let cookies: { [key: string]: string } = {};
	cookieSplit.forEach((pair) => {
		const [name, value] = pair.split("=").map((item) => item.trim());
		cookies[name] = value;
	});

	return cookies[CookieName];
};

export const setValueLocalStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const removeValueLocalStorage = (key: string) => {
	localStorage.removeItem(key);
};

export const generateInfoRequest = (url: string, options: CustomRequest) => {
	const body = options?.body
		? options.body instanceof FormData
			? options.body
			: JSON.stringify(options.body)
		: undefined;

	const baseHeader =
		options?.body instanceof FormData
			? {}
			: {
					"Content-Type": "application/json",
			  };

	const baseUrl =
		options?.baseUrl === undefined
			? process.env.NEXT_PUBLIC_MODE === "DEV"
				? "http://localhost:4000"
				: process.env.BACK_END_URL
			: options.baseUrl;

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	return { body, baseHeader, baseUrl, fullUrl };
};

// Handle Form

export const setTitleForm = async (title: string, form: FormCore.Form) => {
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/set-title-form", {
		title,
		form,
	});

	return addInputAPI;
};

export const addInputToSectionTitle = async (title: string, form: FormCore.Form) => {
	const newForm = structuredClone(form);
	console.log({ form });
	newForm.form_title = title;
	const settingMerge = {
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	};

	newForm.form_inputs.push({ type: "TEXT", setting: { ...inputSettingText, ...settingMerge } });
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-input-to-title", {
		form: newForm,
	});

	return addInputAPI;
};

export const setLabelInput = async (label: string, inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newInput = { ...inputItem };
	newInput.input_heading = label;
	newInput.input_heading_type = "LABEL";
	newInput._id = inputItem._id;
	console.log({ newInput, inputItem });
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-input-item", {
		newInput,
		form,
	});

	return addInputAPI;
};

export const setTitleInput = async (label: string, inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newInput = { ...inputItem };
	newInput.input_heading = label;
	newInput.input_heading_type = "TITLE";
	newInput._id = inputItem._id;
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-input-item", {
		newInput,
		form,
	});

	return addInputAPI;
};

export const addInputItem = async (inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newForm = structuredClone(form);
	const indexInputCurrentEvent = form.form_inputs.findIndex((ip) => ip._id === inputItem._id);

	const settingMerge = {
		...inputItem.setting,
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	};

	const inputPush: InputCore.InputText.InputTypeText = { type: "TEXT", setting: settingMerge };
	newForm.form_inputs.splice(indexInputCurrentEvent + 1, 0, inputPush);

	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form", {
		form: newForm,
	});

	return addInputAPI;
};

export const removeInputWithId = async (form: FormCore.Form, inpur_id: string) => {
	const newForm = { ...form };
	newForm.form_inputs = form.form_inputs.filter((ele) => ele._id !== inpur_id);
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/delete-input-item", {
		form: newForm,
	});

	return addInputAPI;
};

export const renderStyleTitleCore = (formCore: FormCore.Form) => {
	return {
		fontSize: `${
			formCore.form_title_size
				? formCore.form_title_size / 10 + "rem"
				: formCore.form_setting_default.form_title_size_default / 10 + "rem"
		}`,
		color: `${
			formCore.form_title_color
				? formCore.form_title_color
				: formCore.form_setting_default.form_title_color_default
		}`,
		fontStyle: `${
			formCore.form_title_style
				? formCore.form_title_style
				: formCore.form_setting_default.form_title_style_default
		}`,
	};
};
