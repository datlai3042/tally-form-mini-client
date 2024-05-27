import { FormCore } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

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

	static async updateForm(form: FormCore.Form) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/update-form", { form });
	}

	static async uploadCover(infoForm: FormCore.uploadFile) {
		return Http.post<ResponseApi<{ form: FormCore.Form["form_background"] }>>(
			"/v1/api/form/upload-cover",
			infoForm
		);
	}

	static async uploadAvatar(infoForm: FormCore.uploadFile) {
		return Http.post<ResponseApi<{ form: FormCore.Form["form_avatar"] }>>("/v1/api/form/upload-avatar", infoForm);
	}

	static async deleteAvatar(form_id: string) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/delete-avatar", { form_id });
	}

	static async deleteCover(form_id: string) {
		return Http.post<ResponseApi<{ form: FormCore.Form }>>("/v1/api/form/delete-cover", { form_id });
	}
}

export default FormService;
