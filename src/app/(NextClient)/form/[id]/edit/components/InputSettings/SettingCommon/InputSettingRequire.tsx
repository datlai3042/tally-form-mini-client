import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useState } from "react";

type TProps = {
	inputItem: InputCore.InputCommonText;
	setInputItemString: React.Dispatch<SetStateAction<InputCore.InputCommonText>>;
};

const InputSettingRequire = (props: TProps) => {
	const { inputItem, setInputItemString } = props;
	const [require, setRequire] = useState<boolean>(inputItem.setting?.require || false);

	const styleEffect = {
		onActiveRequireWrapper: () => {
			if (inputItem.setting.require) return "bg-blue-400";
			return "bg-slate-300";
		},
		onActiveRequireCircle: () => {
			if (inputItem.setting.require) return "right-0";
			return " left-0";
		},
	};

	const handleRequireInput = () => {
		setInputItemString((prev) => {
			const newSetting = { ...prev };
			newSetting.setting.require = !prev.setting.require;
			return newSetting;
		});
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">
			<label htmlFor="">Require {JSON.stringify(require)}</label>
			<DivNative
				className={`${styleEffect.onActiveRequireWrapper()} relative  w-[5rem] h-[2.4rem] transition-all duration-700 rounded-3xl border-[1px] border-slate-300 hover:cursor-pointer`}
				onClick={handleRequireInput}
			>
				<DivNative
					className={`${styleEffect.onActiveRequireCircle()} absolute bg-[#ffffff] w-[2.4rem]  transition-all duration-10000 aspect-square rounded-full `}
				></DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputSettingRequire;
