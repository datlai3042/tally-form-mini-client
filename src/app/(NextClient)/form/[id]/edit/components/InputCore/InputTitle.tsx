import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import React, { useContext, useEffect, useRef, useState } from "react";

type TProps = {
	indexItem: number;
	titleValue: string;
};

const InputTitle = (props: TProps) => {
	const { indexItem, titleValue } = props;
	const { setFormInitial } = useContext(FormEditContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const [focus, setFocus] = useState<boolean>(false);
	const titleRef = useRef<HTMLInputElement | null>(null);
	const [value, setValue] = useState<string>(titleValue || "");

	console.log({ titleValue });

	useEffect(() => {
		titleRef.current?.focus();
		setFocus(true);
	}, []);

	const onSetTitle = () => {
		setFormInitial((prev) => {
			const newArray = [...prev.form_inputs];
			const itemEdit = newArray[indexItem];
			if (itemEdit.type !== "Date" && itemEdit.type !== "IMAGE") {
				newArray[indexItem] = { ...itemEdit, input_heading: value, input_heading_type: "TITLE" };

				return {
					...prev,
					form_inputs: newArray,
				};
			}
			return prev;
		});
		setFocus(false);
	};

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	return (
		<DivNative className=" min-h-full h-[4rem] w-[70%] flex gap-[.5rem] ">
			<input
				className="group max-w-full break-words whitespace-pre-wrap h-max border-none outline-none resize-none text-[2.4rem] bg-[#ffffff]"
				autoFocus={true}
				ref={titleRef}
				onKeyDown={onPressEnter}
				onBlur={onSetTitle}
				defaultValue={value}
				disabled={modeScreen === "NORMAL" ? false : true}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				suppressContentEditableWarning={true}
				placeholder={`Title`}
				tabIndex={0}
			/>
			{/* {!focus && !value && (
					<SpanNative
						className="flex group-focus:hidden opacity-55 font-bold text-textGray text-[2rem]"
						tabIndex={-1}
						textContent="Title"
					/>
				)} */}
		</DivNative>
	);
};

export default InputTitle;
