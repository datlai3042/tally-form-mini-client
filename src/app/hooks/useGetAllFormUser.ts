import { useQuery } from "@tanstack/react-query";
import FormService from "../_services/form.service";
import { useEffect, useState } from "react";
import { FormCore } from "@/type";

const useGetAllFormUser = () => {
	const [forms, setForms] = useState<FormCore.Form[]>([]);

	const formsQuery = useQuery({
		queryKey: ["get-forms"],
		queryFn: () => FormService.getForms(),
	});

	useEffect(() => {
		if (formsQuery.isSuccess) {
			const { forms } = formsQuery.data.metadata;
			setForms(forms);
		}
	}, [formsQuery.isSuccess, formsQuery.data]);

	return { forms, pending: formsQuery.isPending, success: formsQuery.isSuccess };
};

export default useGetAllFormUser;
