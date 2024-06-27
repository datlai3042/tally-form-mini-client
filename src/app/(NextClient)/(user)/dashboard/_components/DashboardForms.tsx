import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work
import { Pencil } from "lucide-react";
import DashboardFormAction from "./DashboardFormAction";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import FormEmpty from "./FormEmpty";
import { SidebarContext } from "../SidebarContext";

moment.locale("vi");

const DashboardForms = () => {
	const { forms, pending, success } = useGetAllFormUser();

	return (
		<DivNative className="scroll-color-main max-w-full h-full overflow-scroll flex flex-col ">
			{pending && (
				<div className="w-full min-h-[12rem]">
					<LoadingArea />
				</div>
			)}
			{success && (
				<DivNative className="flex flex-col gap-[2rem] pb-[10rem]">
					{forms.map((form, index) => (
						<Link
							href={`/form/${form._id}/share`}
							key={form._id}
							className="group h-[12rem] xl:h-[8rem] w-full max-w-full p-[1rem_2rem] flex flex-col xl:flex-row  justify-between gap-[1rem]  text-text-theme bg-color-main rounded-md"
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

			{pending && (
				<div className="mt-[-10rem] w-full h-[50rem]">
					<LoadingArea />
				</div>
			)}

			{success && forms.length === 0 && <FormEmpty />}
		</DivNative>
	);
};

export default DashboardForms;
