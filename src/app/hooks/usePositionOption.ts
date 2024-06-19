import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import FormService from "../_services/form.service";
import FormInputService from "../_services/FormInput.service";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const usePositionOption = () => {
	const dispatch = useDispatch();

	const updatePositionOptionMutation = useMutation({
		mutationKey: ["updatePositionOptionMutation"],
		mutationFn: ({
			form,
			inputItem,
			coreOption,
		}: {
			form: FormCore.Form;
			inputItem: InputCore.InputOption.InputTypeOption | InputCore.InputOptionMultiple.InputTypeOptionMultiple;
			coreOption:
				| InputCore.InputOption.InputTypeOption["core"]["options"]
				| InputCore.InputOptionMultiple.InputTypeOptionMultiple["core"]["options"];
		}) => FormInputService.updatePostionOption({ form, inputItem, coreOption }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return updatePositionOptionMutation;
};

export default usePositionOption;
