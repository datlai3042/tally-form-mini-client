import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputSettingRequire from "./SettingCommon/InputSettingRequire";
import InputSettingError from "./SettingCommon/InputSettingError";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import useUpdateInputSetting from "@/app/hooks/useUpdateInputSetting";

type TProps = {
	inputItem: InputCore.InputForm;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const InputSettingPhone = (props: TProps) => {
	const { inputItem, setOpenModel } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	const [inputItemString, setInputItemString] = useState<InputCore.Commom.InputCommon>(
		inputItem as InputCore.Commom.InputCommon
	);

	const { updateTypeInputMutation } = useUpdateInputSetting<InputCore.Setting.InputSettingCommon>();

	const handleSaveSetting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();

		const newForm = structuredClone(formCore);
		newForm.form_inputs = newForm.form_inputs.filter((ip) => {
			if (ip._id !== inputItem._id) return ip;
			(ip.core.setting as unknown as InputCore.Commom.InputCommon) = inputItemString;
			return ip;
		});

		updateTypeInputMutation.mutate({
			form: newForm,
			input_id: inputItem._id!,
			input_id_setting: inputItemString.core.setting,
		});
	};

	useEffect(() => {
		if (updateTypeInputMutation.isSuccess) {
			setOpenModel(false);
		}
	}, [updateTypeInputMutation.isSuccess, setOpenModel]);

	return (
		<DivNative className="h-max flex flex-col gap-[2.4rem]">
			<InputSettingRequire inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingError inputItem={inputItemString} setInputItemString={setInputItemString} />
			<ButtonNative
				onClick={(e) => handleSaveSetting(e)}
				textContent="Lưu"
				className="w-[14rem] h-[4rem] text-[#ffffff] rounded-lg"
				style={{ backgroundColor: color }}
			/>
		</DivNative>
	);
};

export default InputSettingPhone;
