import React, { useContext } from "react";
import DivNative from "../NativeHtml/DivNative";
import ButtonNative from "../NativeHtml/ButtonNative";
import { useMutation } from "@tanstack/react-query";
import { FormCore } from "@/type";
import FormService from "@/app/_services/form.service";
import { FormEditContext } from "../../provider/FormEditProvider";

const ButtonSave = () => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const formEditMutation = useMutation({
		mutationKey: ["edit-form"],
		mutationFn: (form: FormCore.Form) => FormService.updateForm(form),
	});

	const submit = () => {
		// console.log({ formInitial });
		const changeFormState = { ...formInitial };
		changeFormState.form_state = "isPrivate";
		setFormInitial((prev) => changeFormState);
		formEditMutation.mutate(changeFormState);
	};

	return (
		<DivNative className=" flex items-center justify-center " title="Save">
			<ButtonNative textContent="Save" className="p-[.8rem] rounded-md bg-blue-500 text-white" onClick={submit} />
		</DivNative>
	);
};

export default ButtonSave;
