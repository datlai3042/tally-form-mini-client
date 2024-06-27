import { FormText } from "@/app/_constant/formUi.constant";
import { RootState } from "@/app/_lib/redux/store";
import { LayoutTemplate } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export interface ButtonDesginProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonDesignTitle = (props: ButtonDesginProps) => {
	const { textContent = FormText.title.addOptionTitle, ...buttonProps } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	return (
		<button
			{...buttonProps}
			className={` ${
				buttonProps.className || ""
			}    rounded-xl text-[1.5rem] font-bold bg-blue-400 text-[#fff] hover:bg-color-main  w-max px-[1rem] h-[4rem]  flex items-center sm:justify-center gap-[.5rem]  outline-none`}
		>
			<LayoutTemplate />
			{textContent}
		</button>
	);
};

export default ButtonDesignTitle;
