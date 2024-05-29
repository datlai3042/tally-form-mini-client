import Portal from "@/app/(NextClient)/_components/Portal";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import InputSettingEmail from "./InputSettingEmail";
import InputSettingText from "./InputSettingText";

type TProps = {
	inputItem: InputCore.InputForm;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const renderChildren = (inputItem: InputCore.InputForm) => {
	switch (inputItem.type) {
		case "EMAIL":
			return <InputSettingEmail />;
		case "TEXT":
			return <InputSettingText inputItem={inputItem} />;
		default:
			return <InputSettingText inputItem={inputItem} />;
	}
};

const InputSettingWrapper = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const modelRef = useRef<HTMLDivElement | null>(null);

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	const children = useMemo(() => {
		return renderChildren(inputItem);
	}, [inputItem]) as React.ReactNode;

	console.log("click");

	useEffect(() => {
		document.addEventListener("click", globalClick);

		return () => {
			document.removeEventListener("click", globalClick);
		};
	}, [globalClick]);

	return (
		<DivNative className="absolute top-[70%] right-[-24rem] sm:right-[-4rem]  z-[300] flex justify-center items-center">
			<DivNativeRef
				className="w-[30rem]  xl:w-[27rem] xl:min-h-[38rem]  h-max p-[2rem] bg-[#ffffff] shadow-xl border-[1px] border-slate-200 flex flex-col  rounded-lg "
				ref={modelRef}
			>
				{children}
			</DivNativeRef>
		</DivNative>
	);
};

export default InputSettingWrapper;
