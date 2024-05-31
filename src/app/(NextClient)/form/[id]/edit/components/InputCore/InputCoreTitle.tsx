import React, { useContext, useEffect, useRef, useState } from "react";
import { addInputFirstItem, addInputToSectionTitle, setTitleForm } from "@/app/_lib/utils";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormCore, ReactCustom } from "@/type";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";

export interface InputCoreTitleProps extends React.ComponentProps<"div"> {}

const InputCoreTitle = (props: InputCoreTitleProps) => {
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const divContentRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(formCore.form_title ? formCore.form_title : "");
	const { modeScreen } = useContext(FormModeScreenContext);

	const onPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			const title = divContentRef.current?.textContent || "";
			const formClone = { ...formCore };
			const newFormUpdate = await addInputToSectionTitle(title, formClone);
			const { form } = newFormUpdate.metadata;
			dispatch(onFetchForm({ form }));
		}
	};

	const onChangeTitle = async (e: React.ChangeEvent<HTMLDivElement>) => {
		if (divContentRef.current && divContentRef.current.textContent !== formCore.form_title) {
			const titleCurrent = divContentRef.current.textContent;
			setValue(divContentRef.current.textContent as string);
			const newFormUpdate = await setTitleForm(titleCurrent || "", formCore);
			const { form } = newFormUpdate.metadata;
			dispatch(onFetchForm({ form }));
		}
	};

	useEffect(() => {
		setValue(formCore.form_title);
	}, [formCore.form_title]);

	console.log({ value });

	const styleEffect = {
		onCheckTitle: () => {
			return formCore.form_title ? "opacity-100 text-slate-700" : "opacity-50 text-textHeader";
		},
	};

	return (
		<React.Fragment>
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					style={{
						fontSize: `${
							formCore.form_title_size
								? formCore.form_title_size / 10 + "rem"
								: formCore.form_setting_default.form_title_size_default / 10 + "rem"
						}`,
						color: `${
							formCore.form_title_color
								? formCore.form_title_color
								: formCore.form_setting_default.form_title_color_default
						}`,
						fontStyle: `${
							formCore.form_title_style
								? formCore.form_title_style
								: formCore.form_setting_default.form_title_style_default
						}`,
					}}
					ref={divContentRef}
					className={`${styleEffect.onCheckTitle()} py-[1rem] w-full title-core group min-h-[10rem]  max-w-full xl:max-w-[80rem]  break-all whitespace-pre-wrap flex items-center  h-max border-none outline-none resize-none  text-[4rem]  font-extrabold text-justify hover:cursor-pointer`}
					onClick={() => divContentRef.current?.focus()}
					onKeyDown={onPressEnter}
					contentEditable={true}
					onBlur={onChangeTitle}
					defaultValue={value || ""}
					suppressContentEditableWarning={true}
					data-text={`${formCore.form_title || "Form Title"}`}
					tabIndex={0}
					spellCheck={false}
				>
					{formCore.form_title || ""}
				</DivNativeRef>
			)}

			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value?.toUpperCase()}
					className="max-w-[70rem] text-[2rem] sm:text-[4rem]  leading-relaxed	  font-black   break-words whitespace-pre-wrap text-justify"
				/>
			)}
		</React.Fragment>
	);
};

export default InputCoreTitle;
