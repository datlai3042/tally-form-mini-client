import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { setLabelInput } from "@/app/_lib/utils";
import { InputCore } from "@/type";
import React, { memo, useContext, useEffect, useRef, useState } from "react";

type TProps = {
	inputItem: InputCore.InputForm;
};

const InputLabel = (props: TProps) => {
	const { inputItem } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const [focus, setFocus] = useState<boolean>(false);
	const labelRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(inputItem.input_heading || "");

	useEffect(() => {
		labelRef.current?.focus();
		setFocus(true);
	}, []);

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	const onSetLabel = async (e: React.ChangeEvent<HTMLDivElement>) => {
		if (labelRef.current) {
			labelRef!.current!.textContent = e.target.textContent;
			const labelCurrent = labelRef.current.textContent || "";
			console.log({ inputItem });
			const newFormUpdate = await setLabelInput(labelCurrent, inputItem, formInitial);
			const { form } = newFormUpdate.metadata;
			setFormInitial(form);
			setFocus(false);
		}
	};

	return (
		<DivNative className=" min-h-full h-max w-[70%] flex gap-[.5rem] ">
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					className="group max-w-full break-all whitespace-pre-wrap h-max border-none outline-none resize-none text-[1.8rem] bg-[#ffffff]"
					autoFocus={true}
					ref={labelRef}
					onKeyDown={onPressEnter}
					onBlur={onSetLabel}
					contentEditable={true}
					defaultValue={inputItem.input_heading || ""}
					suppressContentEditableWarning={true}
					data-text={`${inputItem.input_heading || "Label"}`}
					spellCheck={false}
					tabIndex={0}
				>
					{inputItem.input_heading}
				</DivNativeRef>
			)}

			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value}
					className="w-max max-w-[80rem] text-[1.6rem] opacity-50  font-medium   break-all whitespace-pre-wrap"
				/>
			)}
		</DivNative>
	);
};

export default memo(InputLabel);
