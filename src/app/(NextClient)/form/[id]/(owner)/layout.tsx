"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { SidebarContext } from "@/app/(NextClient)/dashboard/SidebarContext";
import DashBoardLeft from "@/app/(NextClient)/dashboard/_components/layout/DashBoardLeft";
import React, { useContext, useEffect, useState } from "react";
import HeaderEditForm from "./edit/components/HeaderEditForm";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormChangeMode from "./_components/FormChangeMode";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { useSelectedLayoutSegment } from "next/navigation";

export type FormPageMode = "edit" | "submit" | "share" | "summary";

const FormModeLayout = ({ children, params }: { children: React.ReactNode; params: { id: string } }) => {
	const { openSidebar } = useContext(SidebarContext);
	const { modeScreen } = useContext(FormModeScreenContext);
	const segment = useSelectedLayoutSegment();
	const [formPageMode, setFormPageMode] = useState<FormPageMode>(segment as FormPageMode);

	const dispatch = useDispatch();

	console.log({ segment });

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

	const styleEffect = {
		onCheckSidebar: (check: boolean) => {
			if (check)
				return "w-full sm:w-[65%] xl:w-[83.5%] left-0 sm:left-[35%] xl:left-[16.5%] right-0 duration-[300ms]";
			return "w-full  ";
		},
	};

	return (
		<DivNative className="relative w-screen  min-h-screen h-max flex overflow-x-hidden ">
			{openSidebar && (
				<aside
					className={` absolute z-[2] w-[0%] sm:w-[35%] xl:w-[16.5%] min-h-full h-max  hidden sm:block transition-[width]  duration-1000  bg-[#ffffff] `}
				>
					{openSidebar && <DashBoardLeft />}
				</aside>
			)}
			<DivNative className={`${styleEffect.onCheckSidebar(openSidebar)}   absolute  h-full  transition-all    `}>
				<DivNative
					className={`${
						modeScreen === "FULL" ? "bg-formCoreBgColor pb-[4rem]" : "bg-[#ffffff]"
					} min-h-screen  h-max  flex flex-col  text-[1.4rem]   border-l-[.1rem]  border-slate-200 max-w-full `}
				>
					<DivNative className={`w-full rounded-lg h-max pb-[5rem]`}>
						{segment !== "edit" && getFormQuery.data?.metadata.form && (
							<>
								<HeaderEditForm showHeaderAction={segment === "edit"} />

								<FormChangeMode formPageMode={formPageMode} setFormPageMode={setFormPageMode}>
									{children}
								</FormChangeMode>
							</>
						)}
						{segment === "edit" && getFormQuery.data?.metadata.form && children}
					</DivNative>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default FormModeLayout;
