import { FormCore } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "../_services/form.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useChangeModeForm = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const changeFormMode = useMutation({
		mutationKey: ["change-form-mode"],
		mutationFn: ({ mode, form_id }: { mode: FormCore.FormState; form_id: string }) =>
			FormService.changeModeForm({ mode, form_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
			queryClient.invalidateQueries({ queryKey: ["get-forms"] });
		},
	});

	return changeFormMode;
};

export default useChangeModeForm;
