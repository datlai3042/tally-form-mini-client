import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, useContext, useMemo, useRef, useState } from "react";
import InputAnswerWrapper from "./InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputError } from "./InputEmailAnswer";
import { validateEmail } from "@/app/_lib/utils";
import { AtSign } from "lucide-react";
import InputErrorRequire from "./InputError/InputErrorRequire";
import InputErrorInvaild from "./InputError/InputErrorInvaild";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";

type TProps = {
	inputItem: InputCore.InputText.InputTypeText;
	formCore: FormCore.Form;
};

const InputTextAnswer = (props: TProps) => {
	const { inputItem, formCore } = props;

	const { inputFormData, inputFormErrors, setInputFormErrors, setInputFormData, setInputFormRequire } =
		useContext(FormAnswerContext);

	const [error, setError] = useState<InputError>({ errorState: false, type: "REQUIRE" });
	const [inputValue, setInputValue] = useState<string>("");
	const [write, setWrite] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	const checkRequire = useMemo(() => {
		if (inputFormErrors.includes(inputItem._id!) && inputItem.setting.require) return true;
		return false;
	}, [inputItem, inputFormErrors]);

	const divContentRef = useRef<HTMLDivElement | null>(null);

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

	console.log({ value, inputItem, write, inputFormErrors });

	const onBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (write) {
			if (!value && inputItem.setting.require) {
				return setError((prev) => ({ ...prev, errorState: true, type: "REQUIRE" }));
			}

			if (divContentRef.current && divContentRef.current.textContent) {
				const titleCurrent = divContentRef.current.textContent;
				setValue(divContentRef.current.textContent as string);
				const checkValidate = divContentRef.current?.textContent.length < inputItem.setting.minLength;
				if (!checkValidate) {
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
							newArray[findIndex].value = titleCurrent;
						}
						return newArray;
					});
				} else setError((prev) => ({ ...prev, errorState: true, type: "INVAILD" }));
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

	return (
		<InputAnswerWrapper>
			<DivNative
				className={`${styleEffect.onCheckError.borderWrapper(
					error.errorState || checkRequire
				)} w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[2rem] border-[.1rem]`}
			>
				<p style={styleEffect.styleTitle()} className="flex items-center gap-[.6rem] text-[2rem] font-medium">
					{inputItem.input_heading || "Không có tiêu đề"}
					{inputItem.setting.require && <span className="text-red-800">*</span>}
				</p>
				<DivNative className="flex flex-col gap-[.3rem]">
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<DivNativeRef
							ref={divContentRef}
							className="group w-full min-h-[2rem] pb-[1rem] break-words whitespace-pre-wrap h-max border-b-[.1rem] border-gray-300 rounded-lg outline-none resize-none "
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
				{write || (checkRequire && error.type === "REQUIRE" && <InputErrorRequire />)}
				{write ||
					(checkRequire && error.type === "INVAILD" && (
						<InputErrorInvaild messageErorr={inputItem.setting?.input_error || "Dữ liệu khôngsds hợp lệ"} />
					))}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputTextAnswer;
