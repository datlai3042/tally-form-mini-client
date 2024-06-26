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
		return Http.get<ResponseApi<{ forms: FormCore.Form[] }>>(`/v1/api/form/get-forms`, { cache: "no-store" });
	}

	static async getForm({ form_id }: { form_id: string }) {
		return Http.get<ResponseApi<{ form: FormCore.Form }>>(`/v1/api/form/get-form-id?form_id=${form_id}`, {
			cache: "no-store",
		});
	}

	static async deleteFormForever({ form_id }: { form_id: string }) {
		return Http.delete<ResponseApi<{ message: string }>>(`/v1/api/form/delete-form-forever?form_id=${form_id}`);
	}

	static async setTitleForm({ form_id, value }: { form_id: string; value: string }) {
		return await Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/set-title-form", {
			form_id,
			value,
		});
	}

	static async getListFormDelete() {
		return Http.get<ResponseApi<{ forms: FormCore.Form[] }>>("/v1/api/form/get-list-form-delete", {
			cache: "no-cache",
		});
	}

	static async addSubTitleItem({
		type,
		form_id,
	}: {
		type: FormCore.FormTitleSub.FormTitleBase["type"];
		form_id: string;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/add-sub-title-item", { type, form_id });
	}

	static async deleteTitleSubItem({ title_sub_id, form_id }: { title_sub_id: string; form_id: string }) {
		return Http.delete<ResponseApi<{ form: FormCore.Form }>>(
			`/v1/api/form/delete-sub-title-item?form_id=${form_id}&title_sub_id=${title_sub_id}`
		);
	}

	static async changeModeForm({ mode, form_id }: { mode: FormCore.FormState; form_id: string }) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/change-form-mode", { mode, form_id });
	}

	static async changeModeDisplay({ mode, form_id }: { mode: FormCore.FormModeDisplay; form_id: string }) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/change-mode-display", { mode, form_id });
	}

	static async updateSubTitle({
		form_title_sub_id,
		form_title_sub_content,

		form_id,
	}: {
		form_title_sub_id: string;
		form_title_sub_content: string;

		form_id: string;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-sub-title-text", {
			form_title_sub_content,
			form_title_sub_id,
			form_id,
		});
	}

	static async updateSubTitleDescription({
		header_value,
		value,
		title_sub_id,
		form_id,
	}: {
		header_value: string;
		value: string;
		title_sub_id: string;
		form_id: string;
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-sub-title-description", {
			header_value,
			value,
			title_sub_id,
			form_id,
		});
	}

	static async setModeImageForm({
		form_id,
		mode,
	}: {
		form_id: string;
		mode: FormCore.FormTitle["form_title_mode_image"];
	}) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form-title-mode-image", {
			form_id,
			mode,
		});
	}

	static async uploadTitleImage(infoForm: UploadFileTitle) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/upload-sub-title-image", infoForm);
	}

	static async deleteFormId({ form_id }: { form_id: string }) {
		return Http.delete<ResponseApi<{ form: FormCore.Form }>>(`/v1/api/form/delete-form-id?form_id=${form_id}`);
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

	static async getInfoFormNotification({ form_id, notification_id }: { form_id: string; notification_id: string }) {
		return Http.get<
			ResponseApi<{ form: Pick<FormCore.Form, "form_avatar" | "form_title" | "form_setting_default"> }>
		>(`/v1/api/form/info-form-notification?form_id=${form_id}&notification_id=${notification_id}`);
	}
}

export default FormService;
