"use client";
import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, createContext, useState } from "react";

export type FormAnswerControl = {
	inputFormData: FormCore.FormAnswer.InputFormData[];
	inputFormRequire: FormCore.FormAnswer.InputFormRequire[];
	inputFormErrors: FormCore.FormAnswer.InputFormError[];
	openModelError: boolean;
	submitState: "pending" | "success" | "fail" | "clear";
	form_answer_id: string;
};

type TFormAnswerContext = {
	formAnswer: FormAnswerControl;
	setFormAnswer: React.Dispatch<SetStateAction<FormAnswerControl>>;
};

export const FormAnswerContext = createContext<TFormAnswerContext>({
	formAnswer: {
		inputFormData: [],
		inputFormErrors: [],
		inputFormRequire: [],
		openModelError: false,
		form_answer_id: "",

		submitState: "clear",
	},

	setFormAnswer: () => {},
});

type TProps = {
	formCore: FormCore.Form;
	form_answer_id: string;
	children: React.ReactNode;
};

const FormAnswerProvider = (props: TProps) => {
	const { formCore, children, form_answer_id } = props;
	console.log({ props });
	const [formAnswer, setFormAnswer] = useState<FormAnswerControl>(() => {
		return {
			inputFormData: formCore.form_inputs.map((ip) => {
				if (ip.type === "OPTION_MULTIPLE") {
					return {
						setting: ip.core.setting,
						_id: ip._id!,
						title: ip.input_title || "",
						mode: ip.core.setting.require
							? "Require"
							: ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),
						value: [],
						type: ip.type,
					};
				}

				return {
					setting: ip.core.setting,
					_id: ip._id!,
					title: ip.input_title || "",
					mode: ip.core.setting.require
						? "Require"
						: ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),
					value: "",
					type: ip.type,
				};
			}),
			inputFormErrors: [],
			form_answer_id,
			inputFormRequire: formCore.form_inputs.reduce(
				(newArray: FormCore.FormAnswer.InputFormRequire[], inputItem) => {
					if (inputItem.core.setting.require)
						newArray.push({ _id: inputItem._id, title: inputItem.input_title, checkRequire: false });
					return newArray;
				},
				[]
			),
			openModelError: false,
			submitState: "clear",
		};
	});

	return (
		<FormAnswerContext.Provider
			value={{
				formAnswer,
				setFormAnswer,
			}}
		>
			{children}
		</FormAnswerContext.Provider>
	);
};

export default FormAnswerProvider;
