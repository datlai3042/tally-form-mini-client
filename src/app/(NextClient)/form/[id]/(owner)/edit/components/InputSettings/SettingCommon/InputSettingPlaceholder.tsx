import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { inputSettingText } from "@/app/_constant/input.constant";
import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, useContext, useRef, useState } from "react";

type TProps = {
	inputItem: InputCore.Commom.InputCommonText;
	setInputItemString: React.Dispatch<SetStateAction<InputCore.Commom.InputCommonText>>;
};

const InputSettingPlaceholder = (props: TProps) => {
	const { inputItem, setInputItemString } = props;

	const [placeholder, setPlaceholder] = useState<string>(inputItem.core.setting.placeholder || "");

	const placeholderRef = useRef<HTMLDivElement | null>(null);

	const labelClick = () => {
		if (placeholderRef.current) {
			placeholderRef.current.focus();
		}
	};

	const handlePlaceholderInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (placeholderRef.current) {
			placeholderRef!.current!.textContent = e.target.textContent;
			const placeholderCurrent = placeholderRef.current.textContent;
			setInputItemString((prev) => {
				const newSetting = structuredClone(prev);
				newSetting.core.setting.placeholder = placeholderCurrent || inputSettingText.placeholder;
				return newSetting;
			});
		}
	};

	return (
		<DivNative className="h-max flex flex-col  justify-between gap-[.8rem]">
			<SpanNative textContent={`Placeholder`} onClick={labelClick} className="hover:cursor-pointer" />
			<DivNativeRef
				onClick={labelClick}
				ref={placeholderRef}
				contentEditable={true}
				onBlur={handlePlaceholderInput}
				className="input-setting border-[1px] border-slate-400 p-[.8rem_1rem] rounded-lg  outline-2 outline-blue-400"
				data-text={`${placeholder || inputSettingText.placeholder}`}
			></DivNativeRef>
		</DivNative>
	);
};

export default InputSettingPlaceholder;
