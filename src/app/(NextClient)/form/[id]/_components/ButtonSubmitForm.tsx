import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormCore } from "@/type";
import React, { useContext, useEffect } from "react";
import { checkErrorFinal } from "./InputAnswer/_utils/formAnswer.uti";
import { useMutation } from "@tanstack/react-query";
import FormAnswerService from "@/app/_services/formAnswer.service";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { usePathname } from "next/navigation";

type TProps = {
	formCore: FormCore.Form;
};

const ButtonSubmitForm = (props: TProps) => {
	const { formCore } = props;

	const segment = usePathname();
	const tempMode = segment.startsWith("/form") && segment.endsWith("/edit");

	const {
		formAnswer: { inputFormRequire, inputFormErrors, inputFormData, submitState },
		setFormAnswer,
	} = useContext(FormAnswerContext);

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const submitFormMutation = useMutation({
		mutationKey: ["add new report form"],
		mutationFn: (formAnswer: {
			form_id: string;
			answers: FormCore.FormAnswer.InputFormData[];
			form_owner: string;
		}) => FormAnswerService.addNewFormReport(formAnswer),
	});

	useEffect(() => {
		if (submitFormMutation.isSuccess) {
			setFormAnswer((prev) => ({ ...prev, submitState: "success" }));
		}
	}, [submitFormMutation.isSuccess, setFormAnswer]);

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

			if (tempMode) {
				return setFormAnswer((prev) => ({ ...prev, submitState: "success" }));
			}
			console.log({ "Dữ liệu submit cuối cùng": payload });
			submitFormMutation.mutate(payload);
			setFormAnswer((prev) => ({ ...prev, submitState: "pending" }));
			return;
		}

		let inputErrorArray: FormCore.FormAnswer.InputFormError[] = [];
		inputErrorArray = checkErrorFinal(inputErrorArray, inputFormErrors, inputFormData);
		console.log({ "Các input lỗi": inputErrorArray });
		if (inputErrorArray.length > 0 || inputFormRequire.length > 0) {
			setFormAnswer((prev) => ({ ...prev, inputFormErrors: inputErrorArray, openModelError: true }));
		}
	};

	return (
		<div
			style={{ backgroundColor: colorMain }}
			onClick={handleSubmit}
			className="w-[25%] h-[5rem]  ml-auto flex items-center justify-center gap-[1rem] rounded-lg hover:cursor-pointer"
		>
			<ButtonNative textContent="Gửi" className=" text-white text-[1.6rem]" />

			{submitState === "pending" && <LoadingSpinner color="#ffffff" />}
		</div>
	);
};

export default ButtonSubmitForm;
