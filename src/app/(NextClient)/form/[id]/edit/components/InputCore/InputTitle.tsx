import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import React, { memo, useContext, useEffect, useRef, useState } from "react";

type TProps = {
	indexItem: number;
	titleValue: string;
};

const InputTitle = (props: TProps) => {
	const { indexItem, titleValue } = props;
	const { setFormInitial } = useContext(FormEditContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
	console.log({ titleValue });
	const [focus, setFocus] = useState<boolean>(false);
	const titleRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(titleValue || "Title");

	console.log({ value });

	useEffect(() => {
		titleRef.current?.focus();
		setFocus(true);
	}, []);

	const onSetTitle = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (titleRef.current) {
			titleRef!.current!.textContent = e.target.textContent;
			setValue(titleRef.current.textContent as string);

			setFormInitial((prev) => {
				const newArray = [...prev.form_inputs];
				const itemEdit = newArray[indexItem];
				// if (itemEdit.type !== "Date" && itemEdit.type !== "IMAGE") {
				newArray[indexItem] = {
					...itemEdit,
					input_heading: titleRef!.current!.textContent as string,
					input_heading_type: "TITLE",
				};

				return {
					...prev,
					form_inputs: newArray,
				};
				// }
				return prev;
			});
			setFocus(false);
		}
	};

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	return (
		<DivNative className=" min-h-[4rem] h-max w-[70%] flex gap-[.5rem] ">
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					className="title-input group max-w-full break-all whitespace-pre-wrap h-max border-none outline-none resize-none text-[2.8rem] bg-[#ffffff]"
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
					{titleValue}
				</DivNativeRef>
			)}

			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value}
					className="w-max max-w-[80rem] text-[2.8rem]  font-medium   break-all whitespace-pre-wrap"
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
