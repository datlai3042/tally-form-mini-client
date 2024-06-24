"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { InputError } from "../_email/InputEmailAnswer";
import { superTextValidate } from "../_validate/inputText.validate";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { deleteErrorGlobal, setDataInputGlobal, setErrorGlobal, setInputRequireGlobal } from "../_utils/formAnswer.uti";
import MinMaxInput from "../../MinMaxInput";
import { superPhoneValidate } from "../_validate/inputPhone.validate";
import { Phone } from "lucide-react";
import InputVoteAnswerTitle from "./InputVoteAnswerTitle";
import { Rate } from "antd";
import { superVoteValidate } from "../_validate/inputVote.validate";

type TProps = {
	inputItem: InputCore.InputVote.InputTypeVote;
	formCore: FormCore.Form;
};

const InputVoteAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const {
		formAnswer: { inputFormErrors, inputFormData, submitState },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const [error, setError] = useState<InputError>(() => {
		let instanceError: InputError = {} as InputError;
		const temp = inputFormErrors.filter((dataError) => {
			if (dataError._id === inputItem._id) {
				return dataError;
			}
		})[0];
		instanceError = {
			error: !!temp,
			message: temp?.message,
			type: temp?.type,
		};
		return instanceError;
	});
	const [write, setWrite] = useState<boolean>(false);
	const [start, setStart] = useState<string>(
		() => inputFormData.filter((data) => data._id === inputItem._id)[0].value as string
	);

	//Xem input này có bắt buộc nhập không
	const checkRequire = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id!) && inputItem.core.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	//Check input này có nằm trong mảng lỗi global khi submit không
	const checkErrorSubmit = useMemo(() => {
		let inputError = inputFormErrors.filter((ip) => ip._id === inputItem._id!)[0];
		return inputError ? inputError : null;
	}, [inputItem, inputFormErrors]);

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
			deleteErrorGlobal(setFormAnswer, inputItem._id!);
		}

		//nếu input có yêu cầu require thì đặt bằng false, nào blur validate lại thì đặt bằng true
		if (inputItem.core.setting.require) {
			setInputRequireGlobal(setFormAnswer, inputItem._id!, false);
		}
	};

	const onBlur = () => {
		//check write, tráng trường hợp bắt lỗi ngay khi user chưa nhập
		if (write) {
			//lấy value input để validate
			if (start.toString().length > 0) {
				const { setting } = inputItem.core;

				//validate dựa trên setting input
				const superValidate = superVoteValidate(start.toString(), setting);
				const { _next, message, type } = superValidate;

				console.log({ superValidate });

				//validate pass
				if (_next) {
					//delete error global
					setError((prev) => ({ ...prev, errorState: false, type: null }));
					//đặt lại cờ require lại thành true
					if (inputItem.core.setting.require) {
						setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
					}

					//xét data global
					setDataInputGlobal(setFormAnswer, inputItem._id!, start.toString());
					return;
				}
				//fail validate
				else {
					//đặt lỗi dựa vào check validate return
					setError((prev) => ({ ...prev, error: true, type: type, message }));

					//xét lỗi global
					setErrorGlobal(setFormAnswer, inputItem._id!, inputItem.input_title || "", type!, message);
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
				fontSize: inputItem.core.setting.input_size || formCore.form_setting_default.input_size,
				color: inputItem.core.setting.input_color || formCore.form_setting_default.input_color,
				fontStyle: inputItem.core.setting.input_style || formCore.form_setting_default.input_style,
			};
		},
	};

	const displayError = error.error || checkErrorSubmit;

	return (
		<InputAnswerWrapper>
			<DivNative
				id={`_inputid_${inputItem._id}`}
				className={`${styleEffect.onCheckError.borderWrapper(
					error.error || checkRequire
				)} relative w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem]  rounded-lg`}
			>
				<InputVoteAnswerTitle inputItem={inputItem} formCore={formCore} />
				<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
					<DivNative className="flex flex-col gap-[1rem]">
						<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
							<Rate
								onFocus={onFocus}
								onBlur={onBlur}
								allowHalf
								value={+start}
								onChange={(e) => setStart(e.toString())}
							/>
						</DivNative>
						<span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
					</DivNative>
				</DivNative>

				{displayError && (
					<InputErrorMessage
						message={checkErrorSubmit?.message || error.message}
						type={checkErrorSubmit?.type || error.type!}
					/>
				)}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputVoteAnswer;
