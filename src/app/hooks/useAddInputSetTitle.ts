import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormInputService from "@/app/_services/FormInput.service";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { FormInput } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {};

const useAddInputSetTitle = () => {
	const dispatch = useDispatch();

	const updateFormMutation = useMutation({
		mutationKey: ["add-input-form"],
		mutationFn: ({ form, title }: { form: FormCore.Form; title: string }) =>
			FormInputService.addInputSetTitle(form, title),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return updateFormMutation;
};

export default useAddInputSetTitle;
