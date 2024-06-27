import React, { memo, useContext, useEffect, useRef, useState } from "react";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { FormCore, InputCore as TInputCore } from "@/type";
import InputCore from "./InputCore";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

type TProps = {
	inputItem: TInputCore.InputText.InputTypeText;
};

const InputCoreText = (props: TProps) => {
	const { modeScreen } = useContext(FormModeScreenContext);
	const { theme } = useContext(ThemeContext);

	const { inputItem } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const form_mode_display = formCore.form_mode_display === "custom";

	const divContentRef = useRef<HTMLDivElement | null>(null);

	const [value, setValue] = useState<string>("");

	const title = inputItem.input_title ? inputItem.input_title : "";

	const onPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			if (modeScreen === "FULL") {
				return null;
			}

			e.preventDefault();
		}
	};

	useEffect(() => {
		if (divContentRef.current) {
			divContentRef.current.textContent = "";
			setValue("");
		}
	}, [modeScreen]);

	const InputText = (
		<DivNative
			className={`${
				modeScreen === "FULL" ? "w-full sm:w-[75%]" : "w-full"
			} min-h-[5rem] h-max flex flex-col  gap-[.5rem] `}
			onClick={() => divContentRef.current?.focus()}
		>
			<SpanNative
				textContent="Nhập thông tin của bạn vào ô dưới"
				className={`${
					form_mode_display ? "group-hover:!text-[#ffffff]" : "text-[#000]"
				} text-[1.6rem] font-semibold`}
			/>

			<DivNativeRef
				style={{ color: "#000" }}
				ref={divContentRef}
				className={`${
					theme === "dark" ? "bg-text-theme" : ""
				} relative group  group-hover:!bg-[#ffffff] w-full min-h-[8rem] p-[1.6rem] break-words whitespace-pre-wrap h-max border-[.1rem] border-gray-300 rounded-lg outline-none resize-none `}
				// onClick={() => divContentRef.current?.focus()}
				spellCheck={false}
				onKeyDown={onPressEnter}
				contentEditable={true}
				onInput={(e) => setValue(e.currentTarget.textContent || "")}
				data-text={`${inputItem.core?.setting?.placeholder || "Typing your text"}`}
				suppressContentEditableWarning={true}
				tabIndex={0}
			></DivNativeRef>
		</DivNative>
	);

	return <InputCore InputComponent={InputText} inputTitle={title} inputItem={inputItem} />;
};

export default memo(InputCoreText);
