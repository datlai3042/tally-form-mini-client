import { RootState } from "@/app/_lib/redux/store";
import useAddInput from "@/app/hooks/useAddInput";
import { FormCore } from "@/type";
import React from "react";
import { useSelector } from "react-redux";

export interface ButtonAddInputProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
	textContent?: string;
}

const ButtonAddInput = (props: ButtonAddInputProps) => {
	const { textContent = "Thêm Input", ...buttonProps } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const addInput = useAddInput();

	return (
		<button
			{...buttonProps}
			onClick={() => addInput.mutate({ form_id: formCore._id })}
			className={`${
				buttonProps.className || ""
			} text-left mt-[1rem] w-[25%] xl:w-[15%] h-[3.2rem] flex items-center justify-center bg-blue-400 hover:bg-color-main  text-white rounded-lg  text-[1.6rem`}
		>
			{textContent}
		</button>
	);
};

export default ButtonAddInput;
