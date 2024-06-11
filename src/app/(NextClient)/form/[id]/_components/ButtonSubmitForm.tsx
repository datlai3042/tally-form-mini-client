import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormCore, InputCore } from "@/type";
import React, { useContext } from "react";
import { superTextValidate } from "./InputAnswer/_validate/inputText.validate";
import { superEmailValidate } from "./InputAnswer/_validate/inputEmail.validate";
import { checkErrorFinal } from "./InputAnswer/_utils/formAnswer.uti";
import { useMutation } from "@tanstack/react-query";
import FormAnswerService from "@/app/_services/formAnswer.service";

type TProps = {
	formCore: FormCore.Form;
};

const ButtonSubmitForm = (props: TProps) => {
	const { formCore } = props;

	const { inputFormData, inputFormRequire, inputFormErrors, setOpenModelError, setInputFormErrors } =
		useContext(FormAnswerContext);

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const submitFormMutation = useMutation({
		mutationKey: ["add new report form"],
		mutationFn: (formAnswer: {
			form_id: string;
			answers: FormCore.FormAnswer.InputFormData[];
			form_owner: string;
		}) => FormAnswerService.addNewFormReport(formAnswer),
	});

	const handleSubmit = () => {
		const checkRequire = inputFormRequire.every((ip) => ip.checkRequire);
		if (checkRequire && inputFormErrors.length === 0) {
			const answers = inputFormData.map((ip) => {
				if (ip.setting) delete ip.setting;
				return ip;
			});

			const payload = {
				form_id: formCore._id,
				form_owner: formCore.form_owner,
				answers,
			};

			submitFormMutation.mutate(payload);

			return console.log({ answers });
		}

		let inputErrorArray: InputCore.Commom.CatchError[] = [];
		inputErrorArray = checkErrorFinal(inputErrorArray, inputFormErrors, inputFormData);
		if (inputErrorArray.length > 0) {
			setInputFormErrors(inputErrorArray);
			setOpenModelError(true);
		}
	};

	return (
		<ButtonNative
			style={{ backgroundColor: colorMain }}
			textContent="Gửi"
			className="w-[25%] h-[5rem] ml-auto bg-slate-900 text-white rounded-md  text-[1.6rem]"
			onClick={handleSubmit}
		/>
	);
};

export default ButtonSubmitForm;
