import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { inputSettingText } from "@/app/_constant/input.constant";
import { InputCore } from "@/type";
import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";

type TProps<
	InputType extends InputCore.Commom.InputCommon,
	SettingType extends InputCore.Setting.InputSettingCommon,
> = {
	inputItem: InputType;
	setInputItemString: React.Dispatch<SetStateAction<{ core: { setting: SettingType } }>>;
};
const InputSettingError = <
	InputType extends InputCore.Commom.InputCommon,
	Type extends InputCore.Setting.InputSettingCommon,
>(
	props: TProps<InputType, Type>
) => {
	const { inputItem, setInputItemString } = props;

	const [error, setError] = useState<string>(inputItem.core.setting.input_error || "Nhập placehoder của bạn");
	console.log({ error });
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
				const newSetting = structuredClone(prev);
				newSetting.core.setting.input_error = errorCurrent || inputSettingText.input_error;
				return newSetting;
			});
		}
	};

	return (
		<DivNative className="h-max flex flex-col  justify-between gap-[.6rem]">
			<SpanNative textContent={`Nhập thông báo lỗi`} onClick={labelClick} className="hover:cursor-pointer" />
			<DivNativeRef
				spellCheck={false}
				ref={errorRef}
				contentEditable={true}
				onBlur={handleErrorInput}
				className="input-setting  border-[1px] border-slate-400 p-[.8rem_1rem] rounded-lg  outline-2 outline-blue-400"
				data-text={`${error || inputSettingText.input_error}`}
			>
				{error}
			</DivNativeRef>
		</DivNative>
	);
};

export default InputSettingError;
