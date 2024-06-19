import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import FormInputService from "../_services/FormInput.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useAddOptionServer = () => {
	const dispatch = useDispatch();

	const addOptionValue = useMutation({
		mutationKey: ["add-option"],
		mutationFn: ({
			form,
			option_id,
			option_value,
			inputItem,
		}: {
			form: FormCore.Form;
			option_id: string;
			option_value: string;
			inputItem: InputCore.InputOption.InputTypeOption | InputCore.InputOptionMultiple.InputTypeOptionMultiple;
		}) => FormInputService.addOption({ form, option_id, option_value, inputItem }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return addOptionValue;
};

export default useAddOptionServer;
