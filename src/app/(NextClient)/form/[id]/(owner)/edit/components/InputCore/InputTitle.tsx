import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { RootState } from "@/app/_lib/redux/store";
import { useUpdateTitleInput } from "@/app/hooks/useUpdateTitleInput";
import { FormCore, InputCore } from "@/type";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	inputItem: InputCore.InputForm;
	dataTextTitle?: string;
};

const InputTitle = (props: TProps) => {
	const { inputItem, dataTextTitle } = props;
	const { modeScreen } = useContext(FormModeScreenContext);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const checkModeDisplay = formCore.form_mode_display === "custom" ? true : false;

	const titleRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(inputItem.input_title || "");

	const updateTitleInput = useUpdateTitleInput();

	useEffect(() => {
		titleRef.current?.focus();
	}, []);

	const onSetTitle = async (e: React.ChangeEvent<HTMLDivElement>) => {
		if (titleRef.current && titleRef.current.textContent !== inputItem.input_title) {
			titleRef!.current!.textContent = e.target.textContent;
			const titleCurrent = titleRef.current.textContent || "";
			if (titleCurrent) {
				(await updateTitleInput).mutate({
					input_title_value: titleCurrent,
					input_id: inputItem._id!,
					form: formCore,
				});
			}
			setValue(titleCurrent);
		}
	};

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			// setArrayInput((prev) => prev.concat({ type: "TEXT", placeholder: "" }));
			e.preventDefault();
		}
	};

	let fontSize = inputItem.core.setting.input_size || formCore.form_setting_default.input_size;
	const color = inputItem.core.setting.input_color || formCore.form_setting_default.input_color;
	const fontStyle = inputItem.core.setting.input_style || formCore.form_setting_default.input_style;

	useEffect(() => {}, [formCore, inputItem]);

	return (
		<DivNative
			className={`${
				checkModeDisplay ? "xl:w-[50%]" : "xl:w-[70%]"
			} min-h-[2rem] h-max w-[60%] mb-[1rem] flex items-center gap-[1rem] hover:cursor-pointer`}
		>
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					style={{ fontSize, fontStyle, color }}
					className={`${
						formCore.form_mode_display === "custom" ? "title-input input-core-children" : ""
					}  group max-w-full gap-[.5rem] break-all whitespace-pre-wrap h-max border-none outline-none resize-none text-[2rem] font-medium sm:text-[2.4rem] `}
					ref={titleRef}
					autoFocus={false}
					onKeyDown={onPressEnter}
					onBlur={onSetTitle}
					contentEditable={true}
					defaultValue={value || "False"}
					data-text={`${value || dataTextTitle || "Title"}`}
					suppressContentEditableWarning={true}
					tabIndex={0}
					spellCheck={false}
				>
					{inputItem.input_title}
				</DivNativeRef>
			)}
			{inputItem.core.setting.require && <span className=" text-red-800">*</span>}

			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value}
					className="w-max max-w-[80rem] text-[2rem] sm:text-[2.1rem]  font-medium   break-all whitespace-pre-wrap"
				/>
			)}
		</DivNative>
	);
};

export default memo(InputTitle);
