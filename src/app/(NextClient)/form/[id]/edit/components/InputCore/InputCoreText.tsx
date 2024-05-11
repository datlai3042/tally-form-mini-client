import React, { useContext, useRef, useState } from "react";
import { addInputFirstItem } from "@/app/_lib/utils";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { InputCore as TInputCore } from "@/type";
import InputCore from "./InputCore";

type TProps = {
	inputItem: TInputCore.InputText.InputTypeText;
	indexItem: number;
};

const InputCoreText = (props: TProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const { modeScreen } = useContext(FormModeScreenContext);

	const { indexItem, inputItem } = props;

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
			addInputFirstItem(setFormInitial);
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	const InputText = (
		<DivNative
			className=" min-h-[5rem] h-max w-[70%] flex items-center gap-[.5rem] "
			onClick={() => divContentRef.current?.focus()}
		>
			<DivNative
				className="group w-full min-h-[10rem] p-[1.2rem] break-words whitespace-pre-wrap h-max border-[1px] border-slate-200 rounded-md outline-none resize-none "
				onClick={() => divContentRef.current?.focus()}
				spellCheck={false}
				onKeyDown={onPressEnter}
				contentEditable={true}
				onInput={(e) => setValue(e.currentTarget.textContent || "")}
				suppressContentEditableWarning={true}
				tabIndex={0}
			>
				{!value && (
					<SpanNative
						className="flex group-focus:hidden opacity-55"
						tabIndex={-1}
						textContent={
							(formInitial.form_inputs[indexItem] as TInputCore.InputText.InputTypeText).placeholder ||
							"Typing your text"
						}
					/>
				)}

				{error && (
					<SpanNative
						className="flex group-focus:hidden opacity-55"
						tabIndex={-1}
						textContent="Email khong dung dinh dang"
					/>
				)}
			</DivNative>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputText}
			labelValue={label}
			titleValue={title}
			inputHeading={input_heading}
			indexItem={indexItem}
			type={"TEXT"}
		/>
	);
};

export default InputCoreText;
