import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { setTitleInput } from "@/app/_lib/utils";
import { InputCore } from "@/type";
import React, { memo, useContext, useEffect, useRef, useState } from "react";

type TProps = {
	inputItem: InputCore.InputForm;
};

const InputTitle = (props: TProps) => {
	const { inputItem } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const { modeScreen } = useContext(FormModeScreenContext);
	const titleRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(inputItem.input_heading || "Title");

	console.log({ value });

	useEffect(() => {
		titleRef.current?.focus();
	}, []);

	const onSetTitle = async (e: React.ChangeEvent<HTMLDivElement>) => {
		if (titleRef.current) {
			titleRef!.current!.textContent = e.target.textContent;
			const titleCurrent = titleRef.current.textContent || "";
			const newFormUpdate = await setTitleInput(titleCurrent, inputItem, formInitial);
			const { form } = newFormUpdate.metadata;
			setFormInitial(form);
			setValue(titleCurrent);
		}
	};

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	return (
		<DivNative className=" min-h-[1rem] h-max w-[90%] flex gap-[.5rem] ">
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					className="title-input group max-w-full break-all whitespace-pre-wrap h-max border-none outline-none resize-none text-[2rem] font-medium sm:text-[2.4rem] bg-[#ffffff]"
					autoFocus={true}
					ref={titleRef}
					onKeyDown={onPressEnter}
					onBlur={onSetTitle}
					contentEditable={true}
					defaultValue={value || "False"}
					data-text={`${value || "Title"}`}
					suppressContentEditableWarning={true}
					tabIndex={0}
					spellCheck={false}
				>
					{inputItem.input_heading}
				</DivNativeRef>
			)}

			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value}
					className="w-max max-w-[80rem] text-[2rem] sm:text-[2.1rem]  font-medium   break-all whitespace-pre-wrap"
				/>
			)}
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

export default memo(InputTitle);
