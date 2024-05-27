import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React from "react";
import InputSettingRequire from "./SettingCommon/InputSettingRequire";
import InputSettingPlaceholder from "./SettingCommon/InputSettingPlaceholder";
import InputSettingMinLength from "./SettingCommon/InputSettingMinLength";
import InputSettingMaxLength from "./SettingCommon/InputSettingMaxLength";
import InputSettingError from "./SettingCommon/InputSettingError";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";

/*
      require
      placeholder,
      minLength,
      maxLength,
      error
*/

type TProps = {
	indexItem: number;
};

const InputSettingText = (props: TProps) => {
	const { indexItem } = props;

	return (
		<DivNative className="h-max flex flex-col gap-[1.6rem]">
			<InputSettingRequire indexItem={indexItem} />
			<InputSettingPlaceholder indexItem={indexItem} />
			<InputSettingMinLength indexItem={indexItem} />
			<InputSettingMaxLength indexItem={indexItem} />
			<InputSettingError indexItem={indexItem} />
			<ButtonNative textContent="Lưu" />
		</DivNative>
	);
};

export default InputSettingText;
