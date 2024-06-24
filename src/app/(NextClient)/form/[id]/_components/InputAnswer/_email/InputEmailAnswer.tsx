"use client";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, InputCore } from "@/type";
import { AtSign } from "lucide-react";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputAnswerWrapper from "../InputAnswerWrapper";
import InputEmailTitle from "./InputEmailTitle";

import styled from "styled-components";
import { REQUIRE_ERROR } from "@/app/_constant/input.constant";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { superEmailValidate } from "../_validate/inputEmail.validate";
import {
	deleteErrorGlobal,
	setDataInputGlobal,
	setErrorGlobal,
	setErrorInputFromGlobal,
	setInputRequireGlobal,
} from "../_utils/formAnswer.uti";
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

	const {
		formAnswer: { inputFormErrors, inputFormData, submitState },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const checkRequire = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id) && inputItem.core.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const checkErrorSubmit = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id)) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const [error, setError] = useState<InputError>(() => {
		return setErrorInputFromGlobal(inputItem._id!, inputFormErrors);
	});

	useEffect(() => {
		setError(setErrorInputFromGlobal(inputItem._id!, inputFormErrors));
	}, [inputFormErrors, inputItem._id]);

	const [inputValue, setInputValue] = useState<string>(
		() => inputFormData.filter((data) => data._id === inputItem._id)[0].value as string
	);
	const [write, setWrite] = useState<boolean>(false);

	const onFocus = () => {
		setWrite(true);
		if (error.error) {
			setError((prev) => ({ ...prev, error: false, type: null }));
		}

		if (inputFormErrors.some((ip) => ip._id === inputItem._id)) {
			deleteErrorGlobal(setFormAnswer, inputItem._id!);
		}
		if (inputItem.core.setting.require) {
			setInputRequireGlobal(setFormAnswer, inputItem._id!, false);
		}
	};

	const onBlur = () => {
		if (write) {
			const { setting } = inputItem.core;
			const checkvalidate = superEmailValidate(inputValue, setting);

			const { _next, message, type } = checkvalidate;

			// Check validate thành công
			if (_next) {
				if (inputItem.core.setting.require) {
					setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
				}

				setDataInputGlobal(setFormAnswer, inputItem._id!, inputValue || "");

				return;
			}

			// Catch lỗi
			setError((prev) => ({ ...prev, error: true, message, type }));
			setDataInputGlobal(setFormAnswer, inputItem._id!, inputValue || "");

			setErrorGlobal(setFormAnswer, inputItem._id!, inputItem.input_title || "", type!, message);
		}
	};

	useEffect(() => {
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
				fontSize: inputItem.core.setting.input_size || formCore.form_setting_default.input_size,
				color: inputItem.core.setting.input_color || formCore.form_setting_default.input_color,
				fontStyle: inputItem.core.setting.input_style || formCore.form_setting_default.input_style,
			};
		},
	};

	const displayError = error.error || checkErrorSubmit;

	useEffect(() => {
		console.log("re-render", { type: inputItem.type, title: inputItem.input_title, error: error, inputValue });
	}, []);

	return (
		<InputAnswerWrapper>
			<DivNative
				id={`_inputid_${inputItem._id}`}
				style={
					{
						"--borderInputAnswerFocus": colorMain,
						// borderColor: "var(--borderInputAnswerFocus) !important",
					} as React.CSSProperties
				}
				className={`${styleEffect.onCheckError.borderWrapper(
					error.error || checkRequire
				)} relative inputAnswer w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]   rounded-lg`}
			>
				<InputEmailTitle formCore={formCore} inputItem={inputItem} />
				<DivNative className="flex flex-col gap-[.3rem]">
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<input
							disabled={submitState === "pending"}
							defaultValue={inputValue}
							className={`${styleEffect.onCheckError.borderInput(
								error.error
							)}  ${styleEffect.styleTitle()} w-[90%] h-full pb-[2rem] border-b-[.1rem] border-gray-300  outline-none text-[1.7rem] placeholder:text-[1.3rem]`}
							onChange={(e) => setInputValue(e.target.value)}
							onFocus={onFocus}
							onBlur={onBlur}
							placeholder={inputItem.core.setting.placeholder}
						/>
						<DivNative className="absolute z-[2] right-[1rem]" title={""}>
							<AtSign className=" text-textMain opacity-50" size={18} />
						</DivNative>
					</DivNative>
				</DivNative>
				{displayError && <InputErrorMessage message={error.message} type={error.type!} />}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputEmailAnswer;
