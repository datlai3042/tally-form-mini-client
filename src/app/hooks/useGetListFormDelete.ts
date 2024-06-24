import { useQuery } from "@tanstack/react-query";
import FormService from "../_services/form.service";

const useGetListFormDelete = () => {
	const allFormDelete = useQuery({
		queryKey: ["get-list-form-delete"],
		queryFn: () => FormService.getListFormDelete(),
	});

	return allFormDelete;
};

export default useGetListFormDelete;
