import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext, useState } from "react";
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
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";

/*
      require
      placeholder,
      minLength,
      maxLength,
      error
*/

type TProps = {
	inputItem: InputCore.InputForm;
};

const InputSettingText = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const dispatch = useDispatch();
	const [inputItemString, setInputItemString] = useState<InputCore.InputCommonText>(
		inputItem as InputCore.InputCommonText
	);

	console.log({ inputItemString, inputItem });
	const updateTypeInputMutation = useMutation({
		mutationKey: ["setting text", inputItem._id],
		mutationFn: ({
			form,
			input_id,
			input_id_setting,
		}: {
			form: FormCore.Form;
			input_id: string;
			input_id_setting: InputCore.InputSettingTextCommon;
		}) => FormService.updateSettingInput(form, input_id, input_id_setting),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	console.log({ form: formCore });

	const handleSaveSetting = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		console.log({ inputItemString });
		if (inputItemString.setting.minLength > inputItemString.setting.maxLength) {
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
			(ip.setting as unknown as InputCore.InputCommonText) = inputItemString;
			return ip;
		});

		updateTypeInputMutation.mutate({
			form: newForm,
			input_id: inputItem._id!,
			input_id_setting: inputItemString.setting,
		});
	};

	return (
		<DivNative className="h-max flex flex-col gap-[1.6rem]">
			<InputSettingRequire inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingPlaceholder inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingMinLength inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingMaxLength inputItem={inputItemString} setInputItemString={setInputItemString} />
			<InputSettingError inputItem={inputItemString} setInputItemString={setInputItemString} />
			<ButtonNative textContent="Lưu" onClick={(e) => handleSaveSetting(e)} />
		</DivNative>
	);
};

export default InputSettingText;
