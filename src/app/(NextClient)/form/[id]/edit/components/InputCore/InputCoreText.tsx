import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { addInputFirstItem } from "@/app/_lib/utils";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { InputCore as TInputCore } from "@/type";
import InputCore from "./InputCore";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";

type TProps = {
	inputItem: TInputCore.InputText.InputTypeText;
};

const InputCoreText = (props: TProps) => {
	const { modeScreen } = useContext(FormModeScreenContext);

	const { inputItem } = props;

	const divContentRef = useRef<HTMLDivElement | null>(null);

	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<boolean>(false);

	const label = inputItem.input_heading && inputItem.input_heading_type === "LABEL" ? true : false;
	const title = inputItem.input_heading && inputItem.input_heading_type === "TITLE" ? true : false;
	const input_heading = inputItem.input_heading || "";

	const onPressEnter = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			if (modeScreen === "FULL") {
				return null;
			}

			e.preventDefault();
		}
	};

	console.log({ value });

	useEffect(() => {
		if (divContentRef.current) {
			divContentRef.current.textContent = "";
			setValue("");
		}
	}, [modeScreen]);

	const InputText = (
		<DivNative
			className={`${
				modeScreen === "FULL" ? "w-full sm:w-[75%]" : "w-[75%]"
			} min-h-[5rem] h-max flex items-center gap-[.5rem] `}
			onClick={() => divContentRef.current?.focus()}
		>
			<DivNativeRef
				ref={divContentRef}
				className="group w-full min-h-[8rem] p-[1.6rem] break-words whitespace-pre-wrap h-max border-[.1rem] border-gray-300 rounded-lg outline-none resize-none "
				onClick={() => divContentRef.current?.focus()}
				spellCheck={false}
				onKeyDown={onPressEnter}
				contentEditable={true}
				onInput={(e) => setValue(e.currentTarget.textContent || "")}
				data-text={`${inputItem.setting?.placeholder || "Typing your text"}`}
				suppressContentEditableWarning={true}
				tabIndex={0}
			>
				{error && (
					<SpanNative
						className="flex group-focus:hidden opacity-55"
						tabIndex={-1}
						textContent="Email khong dung dinh dang"
					/>
				)}
			</DivNativeRef>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputText}
			labelValue={label}
			titleValue={title}
			inputHeading={input_heading}
			inputItem={inputItem}
			type={"TEXT"}
		/>
	);
};

export default memo(InputCoreText);
