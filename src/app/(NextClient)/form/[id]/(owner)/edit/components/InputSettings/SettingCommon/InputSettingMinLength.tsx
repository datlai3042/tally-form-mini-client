import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useRef, useState } from "react";

type TProps = {
	inputItem: InputCore.Commom.InputCommonText;
	setInputItemString: React.Dispatch<SetStateAction<InputCore.Commom.InputCommonText>>;
};

const InputSettingMinLength = (props: TProps) => {
	const { inputItem, setInputItemString } = props;
	const [minLength, setMinLength] = useState<number>(inputItem.setting?.minLength || 8);

	const minLengthRef = useRef<HTMLInputElement | null>(null);

	const labelClick = () => {
		if (minLengthRef.current) {
			minLengthRef.current.focus();
		}
	};

	const handleMinLengthInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		setInputItemString((prev) => {
			const newSetting = structuredClone(prev);
			newSetting.setting.minLength = minLength;
			return newSetting;
		});
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">
			<SpanNative textContent={`Min`} onClick={labelClick} className="hover:cursor-pointer" />
			<input
				ref={minLengthRef}
				type="number"
				value={minLength}
				onBlur={handleMinLengthInput}
				onChange={(e) => setMinLength(+e.target.value)}
				className="w-[40%] border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
			/>
		</DivNative>
	);
};

export default InputSettingMinLength;
