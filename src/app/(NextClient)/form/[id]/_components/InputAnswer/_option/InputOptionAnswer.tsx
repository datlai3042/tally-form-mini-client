import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "../InputAnswerWrapper";
import { FormCore, InputCore } from "@/type";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import InputOptionTitle from "./InputOptionTitle";
import { InputError } from "../_email/InputEmailAnswer";
import {
	deleteErrorGlobal,
	setDataInputGlobal,
	setErrorInputFromGlobal,
	setInputRequireGlobal,
} from "../_utils/formAnswer.uti";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import InputErrorMessage from "../InputError/InputErrorMessage";
import { AtSign } from "lucide-react";

type TProps = {
	inputItem: InputCore.InputOption.InputTypeOption;
	formCore: FormCore.Form;
};

const InputOptionAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const {
		formAnswer: { inputFormErrors, inputFormData, submitState },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const [error, setError] = useState<InputError>(() => {
		return setErrorInputFromGlobal(inputItem._id!, inputFormErrors);
	});

	useEffect(() => {
		setError(setErrorInputFromGlobal(inputItem._id!, inputFormErrors));
	}, [inputFormErrors, inputItem._id]);

	const [choose, setChoose] = useState<{ input_id: string; input_value: string | string[] }>(() => {
		const valueGlobal = inputFormData.filter((data) => data._id === inputItem._id)[0];
		return {
			input_id: valueGlobal._id || "",
			input_value: valueGlobal.value || "",
		};
	});

	const checkRequire = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id) && inputItem.core.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const checkErrorSubmit = useMemo(() => {
		if (inputFormErrors.some((ip) => ip._id === inputItem._id)) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

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
		console.log("re-render", { type: inputItem.type, title: inputItem.input_title, error: error, choose });
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
				)} relative inputAnswer w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.2rem]  rounded-lg`}
			>
				<InputOptionTitle formCore={formCore} inputItem={inputItem} />
				<DivNative className="flex flex-col gap-[.3rem] text-[1.4rem]">
					<DivNative className={` relative min-h-[5rem] h-max flex flex-col gap-[1.6rem]  `}>
						{
							inputItem.core.options.map((op) => {
								if (!op.option_value) return null;
								return (
									<div
										key={op.option_id}
										className="p-[1rem] flex items-center gap-[2rem] rounded-lg hover:cursor-pointer hover:bg-formCoreBgColor"
										onClick={() => {
											if (error.error) {
												setError({ error: false, message: "", type: null });
												deleteErrorGlobal(setFormAnswer, inputItem._id!);
											}
											if (inputItem.core.setting.require) {
												setInputRequireGlobal(setFormAnswer, inputItem._id!, true);
											}
											if (op.option_value === choose.input_value) {
												setChoose({ input_id: op.option_id, input_value: "" });
												setDataInputGlobal(
													setFormAnswer,
													inputItem._id!,
													op.option_value || ""
												);
												return;
											}
											setChoose({ input_id: op.option_id, input_value: op.option_value });
											setDataInputGlobal(setFormAnswer, inputItem._id!, op.option_value);
										}}
									>
										<input
											type="radio"
											name={inputItem._id}
											value={op.option_value}
											checked={choose.input_value === op.option_value}
											className="hover:cursor-pointer"
											onChange={() => {}}
										/>
										{op.option_value}
									</div>
								);
							}) as unknown as React.ReactNode[]
						}
					</DivNative>
				</DivNative>
				<p className="text-[1.4rem]">
					Đã chọn: <span className="ml-[.4rem] border-b-[.2rem] border-gray-400">{choose.input_value}</span>
				</p>
				{displayError && <InputErrorMessage message={error.message} type={error.type!} />}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputOptionAnswer;
