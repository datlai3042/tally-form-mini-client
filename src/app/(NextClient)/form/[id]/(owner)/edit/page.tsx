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
import { useDispatch, useSelector } from "react-redux";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import FormDesignCustom from "./components/FormDesign/FormDesignCustom";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import FormPageGuess from "@/app/(NextClient)/_components/Layout/FormPageGuess";
import { RootState } from "@/app/_lib/redux/store";

const EditFormPage = ({ params }: { params: { id: string } }) => {
	const { openSidebar } = useContext(SidebarContext);
	const { modeScreen } = useContext(FormModeScreenContext);
	const { openFormDesign } = useContext(FormDesignContext);

	console.log({ layout: modeScreen, openFormDesign, 1: 1 });
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const styleEffect = {
		onCheckModeScreen: () => {
			if (modeScreen === "FULL")
				return " !min-h-screen !w-screen bg-formCoreBgColor !h-max flex justify-center relative  !top-0 !left-0 !duration-[1000] !transition-[scale] animate-modeScreen z-[500] ";
			return "";
		},
	};

	return (
		<div className="min-w-full flex flex-col ">
			<HeaderEditForm showHeaderAction={true} />
			<div className={`${styleEffect.onCheckModeScreen()} flex`}>
				<FormCore />
				{openFormDesign && modeScreen === "NORMAL" ? <FormDesignCustom /> : null}
			</div>
		</div>
	);
};

export default EditFormPage;
