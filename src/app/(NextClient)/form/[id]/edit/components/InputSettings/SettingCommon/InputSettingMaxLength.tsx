import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import React, { useContext, useRef, useState } from "react";

type TProps = {
	indexItem: number;
};

const InputSettingMaxLength = (props: TProps) => {
	const { indexItem } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const [maxLength, setMaxLength] = useState<number>(formInitial.form_inputs[indexItem].setting?.maxLength || 100);

	const maxLengthRef = useRef<HTMLInputElement | null>(null);

	const labelClick = () => {
		if (maxLengthRef.current) {
			maxLengthRef.current.focus();
		}
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">
			<SpanNative textContent={`Max`} onClick={labelClick} className="hover:cursor-pointer" />
			<input
				ref={maxLengthRef}
				onChange={(e) => setMaxLength(+e.target.value)}
				type="number"
				value={maxLength}
				className="w-[40%] border-[1px] border-slate-400 p-[.7rem] rounded-lg  outline-2 outline-blue-400"
			/>
		</DivNative>
	);
};

export default InputSettingMaxLength;
