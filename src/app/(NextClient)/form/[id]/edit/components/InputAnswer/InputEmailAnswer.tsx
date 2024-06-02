import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { validateEmail } from "@/app/_lib/utils";
import { FormCore, InputCore } from "@/type";
import { AtSign } from "lucide-react";
import React, { SetStateAction, useContext, useMemo, useRef, useState } from "react";
import InputErrorRequire from "./InputError/InputErrorRequire";
import InputErrorInvaild from "./InputError/InputErrorInvaild";
import InputAnswerWrapper from "./InputAnswerWrapper";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";

type TProps = {
	inputItem: InputCore.InputEmail.InputTypeEmail;
	formCore: FormCore.Form;
};

export type InputErrorType = "REQUIRE" | "INVAILD" | null;

export type InputError = {
	errorState: boolean;
	type: InputErrorType;
};

const InputEmailAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const { inputFormData, inputFormErrors, setInputFormData, setInputFormErrors, setInputFormRequire } =
		useContext(FormAnswerContext);

	const checkRequire = useMemo(() => {
		if (inputFormErrors.includes(inputItem._id!) && inputItem.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const [error, setError] = useState<InputError>({ errorState: false, type: "REQUIRE" });
	const [inputValue, setInputValue] = useState<string>("");
	const [write, setWrite] = useState<boolean>(false);

	const onFocus = () => {
		setWrite(true);
		setError((prev) => ({ ...prev, errorState: false, type: null }));

		if (inputFormErrors.includes(inputItem._id as string)) {
			console.log("OK");
			setInputFormErrors((prev) => {
				let newArray = structuredClone(prev);
				newArray = newArray.filter((ip) => {
					if (ip !== inputItem._id) return ip;
					return null;
				});
				console.log({ newArray, inputItem });
				return newArray;
			});
		}
		if (setInputFormRequire) {
			setInputFormRequire((prev) => {
				const newArray = structuredClone(prev);
				const findIndex = newArray.findIndex((ip) => ip._id === inputItem._id);
				if (findIndex !== -1) {
					newArray[findIndex].checkRequire = false;
				}
				return newArray;
			});
		}
	};

	const onBlur = () => {
		if (write) {
			if (!inputValue && inputItem.setting?.require) {
				return setError((prev) => ({ ...prev, errorState: true, type: "REQUIRE" }));
			}
			const checkvalidate = validateEmail(inputValue);

			if (checkvalidate) {
				setError((prev) => ({ ...prev, errorState: false, type: null }));
				if (setInputFormRequire) {
					setInputFormRequire((prev) => {
						const newArray = structuredClone(prev);
						const findIndex = newArray.findIndex((ip) => ip._id === inputItem._id);
						if (findIndex !== -1) {
							newArray[findIndex].checkRequire = true;
						}

						return newArray;
					});
				}

				setInputFormData((prev) => {
					const newArray = structuredClone(prev);
					const findIndex = newArray.findIndex((ip) => ip._id === inputItem._id);
					if (findIndex !== -1) {
						newArray[findIndex].value = inputValue;
						console.log({ newArray: newArray[findIndex] });
					}
					return newArray;
				});

				return;
			}

			const inputCurrentMode = structuredClone(inputFormData);
			const findIndex = inputCurrentMode.findIndex((ip) => ip._id === inputItem._id);
			if (findIndex !== -1) {
				if (inputValue.length >= 1 && inputCurrentMode[findIndex].mode === "Optional") {
					return setError((prev) => ({ ...prev, errorState: true, type: "INVAILD" }));
				}

				if (inputCurrentMode[findIndex].mode === "Require" && !checkvalidate) {
					return setError((prev) => ({ ...prev, errorState: true, type: "INVAILD" }));
				}
				if (inputCurrentMode[findIndex].mode === "Require" && checkvalidate) {
					return setError((prev) => ({ ...prev, errorState: true, type: "REQUIRE" }));
				}
			}
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

	return (
		<InputAnswerWrapper>
			<DivNative
				className={`${styleEffect.onCheckError.borderWrapper(
					error.errorState || checkRequire
				)} w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.2rem]  rounded-lg`}
			>
				<p style={styleEffect.styleTitle()} className="flex items-center gap-[.6rem] text-[2rem] font-medium">
					{inputItem.input_heading || "Không có tiêu đề"}
					{inputItem.setting.require && <span className="text-red-800">*</span>}
				</p>
				<DivNative className="flex flex-col gap-[.3rem]">
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<input
							className={`${styleEffect.onCheckError.borderInput(
								error.errorState
							)} w-[90%] h-full pb-[.8rem] border-b-[.3rem]  outline-none text-[1.6rem] placeholder:text-[1.3rem]`}
							onChange={(e) => setInputValue(e.target.value)}
							onFocus={onFocus}
							onBlur={onBlur}
							placeholder="Let type your Email"
						/>
						<DivNative className="absolute z-[2] right-[1rem]" title={""}>
							<AtSign className=" text-textMain opacity-50" size={18} />
						</DivNative>
					</DivNative>
				</DivNative>

				{(write || error.errorState || checkRequire) && error.type === "REQUIRE" && <InputErrorRequire />}
				{(write || error.errorState || checkRequire) && error.type === "INVAILD" && (
					<InputErrorInvaild messageErorr={inputItem.setting?.input_error || "Dữ liệu khôngsds hợp lệ"} />
				)}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputEmailAnswer;
