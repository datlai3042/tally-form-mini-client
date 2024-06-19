import { FormCore, InputCore } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

export type UploadFileTitle = FormData & {
	append(name: "file" | "titleSubId" | "form_id", value: string | Blob, fileName?: string): void;
};

class FormService {
	static async createForm() {
		return Http.post<ResponseApi<{ form_id: string }>>("/v1/api/form/create-form", {});
	}

	static async getForms() {
		return Http.get<ResponseApi<{ forms: FormCore.Form[] }>>(`/v1/api/form/get-forms`);
	}

	static async getForm({ form_id }: { form_id: string }) {
		return Http.get<ResponseApi<{ form: FormCore.Form }>>(`/v1/api/form/get-form-id?form_id=${form_id}`);
	}

	static async updateSubTitle({
		form_title_sub,
		form_id,
	}: {
		form_title_sub: FormCore.Form["form_title"]["form_title_sub"];
		form_id: string;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-sub-title", {
			form_title_sub,
			form_id,
		});
	}

	static async setModeImageForm({ form_id, mode }: { form_id: string; mode: FormCore.Title.FormTitleImageMode }) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form-title-mode-image", {
			form_id,
			mode,
		});
	}

	static async uploadTitleImage(infoForm: UploadFileTitle) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/upload-sub-title-image", infoForm);
	}

	static async deleteFormId({ form_id }: { form_id: string }) {
		return Http.get<ResponseApi<{ form: FormCore.Form }>>(`/v1/api/form/delete-form-id?form_id=${form_id}`);
	}

	static async getFormGuess({ form_id, options }: { form_id: string; options?: RequestInit }) {
		return Http.get<ResponseApi<{ form: FormCore.Form }>>(
			`/v1/api/form/get-form-guess?form_id=${form_id}`,
			options
		);
	}

	static async updateInputItemForm(inputItem: InputCore.InputForm, form: FormCore.Form) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form", { inputItem, form });
	}

	static async updateForm(form: FormCore.Form) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form", { form });
	}

	static async uploadCover(infoForm: FormCore.uploadFile) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/upload-cover", infoForm);
	}

	static async uploadAvatar(infoForm: FormCore.uploadFile) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/upload-avatar", infoForm);
	}

	static async deleteAvatar(form_id: string, mode: "Image" | "NoFile") {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/delete-avatar", { form_id, mode });
	}

	static async deleteCover(form_id: string) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/delete-cover", { form_id });
	}

	static async updateSettingInput<SettingType extends InputCore.Setting.InputSettingCommon>(
		form: FormCore.Form,
		input_id: string,
		input_id_setting: SettingType
	) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-input-item-setting", {
			form,
			input_id,
			input_id_setting,
		});
	}

	static async addBackground(form: FormCore.Form) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-background", {
			form,
		});
	}

	static async addAvatar(form: FormCore.Form) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-avatar", {
			form,
		});
	}
}

export default FormService;
