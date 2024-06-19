import { FormCore, InputCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import FormService from "../_services/form.service";
import { useDispatch } from "react-redux";
import { onFetchForm } from "../_lib/redux/features/formEdit.slice";

const useUpdateInputSetting = <SettingType extends InputCore.Setting.InputSettingCommon>() => {
	const dispatch = useDispatch();

	const updateTypeInputMutation = useMutation({
		mutationKey: ["update-setting-input"],
		mutationFn: ({
			form,
			input_id,
			input_id_setting,
		}: {
			form: FormCore.Form;
			input_id: string;
			input_id_setting: SettingType;
		}) => FormService.updateSettingInput<SettingType>(form, input_id, input_id_setting),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	return { updateTypeInputMutation };
};

export default useUpdateInputSetting;
