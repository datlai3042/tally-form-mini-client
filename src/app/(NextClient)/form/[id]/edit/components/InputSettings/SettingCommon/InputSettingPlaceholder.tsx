import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useRef, useState } from "react";

type TProps = {
	indexItem: number;
};

const InputSettingPlaceholder = (props: TProps) => {
	const { indexItem } = props;

	const { formInitial } = useContext(FormEditContext);

	const [placeholder, setPlaceholder] = useState<string>(
		formInitial.form_inputs[indexItem].setting?.placeholder || "Nhập placehoder của bạn"
	);

	const placeholderRef = useRef<HTMLDivElement | null>(null);

	const labelClick = () => {
		if (placeholderRef.current) {
			placeholderRef.current.focus();
		}
	};

	return (
		<DivNative className="h-max flex flex-col  justify-between gap-[.8rem]">
			<SpanNative textContent={`Placeholder`} onClick={labelClick} className="hover:cursor-pointer" />
			<DivNativeRef
				onClick={labelClick}
				ref={placeholderRef}
				contentEditable={true}
				className="border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
				data-text={`${
					(formInitial.form_inputs[indexItem] as InputCore.InputText.InputTypeText)?.setting?.placeholder ||
					"Nhập placeholder của bạn"
				}`}
			></DivNativeRef>
		</DivNative>
	);
};

export default InputSettingPlaceholder;
