import { FormCore } from "@/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "../_services/form.service";
import { useDispatch } from "react-redux";

const useDeleteFormForever = () => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	const changeFormMode = useMutation({
		mutationKey: ["delete-form-forever"],
		mutationFn: ({ form_id }: { form_id: string }) => FormService.deleteFormForever({ form_id }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["get-list-form-delete"],
			});
		},
	});

	return changeFormMode;
};

export default useDeleteFormForever;
