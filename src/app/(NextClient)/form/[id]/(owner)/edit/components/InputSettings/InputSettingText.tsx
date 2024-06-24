import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { SetStateAction, useContext, useEffect, useState } from "react";
import InputSettingRequire from "./SettingCommon/InputSettingRequire";
import InputSettingPlaceholder from "./SettingCommon/InputSettingPlaceholder";
import InputSettingMinLength from "./SettingCommon/InputSettingMinLength";
import InputSettingMaxLength from "./SettingCommon/InputSettingMaxLength";
import InputSettingError from "./SettingCommon/InputSettingError";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { toast } from "@/components/ui/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import useUpdateInputSetting from "@/app/hooks/useUpdateInputSetting";

/*
      require
      placeholder,
      minLength,
      maxLength,
      error
*/

type TProps = {
	inputItem: InputCore.InputForm;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const InputSettingText = (props: TProps) => {
	const { inputItem, setOpenModel } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;
	const dispatch = useDispatch();
	const [inputItemString, setInputItemString] = useState<InputCore.Commom.InputCommonText>(() => {
		return {
			core: {
				setting: inputItem.core.setting,
			},
		} as InputCore.Commom.InputCommonText;
	});

	console.log({ inputItemString, inputItem });

	console.log({ form: formCore });

	const { updateTypeInputMutation } = useUpdateInputSetting<InputCore.Setting.InputSettingCommon>();

	const handleSaveSetting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		console.log({ inputItemString });
		if (inputItemString.core.setting.minLength > inputItemString.core.setting.maxLength) {
			toast({
				title: "Lỗi cài đặt Setting",
				description: "Min không thể lớn Max",
				variant: "destructive",
			});
			return;
		}
		console.log("OK");
		const newForm = structuredClone(formCore);
		newForm.form_inputs = newForm.form_inputs.filter((ip) => {
			if (ip._id !== inputItem._id) return ip;
			(ip.core.setting as unknown as InputCore.Commom.InputCommonText) = inputItemString;
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
			<InputSettingRequire<InputCore.Commom.InputCommonText, InputCore.Setting.InputSettingTextCommon>
				inputItem={inputItemString}
				setInputItemString={setInputItemString}
			/>
			<InputSettingPlaceholder inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingMinLength inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingMaxLength inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingError<InputCore.Commom.InputCommonText, InputCore.Setting.InputSettingTextCommon>
				inputItem={inputItemString}
				setInputItemString={setInputItemString}
			/>
			<ButtonNative
				textContent="Lưu"
				onClick={(e) => handleSaveSetting(e)}
				className="w-[14rem] h-[4rem] text-[#ffffff] rounded-lg"
				style={{ backgroundColor: color }}
			/>
		</DivNative>
	);
};

export default InputSettingText;
