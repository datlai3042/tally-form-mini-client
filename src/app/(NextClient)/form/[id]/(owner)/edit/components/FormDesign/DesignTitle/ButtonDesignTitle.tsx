import { RootState } from "@/app/_lib/redux/store";
import { LayoutTemplate } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export interface ButtonDesginProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonDesignTitle = (props: ButtonDesginProps) => {
	const { textContent = "Thêm các mục phụ cho tiêu đề chính", ...buttonProps } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	return (
		<button
			style={{ color: colorMain }}
			{...buttonProps}
			className={` ${
				buttonProps.className || ""
			} w-max px-[1rem] h-[4rem]  flex items-center sm:justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-slate-200 hover:text-slate-700 outline-none`}
			// onClick={onOpenDesignModel}
		>
			<LayoutTemplate style={{ color: colorMain }} />
			{textContent}
		</button>
	);
};

export default ButtonDesignTitle;
