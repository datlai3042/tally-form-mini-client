"use client";

import { Hexagon, PanelTop } from "lucide-react";
import React, { useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import FormDesignCustom from "@/app/(NextClient)/form/[id]/edit/components/FormDesign/FormDesignCustom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormDesignContext } from "../../../../../../_components/provider/FormDesignProvider";

export interface ButtonDesginProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonDesgin = (props: ButtonDesginProps) => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { setOpenFormDesign } = useContext(FormDesignContext);
	const { textContent = "Tùy biến Form", ...buttonProps } = props;

	const onOpenDesignModel = () => {
		setOpenFormDesign(true);
	};

	return (
		<>
			<button
				{...buttonProps}
				className={` ${
					buttonProps.className || ""
				} w-[14rem] h-[4rem] flex items-center justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
				onClick={onOpenDesignModel}
			>
				<PanelTop />
				{textContent}
			</button>
		</>
	);
};

export default ButtonDesgin;
