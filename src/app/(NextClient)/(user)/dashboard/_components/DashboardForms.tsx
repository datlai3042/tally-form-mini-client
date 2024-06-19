import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { Pencil } from "lucide-react";
import DashboardFormAction from "./DashboardFormAction";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";

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
			{formsQuery.isPending && <DivNative className="w-full h-[12rem] animate-pulse bg-gray-200"></DivNative>}
			{formsQuery.isSuccess && (
				<DivNative className="flex flex-col gap-[2rem] pb-[10rem]">
					{forms.map((form, index) => (
						<Link
							href={`/form/${form._id}/share`}
							key={form._id}
							className="group h-[12rem] xl:h-[8rem] w-full max-w-full p-[1rem_2rem] flex flex-col xl:flex-row  justify-between gap-[1rem]  hover:bg-gray-200 rounded-md"
						>
							<div className="max-w-[70%] flex flex-col justify-center gap-[1rem]">
								<span className="max-w-[90%] truncate text-[1.6rem] font-semibold">
									{form?.form_title?.form_title_value || "None"}
								</span>
								<span>Chỉnh sửa {moment(new Date(form.updatedAt!)).fromNow()}</span>
							</div>
							<DivNative className="group-hover:flex hidden items-center">
								<DashboardFormAction form_id={form._id} />
							</DivNative>
						</Link>
					))}
				</DivNative>
			)}

			{formsQuery.data?.metadata.forms.length === 0 && (
				<div className="flex items-center mt-[10rem]  flex-col gap-[2rem]">
					<p className="text-[6rem] font-medium">Bạn chưa tạo form</p>
					<p>Hãy tạo form để trải nghiệm các chứa năng nha</p>
				</div>
			)}
		</DivNative>
	);
};

export default DashboardForms;
