"use client";

import { Hexagon } from "lucide-react";
import React, { useContext } from "react";
import { FormEditContext } from "../../provider/FormEditProvider";

export interface ButtonRemoveAvatarFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonRemoveAvatarForm = (props: ButtonRemoveAvatarFormProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const { textContent = "Remove Logo", ...buttonProps } = props;

	const onRemoveAvatar = () => {
		setFormInitial((prev) => {
			const newForm = { ...prev };
			delete newForm["form_avatar"];
			return newForm;
		});
	};

	return (
		<button
			{...buttonProps}
			className={` ${buttonProps.className} w-[14rem] flex items-center justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
			onClick={onRemoveAvatar}
		>
			<Hexagon />
			{textContent}
		</button>
	);
};

export default ButtonRemoveAvatarForm;
