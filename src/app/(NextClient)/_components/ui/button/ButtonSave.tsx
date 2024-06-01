import React, { useContext } from "react";
import DivNative from "../NativeHtml/DivNative";
import ButtonNative from "../NativeHtml/ButtonNative";
import { useMutation } from "@tanstack/react-query";
import { FormCore } from "@/type";
import FormService from "@/app/_services/form.service";

const ButtonSave = () => {
	const formEditMutation = useMutation({
		mutationKey: ["edit-form"],
		mutationFn: (form: FormCore.Form) => FormService.updateForm(form),
	});

	const submit = () => {
		// console.log({ formInitial });
	};

	return (
		<DivNative className=" flex items-center justify-center " title="Save">
			<ButtonNative textContent="Save" className="p-[.8rem] rounded-md bg-blue-500 text-white" onClick={submit} />
		</DivNative>
	);
};

export default ButtonSave;
