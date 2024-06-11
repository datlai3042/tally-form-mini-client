"use client";
import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, createContext, useState } from "react";

type TFormAnswerContext = {
	inputFormData: FormCore.FormAnswer.InputFormData[];
	setInputFormData: React.Dispatch<SetStateAction<FormCore.FormAnswer.InputFormData[]>>;

	inputFormRequire: FormCore.FormAnswer.InputFormRequire[];
	setInputFormRequire: React.Dispatch<SetStateAction<FormCore.FormAnswer.InputFormRequire[]>>;

	inputFormErrors: InputCore.Commom.CatchError[];
	setInputFormErrors: React.Dispatch<SetStateAction<InputCore.Commom.CatchError[]>>;

	openModelError: boolean;
	setOpenModelError: React.Dispatch<SetStateAction<boolean>>;
};

export const FormAnswerContext = createContext<TFormAnswerContext>({
	inputFormData: [],
	inputFormRequire: [],
	inputFormErrors: [],
	openModelError: false,
	setInputFormData: () => {},
	setInputFormRequire: () => {},
	setInputFormErrors: () => {},
	setOpenModelError: () => {},
});

type TProps = {
	formCore: FormCore.Form;
	children: React.ReactNode;
};

const FormAnswerProvider = (props: TProps) => {
	const { formCore, children } = props;

	const [openModelError, setOpenModelError] = useState<boolean>(false);

	const [inputFormRequire, setInputFormRequire] = useState(() => {
		const arrayInputRequire = formCore.form_inputs.reduce(
			(newArray: FormCore.FormAnswer.InputFormRequire[], inputItem) => {
				if (inputItem.setting.require)
					newArray.push({ _id: inputItem._id, title: inputItem.input_heading, checkRequire: false });

				return newArray;
			},
			[]
		);

		return arrayInputRequire;
	});

	const [inputFormData, setInputFormData] = useState<FormCore.FormAnswer.InputFormData[]>(() => {
		const data = formCore.form_inputs.map((ip) => {
			return {
				setting: ip.setting,
				_id: ip._id!,
				title: ip.input_heading || "Không có tiêu đề",
				mode: ip.setting.require ? "Require" : ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),
				value: "",
				type: ip.type,
			};
		});

		return data;
	});

	const [inputFormErrors, setInputFormErrors] = useState<InputCore.Commom.CatchError[]>([]);

	return (
		<FormAnswerContext.Provider
			value={{
				inputFormData,
				inputFormRequire,
				inputFormErrors,
				openModelError,
				setOpenModelError,
				setInputFormData,
				setInputFormRequire,
				setInputFormErrors,
			}}
		>
			{children}
		</FormAnswerContext.Provider>
	);
};

export default FormAnswerProvider;
