import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { validateEmail } from "@/app/_lib/utils";
import { InputCore } from "@/type";
import { AtSign } from "lucide-react";
import React, { useRef, useState } from "react";
import InputErrorRequire from "./InputError/InputErrorRequire";
import InputErrorInvaild from "./InputError/InputErrorInvaild";
import InputAnswerWrapper from "./InputAnswerWrapper";

type TProps = {
	inputItem: InputCore.InputEmail.InputTypeEmail;
};

export type InputErrorType = "REQUIRE" | "INVAILD" | null;

export type InputError = {
	errorState: boolean;
	type: InputErrorType;
};

const InputEmailAnswer = (props: TProps) => {
	const { inputItem } = props;

	const [error, setError] = useState<InputError>({ errorState: false, type: "REQUIRE" });
	const [inputValue, setInputValue] = useState<string>("");
	const [write, setWrite] = useState<boolean>(false);

	const onFocus = () => {
		setWrite(true);
		setError((prev) => ({ ...prev, errorState: false, type: null }));
	};

	const onBlur = () => {
		if (write) {
			if (!inputValue && inputItem.setting?.require) {
				return setError((prev) => ({ ...prev, errorState: true, type: "REQUIRE" }));
			}
			const checkvalidate = validateEmail(inputValue);
			return checkvalidate
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
				)} w-full min-h-full h-max p-[2rem_3rem] duration-300 transition-all flex flex-col justify-center gap-[1.4rem] border-[.2rem]  rounded-lg`}
			>
				<p className="text-[2rem] font-medium">{inputItem.input_heading || "Không có tiêu đề"}</p>
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
				{write && error.type === "REQUIRE" && <InputErrorRequire />}
				{write && error.type === "INVAILD" && (
					<InputErrorInvaild messageErorr={inputItem.setting?.input_error || "Dữ liệu khôngsds hợp lệ"} />
				)}
			</DivNative>
		</InputAnswerWrapper>
	);
};

export default InputEmailAnswer;
