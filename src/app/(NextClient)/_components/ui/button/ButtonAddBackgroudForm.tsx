"use client";

import { Hexagon, PanelTop } from "lucide-react";
import React, { useContext } from "react";
import { FormEditContext } from "../../provider/FormEditProvider";

export interface ButtonAddBackgroundFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonAddBackgroundForm = (props: ButtonAddBackgroundFormProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const { textContent = "Thêm ảnh bìa", ...buttonProps } = props;

	const onAddBackgroud = () => {
		const backgroundUrl = formInitial.form_setting_default.form_background_default_url;
		setFormInitial((prev) => ({ ...prev, form_background: { form_background_iamge_url: backgroundUrl } }));
	};

	return (
		<button
			{...buttonProps}
			className={` ${buttonProps.className} w-[14rem] flex items-center justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
			onClick={onAddBackgroud}
		>
			<PanelTop />
			{textContent}
		</button>
	);
};

export default ButtonAddBackgroundForm;
