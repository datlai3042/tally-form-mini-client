import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { setTitleInput } from "@/app/_lib/utils";
import { FormCore, InputCore } from "@/type";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	inputItem: InputCore.InputForm;
};

const InputTitle = (props: TProps) => {
	const { inputItem } = props;
	const { modeScreen } = useContext(FormModeScreenContext);
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const titleRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(inputItem.input_heading || "Title");

	console.log({ value });

	useEffect(() => {
		titleRef.current?.focus();
	}, []);

	const onSetTitle = async (e: React.ChangeEvent<HTMLDivElement>) => {
		if (titleRef.current && titleRef.current.textContent !== inputItem.input_heading) {
			titleRef!.current!.textContent = e.target.textContent;
			const titleCurrent = titleRef.current.textContent || "";
			const newFormUpdate = await setTitleInput(titleCurrent, inputItem, formCore);
			const { form } = newFormUpdate.metadata;
			dispatch(onFetchForm({ form }));

			setValue(titleCurrent);
		}
	};

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	let fontSize = inputItem.setting.input_size || formCore.form_setting_default.input_size;
	const color = inputItem.setting.input_color || formCore.form_setting_default.input_color;
	const fontStyle = inputItem.setting.input_style || formCore.form_setting_default.input_style;

	useEffect(() => {}, [formCore, inputItem]);

	return (
		<DivNative className=" min-h-[1rem] h-max w-[90%] flex items-center gap-[1rem] ">
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					style={{ fontSize, fontStyle, color }}
					className="title-input group max-w-full gap-[.5rem] break-all whitespace-pre-wrap h-max border-none outline-none resize-none text-[2rem] font-medium sm:text-[2.4rem] bg-[#ffffff]"
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
			{inputItem.setting.require && <span className=" text-red-800">*</span>}

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
