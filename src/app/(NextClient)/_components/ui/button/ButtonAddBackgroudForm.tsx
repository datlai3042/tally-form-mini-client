"use client";

import { Hexagon, PanelTop } from "lucide-react";
import React, { useContext } from "react";
import { FormEditContext } from "../../provider/FormEditProvider";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";

export interface ButtonAddBackgroundFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonAddBackgroundForm = (props: ButtonAddBackgroundFormProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const { textContent = "Thêm ảnh bìa", ...buttonProps } = props;

	const addBackgroundMutation = useMutation({
		mutationKey: ["add-background"],
		mutationFn: (form: FormCore.Form) => FormService.addBackground(formInitial),
		onSuccess: (res) => {
			const { form } = res.metadata;
			setFormInitial(form);
		},
	});

	const onAddBackgroud = () => {
		addBackgroundMutation.mutate(formInitial);
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
