import { FormCore, InputCore } from "@/type";
import React from "react";

type TProps = {
	inputItem: InputCore.InputEmail.InputTypeEmail;
	formCore: FormCore.Form;
};

const InputEmailTitle = (props: TProps) => {
	const { formCore, inputItem } = props;

	const styleEffect = {
		styleTitle: () => {
			return {
				fontSize: inputItem.setting.input_size || formCore.form_setting_default.input_size,
				color: inputItem.setting.input_color || formCore.form_setting_default.input_color,
				fontStyle: inputItem.setting.input_style || formCore.form_setting_default.input_style,
			};
		},
	};

	return (
		<p style={styleEffect.styleTitle()} className="flex items-center gap-[.6rem] text-[2rem] font-medium">
			{inputItem.input_heading || "Không có tiêu đề"}
			{inputItem.setting.require && <span className="text-red-800">*</span>}
		</p>
	);
};

export default InputEmailTitle;
