import { FormCore, InputCore } from "@/type";
import { inputSettingText } from "../_constant/input.constant";
import Http from "../_lib/http";
import { ResponseApi } from "../_schema/api/response.shema";
import { useMutation } from "@tanstack/react-query";
import FormInputService from "../_services/FormInput.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

export const useAddInputToEnter = async (inputItem: InputCore.InputForm, form: FormCore.Form) => {
	const dispatch = useDispatch();

	const newForm = structuredClone(form);
	// const indexInputCurrentEvent = form.form_inputs.findIndex((ip) => ip._id === inputItem._id);

	const settingMerge = {
		...inputSettingText,
		input_color: newForm.form_setting_default.input_color || inputSettingText.input_color,
		input_size: newForm.form_setting_default.input_size || inputSettingText.input_size,
		input_style: newForm.form_setting_default.input_style || inputSettingText.input_style,
	} as InputCore.Setting.InputSettingTextCommon;

	// const inputPush: InputCore.InputText.InputTypeText = { type: "TEXT", core: { setting: settingMerge } };
	// newForm.form_inputs.splice(indexInputCurrentEvent + 1, 0, inputPush);

	const useAddInputEnter = useMutation({
		mutationKey: ["add-input-to-enter"],
		mutationFn: () =>
			FormInputService.addInputToEnter({ form: newForm, input_id_target: inputItem._id!, setting: settingMerge }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return useAddInputEnter;
};
