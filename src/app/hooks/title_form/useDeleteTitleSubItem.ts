import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormService from "@/app/_services/form.service";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";

const useDeleteTitleSubItem = () => {
	const dispatch = useDispatch();

	const deleteSubTitleItem = useMutation({
		mutationKey: ["delete-title-sub-item"],
		mutationFn: ({ form_id, title_sub_id }: { form_id: string; title_sub_id: string }) =>
			FormService.deleteTitleSubItem({ form_id, title_sub_id }),

		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return deleteSubTitleItem;
};

export default useDeleteTitleSubItem;
