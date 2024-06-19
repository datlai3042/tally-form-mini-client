"use client";

import { Hexagon, PanelTop } from "lucide-react";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { FormText } from "@/app/_constant/formUi.constant";

export interface ButtonDesginProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonDesgin = (props: ButtonDesginProps) => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { setOpenFormDesign } = useContext(FormDesignContext);
	const { textContent = FormText.buttonDesign.custom, ...buttonProps } = props;

	const onOpenDesignModel = () => {
		setOpenFormDesign((prev) => !prev);
	};

	return (
		<>
			<button
				{...buttonProps}
				className={` ${
					buttonProps.className || ""
				} min-w-[14rem] w-max px-[1rem] h-[4rem] flex items-center sm:justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
				onClick={onOpenDesignModel}
			>
				<PanelTop />
				{textContent}
			</button>
		</>
	);
};

export default ButtonDesgin;
