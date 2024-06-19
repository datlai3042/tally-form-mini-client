import { InputCore } from "@/type";
import React from "react";

type TProps = {
	value: string;
	inputItem: InputCore.InputText.InputTypeText | InputCore.InputEmail.InputTypeEmail;
};

const MinMaxInput = (props: TProps) => {
	const { inputItem, value } = props;

	const styleEffect = {
		checkMinLength: (inputValue: string, inputSettingMin: number, inputRequire: boolean) => {
			const length = inputValue.length;
			if (!inputRequire) return;
			if (length < inputSettingMin) return "text-red-800 font-bold";
			return "text-blue-800";
		},

		checkMaxLength: (inputValue: string, inputSettingMax: number, inputRequire: boolean) => {
			const length = inputValue.length;
			if (!inputRequire) return;
			if (length > inputSettingMax) return "text-red-800";
			if (length <= inputSettingMax) return "text-blue-800";
		},
	};

	return (
		<p className="absolute bottom-[2.5rem] right-[2.5rem] text-[1.2rem]">
			<span
				className={`${styleEffect.checkMinLength(
					value,
					inputItem.core.setting.minLength,
					inputItem.core.setting.require
				)}  font-bold `}
			>
				{inputItem.core.setting.minLength}
			</span>
			<span>/</span>
			<span
				className={`${styleEffect.checkMaxLength(
					value,
					inputItem.core.setting.maxLength,
					inputItem.core.setting.require
				)}  font-bold `}
			>
				{value.length < inputItem.core.setting.maxLength ? inputItem.core.setting.maxLength : value.length}
			</span>
		</p>
	);
};

export default MinMaxInput;
