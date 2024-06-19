import { FormCore, InputCore } from "@/type";
import Http from "../_lib/http";
import { useMutation } from "@tanstack/react-query";
import FormInputService from "../_services/FormInput.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

export const useUpdateTitleInput = async () => {
	const dispatch = useDispatch();

	const useUpdateTitleInput = useMutation({
		mutationKey: ["update-title-input"],
		mutationFn: ({
			input_title_value,
			input_id,
			form,
		}: {
			input_title_value: string;
			input_id: string;
			form: FormCore.Form;
		}) => FormInputService.setTitleInput({ input_title_value, input_id, form }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return useUpdateTitleInput;
};
