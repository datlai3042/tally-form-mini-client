"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { validateEmail } from "@/app/_lib/utils";
import { FormCore, InputCore } from "@/type";
import { AtSign } from "lucide-react";
import React, { SetStateAction, useContext, useMemo, useRef, useState } from "react";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputAnswerWrapper from "../InputAnswerWrapper";
import InputErrorInvaild from "../InputError/InputErrorInvaild";
import InputErrorRequire from "../InputError/InputErrorRequire";
import InputEmailTitle from "./InputEmailTitle";

import styled from "styled-components";
import { REQUIRE_ERROR } from "@/app/_constant/input.constant";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { superEmailValidate } from "../_validate/inputEmail.validate";
import { deleteErrorGlobal, setDataInputGlobal, setErrorGlobal, setInputRequireGlobal } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";

type TProps = {
	inputItem: InputCore.InputEmail.InputTypeEmail;
	formCore: FormCore.Form;
};

export type InputErrorType = "REQUIRE" | "INVAILD" | null;

export type InputError = {
	error: boolean;
	type: InputCore.Commom.ErrorText | null;
	message: string;
};

const InputEmailAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const { inputFormErrors, setInputFormData, setInputFormErrors, setInputFormRequire } =
		useContext(FormAnswerContext);

	const checkRequire = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id) && inputItem.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const checkErrorSubmit = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id)) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const [error, setError] = useState<InputError>({ error: false, type: "REQUIRE", message: REQUIRE_ERROR });
	const [inputValue, setInputValue] = useState<string>("");
	const [write, setWrite] = useState<boolean>(false);

	const onFocus = () => {
		setWrite(true);
		if (error.error) {
			setError((prev) => ({ ...prev, error: false, type: null }));
		}

		if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
			deleteErrorGlobal(setInputFormErrors, inputItem._id!);
		}
		if (inputItem.setting.require && setInputFormRequire) {
			setInputRequireGlobal(setInputFormRequire, inputItem._id!, false);
		}
	};

	const onBlur = () => {
		if (write) {
			// if (!inputValue && inputItem.setting?.require) {
			// 	return setError((prev) => ({ ...prev, error: true, type: "REQUIRE", message: REQUIRE_ERROR }));
			// }

			const { setting } = inputItem;
			const checkvalidate = superEmailValidate(inputValue, setting);

			const { _next, message, type } = checkvalidate;

			// Check validate thành công
			if (_next) {
				if (inputItem.setting.require && setInputFormRequire) {
					setInputRequireGlobal(setInputFormRequire, inputItem._id!, true);
				}

				setDataInputGlobal(setInputFormData, inputItem._id!, inputValue || "");

				return;
			}

			// Catch lỗi
			setError((prev) => ({ ...prev, error: true, message, type }));
			setErrorGlobal(setInputFormErrors, inputItem._id!, inputItem.input_heading || "", type!, message);
		}
	};

	const styleEffect = {
		onCheckError: {
			borderWrapper: (error: boolean) => {
				if (error) return "border-red-600";
				return " border-zinc-200";
			},

			borderInput: (error: boolean) => {
				if (error) return "border-red-600";
				return "border-gray-100";
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
				style={
					{
						"--borderInputAnswerFocus": colorMain,
						// borderColor: "var(--borderInputAnswerFocus) !important",
					} as React.CSSProperties
				}
				className={`${styleEffect.onCheckError.borderWrapper(
					error.error || checkRequire
				)} relative inputAnswer w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.2rem]  rounded-lg`}
			>
				<InputEmailTitle formCore={formCore} inputItem={inputItem} />
				<DivNative className="flex flex-col gap-[.3rem]">
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<input
							className={`${styleEffect.onCheckError.borderInput(
								error.error
							)}  ${styleEffect.styleTitle()} w-[90%] h-full pb-[.8rem] border-b-[.3rem]  outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
							onChange={(e) => setInputValue(e.target.value)}
							onFocus={onFocus}
							onBlur={onBlur}
							placeholder={inputItem.setting.placeholder}
						/>
						<DivNative className="absolute z-[2] right-[1rem]" title={""}>
							<AtSign className=" text-textMain opacity-50" size={18} />
						</DivNative>
					</DivNative>
				</DivNative>
				{displayError && <InputErrorMessage message={error.message} type={error.type!} />}
				<MinMaxInput value={inputValue} inputItem={inputItem} />
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputEmailAnswer;
