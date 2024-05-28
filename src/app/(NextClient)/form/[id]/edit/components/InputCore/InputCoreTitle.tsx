import React, { useContext, useEffect, useRef, useState } from "react";
import { addInputFirstItem } from "@/app/_lib/utils";
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

	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setFormInitial((prev) => {
				return { ...prev, form_title: divContentRef.current?.textContent || "" };
			});
			addInputFirstItem(setFormInitial);
		}
	};

	const onChangeTitle = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (divContentRef.current) {
			divContentRef!.current!.textContent = e.target.textContent;
			setValue(divContentRef.current.textContent as string);
			setFormInitial((prev) => {
				return { ...prev, form_title: divContentRef.current?.textContent || "" };
			});
		}
	};

	useEffect(() => {
		setFormInitial((prev) => {
			return { ...prev, form_title: value };
		});
	}, [value, setFormInitial]);

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
					className={`${styleEffect.onCheckTitle()} title-core group min-h-[8rem] w-max max-w-full xl:max-w-[80rem]  break-all whitespace-pre-wrap flex items-center  h-max border-none outline-none resize-none  text-[4rem]  font-extrabold  `}
					onClick={() => divContentRef.current?.focus()}
					onKeyDown={onPressEnter}
					contentEditable={true}
					onBlur={onChangeTitle}
					defaultValue={value || ""}
					suppressContentEditableWarning={true}
					data-text={`${formInitial.form_title || "Form Title"}`}
					tabIndex={0}
				>
					{formInitial.form_title || ""}
				</DivNativeRef>
			)}

			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value?.toUpperCase()}
					className="w-max max-w-[80rem] text-[6rem]  font-black   break-all whitespace-pre-wrap"
				/>
			)}
		</React.Fragment>
	);
};

export default InputCoreTitle;
