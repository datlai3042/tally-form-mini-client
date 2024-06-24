import { useMutation } from "@tanstack/react-query";
import FormService from "../_services/form.service";
import { FormCore } from "@/type";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useAddSectionSubTitle = () => {
	const dispatch = useDispatch();

	const addSubTitleItem = useMutation({
		mutationKey: ["update-title-sub"],
		mutationFn: ({ type, form_id }: { type: FormCore.Title.TitleSub; form_id: string }) =>
			FormService.addSubTitleItem({ type, form_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return addSubTitleItem;
};

export default useAddSectionSubTitle;
