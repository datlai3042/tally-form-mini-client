"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext, useEffect, useState } from "react";
import HeaderEditForm from "./edit/components/HeaderEditForm";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormChangeMode from "./_components/FormChangeMode";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import LayoutSidebar from "@/app/(NextClient)/_components/Layout/LayoutSidebar";
import Link from "next/link";

export type FormPageMode = "edit" | "submit" | "share" | "summary";

const FormModeLayout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
	const { modeScreen } = useContext(FormModeScreenContext);
	const segment = useSelectedLayoutSegments();
	const [formPageMode, setFormPageMode] = useState<FormPageMode>(segment[1] as FormPageMode);

	const dispatch = useDispatch();

	const getFormQuery = useQuery({
		queryKey: ["get-form", params.id],
		queryFn: () => FormService.getForm({ form_id: params.id }),
	});

	useEffect(() => {
		if (getFormQuery.isSuccess) {
			const { form } = getFormQuery.data.metadata;
			dispatch(onFetchForm({ form }));
		}
	}, [getFormQuery.isSuccess, params.id, getFormQuery.data, dispatch]);

	useEffect(() => {
		console.log({ "Chế độ": segment });
	}, []);

	return (
		<LayoutSidebar>
			{getFormQuery.data?.metadata.form && (
				<DivNative
					className={`${
						modeScreen === "FULL" ? "bg-formCoreBgColor pb-[4rem]" : "bg-[#ffffff]"
					} min-h-screen  h-max  flex flex-col  text-[1.4rem]   border-l-[.1rem]  border-slate-200 max-w-full `}
				>
					<DivNative className={`w-full rounded-lg h-max `}>
						{segment[0] !== "edit" && getFormQuery.data?.metadata.form && (
							<>
								<HeaderEditForm showHeaderAction={segment[1] === "edit"} />

								<FormChangeMode formPageMode={formPageMode} setFormPageMode={setFormPageMode}>
									{children}
								</FormChangeMode>
							</>
						)}
						{segment[0] === "edit" && getFormQuery.data?.metadata.form && children}
					</DivNative>
				</DivNative>
			)}
			{getFormQuery.isSuccess && !getFormQuery.data?.metadata.form && (
				<div className="min-h-full w-full flex items-center justify-center border-l-[.1rem] border-gray-200">
					<div className="min-h-full  flex flex-col items-center    gap-[2rem]">
						<p className="text-[6rem] font-medium">Không tìm thấy Form</p>
						<Link
							href={"/dashboard"}
							className="min-w-[16rem] h-[4rem] p-[1rem_2rem] flex items-center justify-center text-[1.6rem] bg-blue-600 text-[#ffffff] rounded-lg"
						>
							Tạo form mới
						</Link>
					</div>
				</div>
			)}
		</LayoutSidebar>
	);
};

export default FormModeLayout;
