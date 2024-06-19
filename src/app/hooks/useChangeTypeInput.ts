import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import FormInputService from "../_services/FormInput.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useChangeTypeInput = () => {
	const dispatch = useDispatch();

	const updateTypeInputMutation = useMutation({
		mutationKey: ["update-input-type"],
		mutationFn: ({
			form,
			inputItem,
			type,
		}: {
			form: FormCore.Form;
			inputItem: InputCore.InputForm;
			type: InputCore.InputForm["type"];
		}) => FormInputService.changeTypeInput({ form, inputItem, type }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return updateTypeInputMutation;
};

export default useChangeTypeInput;
