import Portal from "@/app/(NextClient)/_components/Portal";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { SetStateAction, useCallback, useEffect, useMemo, useRef } from "react";
import InputSettingEmail from "./InputSettingEmail";
import InputSettingText from "./InputSettingText";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import InputSettingOption from "./InputSettingOption";
import InputSettingPhone from "./InputSettingPhone";
import InputSettingVote from "./InputSettingVote";

type TProps = {
	inputItem: InputCore.InputForm;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const renderChildren = (inputItem: InputCore.InputForm, setOpenModel: React.Dispatch<SetStateAction<boolean>>) => {
	switch (inputItem.type) {
		case "EMAIL":
			return <InputSettingText inputItem={inputItem} setOpenModel={setOpenModel} />;
		case "TEXT":
			return <InputSettingText inputItem={inputItem} setOpenModel={setOpenModel} />;

		case "PHONE":
			return <InputSettingPhone inputItem={inputItem} setOpenModel={setOpenModel} />;

		case "VOTE":
			return <InputSettingVote inputItem={inputItem} setOpenModel={setOpenModel} />;

		case "OPTION":
			return <InputSettingOption inputItem={inputItem} setOpenModel={setOpenModel} />;

		case "OPTION_MULTIPLE":
			return <InputSettingOption inputItem={inputItem} setOpenModel={setOpenModel} />;
		default:
			return <InputSettingText inputItem={inputItem} setOpenModel={setOpenModel} />;
	}
};

const InputSettingWrapper = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const modelRef = useRef<HTMLDivElement | null>(null);

	const children = useMemo(() => {
		return renderChildren(inputItem, setOpenModel);
	}, [inputItem, setOpenModel]) as React.ReactNode;

	console.log("click");

	return (
		<ClickOutSide setOpenModel={setOpenModel}>
			<DivNative
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
				}}
				className="absolute top-[140%] right-[-24rem] sm:right-[-4rem]  z-[300] flex justify-center items-center"
			>
				<DivNativeRef className="w-[30rem]  xl:w-[27rem] xl:min-h-[20rem]  h-max p-[2rem] bg-[#ffffff] shadow-xl border-[1px] border-slate-200 flex flex-col  rounded-lg ">
					{children}
				</DivNativeRef>
			</DivNative>
		</ClickOutSide>
	);
};

export default InputSettingWrapper;
