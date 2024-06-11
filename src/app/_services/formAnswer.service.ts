import { FormCore } from "@/type";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";

class FormAnswerService {
	static async addNewFormReport(formAnswer: {
		form_id: string;
		answers: FormCore.FormAnswer.InputFormData[];
		form_owner: string;
	}) {
		return Http.post<{ message: string }>("/v1/api/form-answer/add-new-form-report", { formAnswer });
	}

	static async getFormAnswer(form_id: string) {
		return Http.get<ResponseApi<{ formAnswer: FormCore.FormAnswer.FormAnswerCore }>>(
			`/v1/api/form-answer/get-form-answer?form_id=${form_id}`
		);
	}
}

export default FormAnswerService;
