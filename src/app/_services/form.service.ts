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
}

export default FormService;
