import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import FormService from "../_services/form.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useChangeModeDisplay = () => {
	const dispatch = useDispatch();

	const changeModeDisplay = useMutation({
		mutationKey: ["change-mode-display"],
		mutationFn: ({ mode, form_id }: { mode: FormCore.FormModeDisplay; form_id: string }) =>
			FormService.changeModeDisplay({ mode, form_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return changeModeDisplay;
};

export default useChangeModeDisplay;
