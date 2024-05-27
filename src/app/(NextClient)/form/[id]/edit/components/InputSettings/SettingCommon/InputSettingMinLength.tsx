import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import React, { useContext, useRef, useState } from "react";

type TProps = {
	indexItem: number;
};

const InputSettingMinLength = (props: TProps) => {
	const { indexItem } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const [minLength, setMinLength] = useState<number>(formInitial.form_inputs[indexItem].setting?.minLength || 8);

	const minLengthRef = useRef<HTMLInputElement | null>(null);

	const labelClick = () => {
		if (minLengthRef.current) {
			minLengthRef.current.focus();
		}
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">
			<SpanNative textContent={`Min`} onClick={labelClick} className="hover:cursor-pointer" />
			<input
				ref={minLengthRef}
				type="number"
				value={minLength}
				className="w-[40%] border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
			/>
		</DivNative>
	);
};

export default InputSettingMinLength;
