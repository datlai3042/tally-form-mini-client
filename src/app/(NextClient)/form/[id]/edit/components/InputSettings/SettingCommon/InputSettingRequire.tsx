import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext, useState } from "react";

type TProps = {
	indexItem: number;
};

const InputSettingRequire = (props: TProps) => {
	const { indexItem } = props;
	const { formInitial, setFormInitial } = useContext(FormEditContext);
	const [require, setRequire] = useState<boolean>(formInitial.form_inputs[indexItem].setting?.require || false);

	const styleEffect = {
		onActiveRequireWrapper: () => {
			if (require) return "bg-blue-400";
			return "bg-slate-300";
		},
		onActiveRequireCircle: () => {
			if (require) return "right-0";
			return " left-0";
		},
	};

	return (
		<DivNative className="flex items-center justify-between gap-[.5rem]">
			<label htmlFor="">Require {JSON.stringify(require)}</label>
			<DivNative
				className={`${styleEffect.onActiveRequireWrapper()} relative  w-[5rem] h-[2.4rem] transition-all duration-700 rounded-3xl border-[1px] border-slate-300 hover:cursor-pointer`}
				onClick={() => setRequire((prev) => !prev)}
			>
				<DivNative
					className={`${styleEffect.onActiveRequireCircle()} absolute bg-[#ffffff] w-[2.4rem]  transition-all duration-10000 aspect-square rounded-full `}
				></DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputSettingRequire;
