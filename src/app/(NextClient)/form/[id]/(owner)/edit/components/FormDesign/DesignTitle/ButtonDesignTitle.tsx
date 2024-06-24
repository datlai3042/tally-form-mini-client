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

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	return (
		<button
			// style={{ color: colorMain }}
			{...buttonProps}
			className={` ${
				buttonProps.className || ""
			}  text-textHeader  rounded-xl text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700 w-max px-[1rem] h-[4rem]  flex items-center sm:justify-center gap-[.5rem]  outline-none`}
			// onClick={onOpenDesignModel}
		>
			<LayoutTemplate />
			{textContent}
		</button>
	);
};

export default ButtonDesignTitle;
