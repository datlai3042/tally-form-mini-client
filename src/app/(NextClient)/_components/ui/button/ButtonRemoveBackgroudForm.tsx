"use client";

import { Hexagon } from "lucide-react";
import React, { useContext } from "react";
import { FormEditContext } from "../../provider/FormEditProvider";

export interface ButtonRemoveBackgroudFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonRemoveBackgroudForm = (props: ButtonRemoveBackgroudFormProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const { textContent = "Remove cover", ...buttonProps } = props;

	const onRemoveBackgroudForm = () => {
		setFormInitial((prev) => {
			const newForm = { ...prev };
			delete newForm["form_background"];
			return newForm;
		});
	};

	return (
		<button
			{...buttonProps}
			className={` ${buttonProps.className} w-[14rem] flex items-center justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
			onClick={onRemoveBackgroudForm}
		>
			<Hexagon />
			{textContent}
		</button>
	);
};

export default ButtonRemoveBackgroudForm;
