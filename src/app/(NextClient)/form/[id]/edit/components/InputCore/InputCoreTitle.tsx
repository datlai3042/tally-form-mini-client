import React, { useContext, useEffect, useRef, useState } from "react";
import { addInputFirstItem, addInputToSectionTitle, setTitleForm } from "@/app/_lib/utils";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { ReactCustom } from "@/type";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";

export interface InputCoreTitleProps extends React.ComponentProps<"div"> {
	setFirstEnter: ReactCustom.SetStateBoolean;
}

const InputCoreTitle = (props: InputCoreTitleProps) => {
	const { setFirstEnter } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const divContentRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(formInitial.form_title ? formInitial.form_title : "");
	const { modeScreen } = useContext(FormModeScreenContext);

	const onPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addInputFirstItem(setFormInitial);
			const title = divContentRef.current?.innerHTML || "";
			const newFormUpdate = await addInputToSectionTitle(title, formInitial);
			const { form } = newFormUpdate.metadata;
			setFormInitial(form);
		}
	};

	const onChangeTitle = async (e: React.ChangeEvent<HTMLDivElement>) => {
		if (divContentRef.current) {
			divContentRef!.current!.textContent = e.target.textContent;
			const titleCurrent = divContentRef.current.textContent;
			setValue(divContentRef.current.textContent as string);
			const newFormUpdate = await setTitleForm(titleCurrent || "", formInitial);
			const { form } = newFormUpdate.metadata;
			setFormInitial(form);
		}
	};

	useEffect(() => {
		setFormInitial((prev) => {
			return { ...prev, form_title: value };
		});
	}, [value, setFormInitial]);

	useEffect(() => {
		setValue(formInitial.form_title);
	}, [formInitial.form_title]);

	console.log({ value });

	const styleEffect = {
		onCheckTitle: () => {
			return formInitial.form_title ? "opacity-100 text-slate-700" : "opacity-50 text-textHeader";
		},
	};

	return (
		<React.Fragment>
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					ref={divContentRef}
					className={`${styleEffect.onCheckTitle()} py-[1rem] w-full title-core group min-h-[10rem]  max-w-full xl:max-w-[80rem]  break-words whitespace-pre-wrap flex items-center  h-max border-none outline-none resize-none  text-[4rem]  font-extrabold text-justify hover:cursor-pointer`}
					onClick={() => divContentRef.current?.focus()}
					onKeyDown={onPressEnter}
					contentEditable={true}
					onBlur={onChangeTitle}
					defaultValue={value || ""}
					suppressContentEditableWarning={true}
					data-text={`${formInitial.form_title || "Form Title"}`}
					tabIndex={0}
					spellCheck={false}
				>
					{formInitial.form_title || ""}
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
