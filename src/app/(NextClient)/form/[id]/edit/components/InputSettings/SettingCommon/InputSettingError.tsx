import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { InputCore } from "@/type";
import React, { useContext, useRef, useState } from "react";

type TProps = {
	indexItem: number;
};

const InputSettingError = (props: TProps) => {
	const { indexItem } = props;

	const { formInitial } = useContext(FormEditContext);

	const [error, setError] = useState<string>(
		formInitial.form_inputs[indexItem].setting?.input_error || "Nhập placehoder của bạn"
	);

	const errorRef = useRef<HTMLDivElement | null>(null);

	const labelClick = () => {
		if (errorRef.current) {
			errorRef.current.focus();
		}
	};

	return (
		<DivNative className="h-max flex flex-col  justify-between gap-[.8rem]">
			<SpanNative textContent={`Error`} onClick={labelClick} className="hover:cursor-pointer" />
			<DivNativeRef
				ref={errorRef}
				contentEditable={true}
				className="border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
				data-text={`${error || "Nhập cấu hình lỗi cho Input"}`}
			></DivNativeRef>
		</DivNative>
	);
};

export default InputSettingError;
