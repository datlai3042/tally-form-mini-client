import React, { SetStateAction, useContext, useEffect, useRef, useState } from "react";
import InputCore from "./InputCore";
import { AtSign } from "lucide-react";
import { validateEmail } from "@/app/_lib/utils";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { FormCore, InputCore as TInputCore } from "@/type";
import { inputSettingText } from "@/app/_constant/input.constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
	inputItem: TInputCore.InputEmail.InputTypeEmail;
};

const InputCoreEmail = (props: TProps) => {
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { inputItem } = props;
	const inputRef = useRef<HTMLInputElement | null>(null);

	const [focus, setFocus] = useState<boolean>(false);
	const [inputValue, setInputValue] = useState<string>("");
	const [error, setError] = useState<boolean>(false);
	const { modeScreen } = useContext(FormModeScreenContext);

	const label = inputItem.input_heading && inputItem.input_heading_type === "LABEL" ? true : false;
	const title = inputItem.input_heading && inputItem.input_heading_type === "TITLE" ? true : false;
	const input_heading = inputItem.input_heading || "";
	const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			if (modeScreen === "FULL") {
				const checkvalidate = validateEmail(inputValue);
				return checkvalidate ? setError(false) : setError(true);
			}
		}
	};

	const onBlur = () => {
		if (!inputValue) return;
		const checkvalidate = validateEmail(inputValue);
		return checkvalidate ? setError(false) : setError(true);
	};

	useEffect(() => {
		console.log({ inputValue });
	}, [inputValue]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.value = "";
			setError(false);
		}
	}, [modeScreen]);

	const InputEmail = (
		<DivNative className="flex flex-col gap-[.3rem]">
			<DivNative className={`${"w-full "} relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
				<input
					className="w-full h-full p-[1rem] rounded-lg   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent"
					ref={inputRef}
					onKeyDown={onPressEnter}
					onChange={(e) => setInputValue(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={onBlur}
					placeholder={inputItem.setting.placeholder}
				/>
				<AtSign className="absolute z-[2] right-[1rem] text-textMain opacity-50" size={18} />
			</DivNative>
			{error && (
				<SpanNative
					className="flex group-focus:hidden opacity-55"
					tabIndex={-1}
					textContent="
					Email khong dung dinh dang"
				/>
			)}
		</DivNative>
	);

	return (
		<InputCore
			inputItem={inputItem}
			InputComponent={InputEmail}
			labelValue={label}
			titleValue={title}
			inputHeading={input_heading}
			type="EMAIL"
		/>
	);
};

export default InputCoreEmail;
