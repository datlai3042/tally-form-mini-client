"use client";
import FormService from "@/app/_services/form.service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import FormPageNotFound from "../../_components/Layout/FormPageNotFound";
import FormPageGuess from "../../_components/Layout/FormPageGuess";

const FormPage = ({ params }: { params: { id: string } }) => {
	const getFormQuery = useQuery({
		queryKey: ["get-form-guess", params.id],
		queryFn: () => FormService.getFormGuess({ form_id: params.id }),
	});
	return (
		<>
			{!getFormQuery.isPending && getFormQuery.data?.metadata.form && (
				<FormPageGuess FormCore={getFormQuery.data.metadata.form} />
			)}
			{!getFormQuery.isPending && !getFormQuery.data?.metadata.form && <FormPageNotFound />}
		</>
	);
};

export default FormPage;
