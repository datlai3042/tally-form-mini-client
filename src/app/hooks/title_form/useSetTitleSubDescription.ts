import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormService from "@/app/_services/form.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useSetTitleSubDescription = () => {
	const dispatch = useDispatch();

	const setTitleSubDescription = useMutation({
		mutationKey: ["set-value-title-sub-description"],
		mutationFn: ({
			header_value,
			value,
			title_sub_id,
			form_id,
		}: {
			header_value: string;
			value: string;
			title_sub_id: string;
			form_id: string;
		}) => FormService.updateSubTitleDescription({ header_value, value, title_sub_id, form_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return setTitleSubDescription;
};

export default useSetTitleSubDescription;
