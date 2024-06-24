import { CustomRequest, FormCore, InputCore } from "@/type";
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

	let baseUrl;
	if (options?.baseUrl === undefined) {
		if (process.env.NEXT_PUBLIC_MODE === "DEV") {
			baseUrl = "http://localhost:4000";
		} else {
			baseUrl = process.env.NEXT_PUBLIC_BACK_END_URL;
		}
	} else {
		baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL;
	}

	const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

	console.log({ endPoint: fullUrl });

	return { body, baseHeader, baseUrl, fullUrl };
};

// Handle Form

// export const setTitleForm = async (form: FormCore.Form) => {
// 	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/set-title-form", {
// 		form,
// 	});

// 	return addInputAPI;
// };

export const addInputToSectionTitle = async (title: string, form: FormCore.Form) => {
	const newForm = structuredClone(form);
	newForm.form_title.form_title_value = title;
	const settingMerge = {
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	};

	newForm.form_inputs.push({ type: "TEXT", core: { setting: { ...inputSettingText, ...settingMerge } } });
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-input-to-title", {
		form: newForm,
	});

	return addInputAPI;
};

//delete
export const setTitleInput = async (title: string, inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newInput = { ...inputItem };
	newInput.input_title = title;
	newInput._id = inputItem._id;

	console.log({ newInput, inputItem });
	const addInputAPI = await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-input-item", {
		newInput,
		form,
	});

	return addInputAPI;
};

//delete
export const addInputItem = async (inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const newForm = structuredClone(form);
	const indexInputCurrentEvent = form.form_inputs.findIndex((ip) => ip._id === inputItem._id);

	const settingMerge = {
		...inputItem.core.setting,
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	} as InputCore.Setting.InputSettingTextCommon;

	const inputPush: InputCore.InputText.InputTypeText = { type: "TEXT", core: { setting: settingMerge } };
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
			formCore.form_title.form_title_size
				? formCore.form_title.form_title_size / 10 + "rem"
				: formCore.form_setting_default.form_title_size_default / 10 + "rem"
		}`,
		color: `${
			formCore.form_title.form_title_color
				? formCore.form_title.form_title_color
				: formCore.form_setting_default.form_title_color_default
		}`,
		fontStyle: `${
			formCore.form_title.form_title_style
				? formCore.form_title.form_title_style
				: formCore.form_setting_default.form_title_style_default
		}`,
	};
};

//xóa dấu tiếng việt
export const stringToSlug = (str: string) => {
	// remove accents
	const from = "àáãảạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệđùúủũụưừứửữựòóỏõọôồốổỗộơờớởỡợìíỉĩịäëïîöüûñçýỳỹỵỷ",
		to = "aaaaaaaaaaaaaaaaaeeeeeeeeeeeduuuuuuuuuuuoooooooooooooooooiiiiiaeiiouuncyyyyy";
	for (let i = 0, l = from.length; i < l; i++) {
		str = str.replace(RegExp(from[i], "gi"), to[i]);
	}

	str = str
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\-]/g, "-")
		.replace(/-+/g, "-");

	return str;
};

export const checkValueHref = (value: string) => {
	const regex = new RegExp("^(http|https)://", "i");
	return value.match(regex);
};

export const filterTypeInput = <InputType extends InputCore.InputForm>(
	_id: string,
	inputItem: InputCore.InputForm
): inputItem is InputType => {
	return _id === inputItem._id;
};
