import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { inputSettingText } from "@/app/_constant/input.constant";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useRef, useState } from "react";

type TProps = {
	inputItem: InputCore.InputCommonText;
	setInputItemString: React.Dispatch<SetStateAction<InputCore.InputCommonText>>;
};

const InputSettingError = (props: TProps) => {
	const { inputItem, setInputItemString } = props;

	const [error, setError] = useState<string>(inputItem.setting.input_error || "Nhập placehoder của bạn");

	const errorRef = useRef<HTMLDivElement | null>(null);

	const labelClick = () => {
		if (errorRef.current) {
			errorRef.current.focus();
		}
	};

	const handleErrorInput = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (errorRef.current) {
			errorRef!.current!.textContent = e.target.textContent;
			const errorCurrent = errorRef.current.textContent;
			setInputItemString((prev) => {
				const newSetting = { ...prev };
				newSetting.setting.input_error = errorCurrent || inputSettingText.input_error;
				return newSetting;
			});
		}
	};

	return (
		<DivNative className="h-max flex flex-col  justify-between gap-[.8rem]">
			<SpanNative textContent={`Error`} onClick={labelClick} className="hover:cursor-pointer" />
			<DivNativeRef
				ref={errorRef}
				contentEditable={true}
				onBlur={handleErrorInput}
				className="border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
				data-text={`${error || inputSettingText.input_error}`}
			></DivNativeRef>
		</DivNative>
	);
};

export default InputSettingError;
