"use client";

import { Hexagon } from "lucide-react";
import React, { useContext } from "react";

export interface ButtonRemoveBackgroudFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonRemoveBackgroudForm = (props: ButtonRemoveBackgroudFormProps) => {
	const { textContent = "Change cover", ...buttonProps } = props;

	const onRemoveBackgroudForm = () => {};

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
