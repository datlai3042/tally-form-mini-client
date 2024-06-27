import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { addInputToSectionTitle } from "@/app/_lib/utils";
import { FormCore, ReactCustom } from "@/type";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import ButtonDesgin from "../FormDesign/DesignCommon/ButtonDesgin";
import ButtonDesignTitle from "../FormDesign/DesignTitle/ButtonDesignTitle";
import DesignTitleForm from "../FormDesign/DesignCommon/DesignTitleForm";
import FormTitleSub from "../FormDesign/DesignTitle/FormTitleSub";
import { FormText } from "@/app/_constant/formUi.constant";
import InputCore from "./InputCore";
import useSetTitleForm from "@/app/hooks/useSetTitleForm";
import useAddInputSetTitle from "@/app/hooks/useAddInputSetTitle";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

export interface InputCoreTitleProps extends React.ComponentProps<"div"> {}

const InputCoreTitle = (props: InputCoreTitleProps) => {
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const [openDesignTitle, setOpenDesignTitle] = useState<boolean>(false);

	const divContentRef = useRef<HTMLDivElement | null>(null);
	const [value, setValue] = useState<string>(
		formCore.form_title.form_title_value ? formCore.form_title.form_title_value : ""
	);
	const { modeScreen } = useContext(FormModeScreenContext);
	const { theme } = useContext(ThemeContext);

	const useAddInputSetValueTitle = useAddInputSetTitle();
	const setTilteForm = useSetTitleForm();

	const onPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			const title = divContentRef.current?.textContent || "";
			const formClone = { ...formCore };
			useAddInputSetValueTitle.mutate({ form: formClone, title });
			console.log("Thêm Input, type mặc định Text");
		}
	};

	const onChangeTitle = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (divContentRef.current && divContentRef.current.textContent !== formCore.form_title.form_title_value) {
			const titleCurrent = divContentRef.current.textContent;
			setValue(divContentRef.current.textContent as string);
			setTilteForm.mutate({ form_id: formCore._id, value: titleCurrent as string });
		}
	};

	useEffect(() => {
		setValue(formCore.form_title.form_title_value);
	}, [formCore.form_title]);

	const styleEffect = {
		onCheckTitle: () => {
			return formCore.form_title ? "opacity-100 text-slate-700" : "opacity-50 text-textHeader";
		},
	};

	return (
		<div className="flex flex-col gap-[1.4rem]">
			{modeScreen === "NORMAL" && (
				<DivNativeRef
					style={{
						fontSize: `${
							formCore.form_title.form_title_size
								? formCore.form_title.form_title_size / 10 + "rem"
								: formCore.form_setting_default.form_title_size_default / 10 + "rem"
						}`,
						color: `${
							theme === "light" && formCore.form_title.form_title_color
								? formCore.form_title.form_title_color
								: formCore.form_setting_default.form_title_color_default
						}`,
						fontStyle: `${
							formCore.form_title.form_title_style
								? formCore.form_title.form_title_style
								: formCore.form_setting_default.form_title_style_default
						}`,
					}}
					ref={divContentRef}
					className={`${styleEffect.onCheckTitle()} text-text-theme py-[1rem] w-full   title-core group min-h-[8rem]  max-w-full xl:max-w-[90rem]  break-words flex items-center  h-max border-none outline-none     font-extrabold text-justify hover:cursor-pointer`}
					onClick={() => divContentRef.current?.focus()}
					onKeyDown={onPressEnter}
					contentEditable={true}
					onBlur={onChangeTitle}
					defaultValue={value || ""}
					autoFocus={true}
					suppressContentEditableWarning={true}
					data-text={`${formCore.form_title.form_title_value || FormText.title.message}`}
					tabIndex={0}
					spellCheck={false}
				>
					{formCore.form_title.form_title_value || ""}
				</DivNativeRef>
			)}
			{formCore.form_title.form_title_sub.length > 0 && <FormTitleSub />}
			<ButtonDesignTitle className="" onClick={() => setOpenDesignTitle((prev) => !prev)} />
			{openDesignTitle && <DesignTitleForm />}
			{modeScreen === "FULL" && (
				<ParagraphNative
					textContent={value?.toUpperCase()}
					className="max-w-[70rem] text-[2rem] sm:text-[4rem]  leading-relaxed	  font-black   break-words whitespace-pre-wrap text-justify"
				/>
			)}
		</div>
	);
};

export default memo(InputCoreTitle);
