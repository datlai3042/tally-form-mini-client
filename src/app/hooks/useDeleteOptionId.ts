import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { FormInput } from "lucide-react";
import { useDispatch } from "react-redux";
import FormInputService from "../_services/FormInput.service";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useDeleteOptionId = () => {
	const dispatch = useDispatch();

	const deleteOptionIdMutation = useMutation({
		mutationKey: ["delete-option-id"],
		mutationFn: ({
			form_id,
			inputItem_id,
			option_id,
		}: {
			form_id: FormCore.Form["_id"];
			inputItem_id: InputCore.InputOption.InputTypeOption["_id"];
			option_id: string;
		}) => FormInputService.deleteOption({ form_id, inputItem_id, option_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return { deleteOptionIdMutation };
};

export default useDeleteOptionId;
