"use client";

import React from "react";
import BoxLoading from "../BoxLoading";

export interface ButtonCustomProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent: string;
	loading?: boolean;
}

const Button = (props: ButtonCustomProps) => {
	const { textContent, ...buttonProps } = props;
	return (
		<button
			{...buttonProps}
			className={` ${buttonProps.className} w-full xl:w-[50%] min-h-[3rem] h-max p-[1.6rem_2rem] bg-slate-900 flex gap-[1rem] items-center justify-center text-white  rounded-md text-[1.4rem]`}
		>
			{textContent}
			<BoxLoading />
		</button>
	);
};

export default Button;
