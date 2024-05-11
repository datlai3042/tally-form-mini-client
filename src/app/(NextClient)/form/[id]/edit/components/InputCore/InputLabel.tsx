import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import React, { useContext, useEffect, useRef, useState } from "react";

type TProps = {
	indexItem: number;
	labelValue: string;
};

const InputLabel = (props: TProps) => {
	const { indexItem, labelValue } = props;
	const { setFormInitial } = useContext(FormEditContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const [focus, setFocus] = useState<boolean>(false);
	const labelRef = useRef<HTMLInputElement | null>(null);
	const [value, setValue] = useState<string>(labelValue || "");

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

	const onSetLabel = () => {
		setFormInitial((prev) => {
			const newArray = [...prev.form_inputs];
			const itemEdit = newArray[indexItem];
			if (itemEdit.type !== "Date" && itemEdit.type !== "IMAGE") {
				newArray[indexItem] = { ...itemEdit, input_heading: value, input_heading_type: "LABEL" };

				return {
					...prev,
					form_inputs: newArray,
				};
			}
			return prev;
		});
		setFocus(false);
	};

	return (
		<DivNative className=" min-h-full h-max w-[70%] flex gap-[.5rem] ">
			<input
				className="group max-w-full break-words whitespace-pre-wrap h-max border-none outline-none resize-none text-[1.8rem] bg-[#ffffff]"
				autoFocus={true}
				ref={labelRef}
				disabled={modeScreen === "NORMAL" ? false : true}
				onKeyDown={onPressEnter}
				onBlur={onSetLabel}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				suppressContentEditableWarning={true}
				placeholder={`Label`}
				tabIndex={0}
			/>
		</DivNative>
	);
};

export default InputLabel;
