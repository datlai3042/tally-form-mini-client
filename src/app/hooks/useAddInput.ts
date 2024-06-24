import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import FormInputService from "../_services/FormInput.service";

type TProps = {};

const useAddInput = () => {
	const dispatch = useDispatch();

	const updateFormMutation = useMutation({
		mutationKey: ["add-input-form"],
		mutationFn: ({ form_id }: { form_id: string }) => FormInputService.addInput({ form_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return updateFormMutation;
};

export default useAddInput;
