import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DivNative from "../../_components/ui/NativeHtml/DivNative";
import Link from "next/link";

const DashboardForms = () => {
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

	return (
		<DivNative className="max-w-full  flex flex-col">
			{formsQuery.isPending && <DivNative className="w-full h-[20rem] animate-pulse bg-gray-200"></DivNative>}
			{formsQuery.isSuccess && (
				<DivNative className="flex flex-col gap-[1rem]">
					{forms.map((form, index) => (
						<Link
							href={`/form/${form._id}/edit	`}
							key={form._id}
							className="min-h-[80px] h-max max-w-full  hover:bg-slate-300 rounded-md"
						>
							{form.form_title || "None"}
						</Link>
					))}
				</DivNative>
			)}
		</DivNative>
	);
};

export default DashboardForms;
