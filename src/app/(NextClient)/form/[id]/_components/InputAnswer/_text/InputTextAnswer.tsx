"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { InputError } from "../_email/InputEmailAnswer";
import InputTextAnswerTitle from "./InputTextAnswerTitle";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { REQUIRE_ERROR } from "@/app/_constant/input.constant";
import { deleteErrorGlobal, setDataInputGlobal, setErrorGlobal, setInputRequireGlobal } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";

type TProps = {
	inputItem: InputCore.InputText.InputTypeText;
	formCore: FormCore.Form;
};

const InputTextAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const { inputFormErrors, setInputFormErrors, setInputFormData, setInputFormRequire } =
		useContext(FormAnswerContext);

	const [error, setError] = useState<InputError>({ error: false, type: "REQUIRE", message: REQUIRE_ERROR });
	const [write, setWrite] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	//Xem input này có bắt buộc nhập không
	const checkRequire = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id!) && inputItem.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	//Check input này có nằm trong mảng lỗi global khi submit không
	const checkErrorSubmit = useMemo(() => {
		let inputError = inputFormErrors.filter((ip) => ip._id === inputItem._id!)[0];
		return inputError ? inputError : null;
	}, [inputItem, inputFormErrors]);

	const divContentRef = useRef<HTMLDivElement | null>(null);

	//focus -> write = true
	//xóa lỗi local, xóa lỗi global
	//đặt lại cờ require trong global bằng false
	//xét data global
	const onFocus = () => {
		//Xét write ?
		setWrite(true);

		//reset lỗi
		if (error.error) {
			setError((prev) => ({ ...prev, error: false, type: null, message: "" }));
		}

		//delete lỗi trong mảng global error
		if (inputFormErrors.some((ip) => ip._id === inputItem._id!)) {
			deleteErrorGlobal(setInputFormErrors, inputItem._id!);
		}

		//nếu input có yêu cầu require thì đặt bằng false, nào blur validate lại thì đặt bằng true
		if (inputItem.setting.require && setInputFormRequire) {
			setInputRequireGlobal(setInputFormRequire, inputItem._id!, false);
		}
	};

	const onBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
		//check write, tráng trường hợp bắt lỗi ngay khi user chưa nhập
		if (write) {
			//lấy value input để validate
			if (divContentRef.current) {
				const titleCurrent = divContentRef.current.textContent;
				setValue(divContentRef.current.textContent as string);

				const { setting } = inputItem;

				//validate dựa trên setting input
				const superValidate = superTextValidate(titleCurrent || "", setting);
				const { _next, message, type } = superValidate;

				//validate pass
				if (_next) {
					//delete error global
					setError((prev) => ({ ...prev, errorState: false, type: null }));
					//đặt lại cờ require lại thành true
					if (inputItem.setting.require && setInputFormRequire) {
						setInputRequireGlobal(setInputFormRequire, inputItem._id!, true);
					}

					//xét data global
					setDataInputGlobal(setInputFormData, inputItem._id!, titleCurrent || "");
					return;
				}
				//fail validate
				else {
					//đặt lỗi dựa vào check validate return
					setError((prev) => ({ ...prev, error: true, type: type, message }));

					//xét lỗi global
					setErrorGlobal(setInputFormErrors, inputItem._id!, inputItem.input_heading || "", type!, message);
				}
			}
		}
	};

	const styleEffect = {
		onCheckError: {
			borderWrapper: (error: boolean) => {
				if (error) return "border-red-600";
				return " border-zinc-100";
			},

			borderInput: (error: boolean) => {
				if (error) return "border-red-600";
				return "border-gray-300";
			},
		},

		styleTitle: () => {
			return {
				fontSize: inputItem.setting.input_size || formCore.form_setting_default.input_size,
				color: inputItem.setting.input_color || formCore.form_setting_default.input_color,
				fontStyle: inputItem.setting.input_style || formCore.form_setting_default.input_style,
			};
		},
	};

	const displayError = error.error || checkErrorSubmit;

	return (
		<InputAnswerWrapper>
			<DivNative
				id={inputItem._id}
				className={`${styleEffect.onCheckError.borderWrapper(
					error.error || checkRequire
				)} relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.2rem] rounded-lg`}
			>
				<InputTextAnswerTitle inputItem={inputItem} formCore={formCore} />
				<DivNative className="flex flex-col gap-[.3rem]">
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<DivNativeRef
							ref={divContentRef}
							className={`${styleEffect.styleTitle()} heading-answer group w-full min-h-[2rem] pb-[1rem] text-[1.7rem] break-words whitespace-pre-wrap h-max border-b-[.1rem] border-gray-300 rounded-lg outline-none resize-none `}
							onClick={() => divContentRef.current?.focus()}
							onBlur={(e) => onBlur(e)}
							onFocus={onFocus}
							spellCheck={false}
							contentEditable={true}
							onInput={(e) => setValue(e.currentTarget.textContent || "")}
							data-text={`${inputItem.setting?.placeholder || "Typing your text"}`}
							suppressContentEditableWarning={true}
							tabIndex={0}
						></DivNativeRef>
					</DivNative>
				</DivNative>

				{displayError && (
					<InputErrorMessage
						message={checkErrorSubmit?.message || error.message}
						type={checkErrorSubmit?.type || error.type!}
					/>
				)}
				<MinMaxInput value={value} inputItem={inputItem} />
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputTextAnswer;
