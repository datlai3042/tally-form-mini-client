import { InputCore } from "@/type";
import React, { useRef, useState } from "react";
import InputAnswerWrapper from "./InputAnswerWrapper";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputError } from "./InputEmailAnswer";
import { validateEmail } from "@/app/_lib/utils";
import { AtSign } from "lucide-react";
import InputErrorRequire from "./InputError/InputErrorRequire";
import InputErrorInvaild from "./InputError/InputErrorInvaild";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";

type TProps = {
	inputItem: InputCore.InputText.InputTypeText;
};

const InputTextAnswer = (props: TProps) => {
	const { inputItem } = props;

	const [error, setError] = useState<InputError>({ errorState: false, type: "REQUIRE" });
	const [inputValue, setInputValue] = useState<string>("");
	const [write, setWrite] = useState<boolean>(false);
	const [value, setValue] = useState<string>("");

	const divContentRef = useRef<HTMLDivElement | null>(null);

	const onFocus = () => {
		setWrite(true);
		setError((prev) => ({ ...prev, errorState: false, type: null }));
	};

	const onBlur = (e: React.ChangeEvent<HTMLDivElement>) => {
		if (divContentRef.current?.textContent) {
			console.log(divContentRef.current?.textContent.length!, inputItem.setting.minLength);
		}
		if (write && divContentRef.current?.textContent) {
			if (!divContentRef.current.textContent && inputItem.setting?.require) {
				return setError((prev) => ({ ...prev, errorState: true, type: "REQUIRE" }));
			}
			const checkValidate = divContentRef.current?.textContent.length < inputItem.setting.minLength;
			return !checkValidate
				? setError((prev) => ({ ...prev, errorState: false, type: null }))
				: setError((prev) => ({ ...prev, errorState: true, type: "INVAILD" }));
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
				return "border-gray-300";
			},
		},
	};

	return (
		<InputAnswerWrapper>
			<DivNative
				className={`${styleEffect.onCheckError.borderWrapper(
					error.errorState
				)} w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[1.4rem] border-[.1rem]`}
			>
				<p className="text-[2rem] font-medium">{inputItem.input_heading || "Không có tiêu đề"}</p>
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
				{write && error.type === "REQUIRE" && <InputErrorRequire />}
				{write && error.type === "INVAILD" && (
					<InputErrorInvaild messageErorr={inputItem.setting?.input_error || "Dữ liệu khôngsds hợp lệ"} />
				)}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputTextAnswer;
