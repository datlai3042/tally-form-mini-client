"use client";
import React, { useContext } from "react";

import HeaderEditForm from "./components/HeaderEditForm";
import FormCore from "./components/FormCore";

import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormDesignCustom from "./components/FormDesign/FormDesignCustom";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { CSS } from "styled-components/dist/types";
import { useSelectedLayoutSegment, useSelectedLayoutSegments } from "next/navigation";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";

const EditFormPage = ({ params }: { params: { id: string } }) => {
	const { modeScreen } = useContext(FormModeScreenContext);
	const { openFormDesign } = useContext(FormDesignContext);
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const containerStyleWhenOpenFormDesign = openFormDesign && !openSidebar ? "mr-[28rem]  " : "";
	// const wrapperStyleWhenOpenSideBar = openFormDesign && !openSidebar
	// 	? "w-[79rem]"
	// 	: "min-w-[35rem] sm:min-w-[45rem] xl:min-w-[60rem] xl:w-max";

	const containerStyleWhenOpenSideBar = openSidebar && !openFormDesign ? "w-[calc(100vw-25rem)]" : "";

	const containerStyleWhenNormal = !openFormDesign && !openSidebar ? " w-full" : "";

	const containerStyleWhenOver = openFormDesign && openSidebar ? " w-[calc(100vw-54rem)] " : "";

	return (
		<div
			className={`${containerStyleWhenNormal} ${containerStyleWhenOpenFormDesign} ${containerStyleWhenOpenSideBar} ${containerStyleWhenOver} flex flex-col  `}
			style={{ "--bg-input-core": colorMain } as CSS.Properties}
		>
			<HeaderEditForm showHeaderAction={true} />
			{formCore && (
				<div className={`  flex `}>
					<FormCore />
					{openFormDesign && modeScreen === "NORMAL" ? <FormDesignCustom /> : null}
				</div>
			)}
		</div>
	);
};

export default EditFormPage;
