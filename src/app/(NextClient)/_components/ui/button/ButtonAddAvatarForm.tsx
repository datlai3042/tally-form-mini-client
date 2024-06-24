"use client";

import { Hexagon } from "lucide-react";
import React, { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { FormCore } from "@/type";
import FormService from "@/app/_services/form.service";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { FormText } from "@/app/_constant/formUi.constant";

export interface ButtonAddAvatarFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonAddAvatarForm = (props: ButtonAddAvatarFormProps) => {
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { textContent = FormText.buttonDesign.avatar, ...buttonProps } = props;

	const addAvatarMutation = useMutation({
		mutationKey: ["add-background"],
		mutationFn: (form: FormCore.Form) => FormService.addAvatar(formCore),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	const onAddAvatar = () => {
		addAvatarMutation.mutate(formCore);
	};

	return (
		<button
			{...buttonProps}
			className={` ${
				buttonProps.className ? buttonProps.className : ""
			} min-w-[14rem]  w-max  h-[4rem] p-[1rem] flex items-center sm:justify-center gap-[.5rem] text-textHeader  rounded-xl text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
			onClick={onAddAvatar}
		>
			<Hexagon />
			{textContent}
		</button>
	);
};

export default ButtonAddAvatarForm;
