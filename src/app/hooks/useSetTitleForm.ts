import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormInputService from "@/app/_services/FormInput.service";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormInput } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {};

const useSetTitleForm = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const updateFormMutation = useMutation({
		mutationKey: ["set-title-form"],
		mutationFn: ({ form_id, value }: { form_id: string; value: string }) =>
			FormService.setTitleForm({ form_id, value }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
			queryClient.invalidateQueries({ queryKey: ["get-forms"] });
		},
	});

	return updateFormMutation;
};

export default useSetTitleForm;
