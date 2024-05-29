import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import DivNative from "../../_components/ui/NativeHtml/DivNative";
import Link from "next/link";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

moment.locale("vi");

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
							className="min-h-[10rem] h-max max-w-full p-[1rem_3rem] flex flex-col justify-center gap-[2rem] bg-slate-100 rounded-md"
						>
							<span>Tiêu đề Form: {form.form_title || "None"}</span>
							<DivNative className="w-full flex justify-between">
								<span>Chỉnh sửa {moment(new Date(form.updatedAt!)).fromNow()}</span>
								<span>Tạo vào: {moment(form.createdAt).format("h:mm DD-MM-YYYY ")}</span>
							</DivNative>
						</Link>
					))}
				</DivNative>
			)}
		</DivNative>
	);
};

export default DashboardForms;
