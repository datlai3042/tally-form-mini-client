"use client";
import React, { useContext, useEffect } from "react";
import HeaderEditForm from "./components/HeaderEditForm";
import FormCore from "./components/FormCore";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { SidebarContext } from "@/app/(NextClient)/dashboard/SidebarContext";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DashBoardLeft from "@/app/(NextClient)/dashboard/_components/layout/DashBoardLeft";
import { useQuery } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormDesignCustom from "./components/FormDesign/FormDesignCustom";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

const EditFormPage = ({ params }: { params: { id: string } }) => {
	const { openSidebar } = useContext(SidebarContext);
	const { modeScreen } = useContext(FormModeScreenContext);
	const { openFormDesign } = useContext(FormDesignContext);

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

	console.log({ layout: modeScreen });

	const styleEffect = {
		onCheckSidebar: (check: boolean) => {
			if (check)
				return "w-full sm:w-[65%] xl:w-[83.5%] left-0 sm:left-[35%] xl:left-[16.5%] right-0 duration-[300ms]";
			return "w-full inset-0 duration-[600ms]";
		},
		onCheckModeScreen: () => {
			if (modeScreen === "FULL")
				return " !min-h-screen !w-screen  !h-max fixed !overflow-hidden !top-0 !left-0 !duration-[1000] !transition-[scale] animate-modeScreen z-[50]";
			return "";
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
			<DivNative
				className={`${styleEffect.onCheckSidebar(
					openSidebar
				)} ${styleEffect.onCheckModeScreen()} absolute  h-full  transition-all    `}
			>
				<DivNative
					className={`${
						modeScreen === "FULL" ? "bg-formCoreBgColor pb-[4rem]" : "bg-[#ffffff]"
					} min-h-screen  h-max  flex flex-col  text-[1.4rem]   border-l-[.1rem]  border-slate-200 max-w-full `}
				>
					<DivNative
						className={`${
							modeScreen === "FULL" ? "w-[80%] sm:w-[65%] mx-auto  mt-[2rem]" : "w-full"
						} rounded-lg `}
					>
						<HeaderEditForm />
						<DivNative className=" w-full flex justify-center h-max  ">
							<FormCore />
							{openFormDesign && modeScreen === "NORMAL" ? <FormDesignCustom /> : null}
						</DivNative>
					</DivNative>
				</DivNative>
			</DivNative>
		</DivNative>
		// <TitleFormContextProvider>

		// </TitleFormContextProvider>
	);
};

export default EditFormPage;
