import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import React, { memo, useContext, useEffect, useRef, useState } from "react";

type TProps = {
	indexItem: number;
	labelValue: string;
};

const InputLabel = (props: TProps) => {
	const { indexItem, labelValue } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const [focus, setFocus] = useState<boolean>(false);
	const labelRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(labelValue);

	console.log({ value });

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

	const onSetLabel = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (labelRef.current) {
			labelRef!.current!.textContent = e.target.textContent;
			setValue(labelRef.current.textContent as string);

			setFormInitial((prev) => {
				const newArray = [...prev.form_inputs];
				const itemEdit = newArray[indexItem];
				if (itemEdit.type !== "Date" && itemEdit.type !== "IMAGE") {
					newArray[indexItem] = {
						...itemEdit,
						input_heading: labelRef!.current!.textContent as string,
						input_heading_type: "TITLE",
					};

					return {
						...prev,
						form_inputs: newArray,
					};
				}
				return prev;
			});
			setFocus(false);
		}
	};

	console.log({ label: labelValue });

	return (
		<DivNative className=" min-h-full h-max w-[70%] flex gap-[.5rem] ">
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					className="group max-w-full break-all whitespace-pre-wrap h-max border-none outline-none resize-none text-[1.8rem] bg-[#ffffff]"
					autoFocus={true}
					ref={labelRef}
					onKeyDown={onPressEnter}
					onBlur={onSetLabel}
					// defaultValue={value}
					// onClick={() => divContentRef.current?.focus()}
					// onKeyDown={onPressEnter}
					contentEditable={true}
					// onBlur={onSetTitle}
					defaultValue={labelValue || ""}
					suppressContentEditableWarning={true}
					data-text={`${labelValue || "Label"}`}
					spellCheck={false}
					tabIndex={0}

					// disabled={modeScreen === "NORMAL" ? false : true}
					// value={value}
					// onChange={(e) => setValue(e.target.value)}
					// suppressContentEditableWarning={true}
					// placeholder={`Title`}
					// tabIndex={0}
				>
					{labelValue}
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
