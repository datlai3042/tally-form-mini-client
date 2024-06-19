import { FormCore, InputCore } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

class FormInputService {
	static async addInputSetTitle(form: FormCore.Form, title: string) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-input-to-title", { form, title });
	}

	static async setTitleInput({
		input_title_value,
		input_id,
		form,
	}: {
		input_title_value: string;
		input_id: string;
		form: FormCore.Form;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-title-input", {
			input_title_value,
			input_id,
			form,
		});
	}

	static async addInputToEnter({
		form,
		input_id_target,
		setting,
	}: {
		form: FormCore.Form;
		input_id_target: string;
		setting: InputCore.Setting.InputSettingTextCommon;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-input-to-enter", {
			form,
			input_id_target,
			setting,
		});
	}

	static async changeTypeInput({
		form,
		inputItem,
		type,
	}: {
		form: FormCore.Form;
		inputItem: InputCore.InputForm;
		type: InputCore.InputForm["type"];
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/change-input-type", {
			form,
			inputItem,
			type,
		});
	}

	static async addOption({
		form,
		option_id,
		option_value,
		inputItem,
	}: {
		form: FormCore.Form;
		option_id: string;
		option_value: string;
		inputItem: InputCore.InputOption.InputTypeOption | InputCore.InputOptionMultiple.InputTypeOptionMultiple;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("v1/api/form/add-option-value", {
			form,
			option_id,
			option_value,
			inputItem,
		});
	}

	static async updatePostionOption({
		form,
		inputItem,
		coreOption,
	}: {
		form: FormCore.Form;
		inputItem: InputCore.InputOption.InputTypeOption | InputCore.InputOptionMultiple.InputTypeOptionMultiple;
		coreOption:
			| InputCore.InputOption.InputTypeOption["core"]["options"]
			| InputCore.InputOptionMultiple.InputTypeOptionMultiple["core"]["options"];
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("v1/api/form/update-position-option", {
			form,
			inputItem,
			coreOption,
		});
	}

	static async deleteOption({
		form_id,
		inputItem_id,
		option_id,
	}: {
		form_id: FormCore.Form["_id"];
		inputItem_id: InputCore.InputOption.InputTypeOption["_id"];
		option_id: string;
	}) {
		return Http.delete<ResponseApi<{ form: FormCore.Form }>>(
			`v1/api/form/delete-option-id?form_id=${form_id}&inputItem_id=${inputItem_id}&option_id=${option_id}`
		);
	}
}

export default FormInputService;
