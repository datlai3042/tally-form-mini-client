import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useRef, useState } from "react";

type TProps = {
	inputItem: InputCore.Commom.InputCommonText;
	setInputItemString: React.Dispatch<SetStateAction<InputCore.Commom.InputCommonText>>;
};

const InputSettingMaxLength = (props: TProps) => {
	const { inputItem, setInputItemString } = props;
	const [maxLength, setMaxLength] = useState<number>(inputItem.setting.maxLength || 100);

	const maxLengthRef = useRef<HTMLInputElement | null>(null);

	const labelClick = () => {
		if (maxLengthRef.current) {
			maxLengthRef.current.focus();
		}
	};

	const handleMaxLengthInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		setInputItemString((prev) => {
			const newSetting = structuredClone(prev);
			newSetting.setting.minLength = maxLength;
			return newSetting;
		});
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">
			<SpanNative textContent={`Max`} onClick={labelClick} className="hover:cursor-pointer" />
			<input
				ref={maxLengthRef}
				onBlur={handleMaxLengthInput}
				onChange={(e) => setMaxLength(+e.target.value)}
				type="number"
				value={maxLength}
				className="w-[40%] border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
			/>
		</DivNative>
	);
};

export default InputSettingMaxLength;
