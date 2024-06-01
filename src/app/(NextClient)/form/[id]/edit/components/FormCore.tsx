"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputCoreText from "./InputCore/InputCoreText";
import InputCoreEmail from "./InputCore/InputCoreEmail";
import { InputCore, FormCore as TFormCore } from "@/type";
import InputCoreTitle from "./InputCore/InputCoreTitle";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import ButtonSave from "@/app/(NextClient)/_components/ui/button/ButtonSave";
import Image from "next/image";
import ButtonAddAvatarForm from "@/app/(NextClient)/_components/ui/button/ButtonAddAvatarForm";
import ButtonAddBackgroundForm from "@/app/(NextClient)/_components/ui/button/ButtonAddBackgroudForm";
import ButtonRemoveAvatarForm from "@/app/(NextClient)/_components/ui/button/ButtonRemoveAvatarForm";
import ButtonRemoveBackgroudForm from "@/app/(NextClient)/_components/ui/button/ButtonRemoveBackgroudForm";
import { HexColorPicker } from "react-colorful";

import FormImage from "./FormImage";
import ButtonDesgin from "@/app/(NextClient)/form/[id]/edit/components/FormDesign/DesignCommon/ButtonDesgin";
import FormPageGuess from "@/app/(NextClient)/_components/Layout/FormPageGuess";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import FormDesignProvider from "@/app/(NextClient)/_components/provider/FormDesignProvider";

export const generateInputForms = (Inputs: InputCore.InputForm[]): React.ReactNode => {
	return Inputs.map((ele, index) => {
		switch (ele.type) {
			case "TEXT" as unknown as TFormCore.InputType:
				return (
					<InputCoreText
						// setArrayInput={setArrayInput}
						inputItem={ele as InputCore.InputText.InputTypeText}
						key={ele.type + index}
					/>
				);
			case "EMAIL" as unknown as TFormCore.InputType:
				return (
					<InputCoreEmail
						inputItem={ele as InputCore.InputEmail.InputTypeEmail}
						// setArrayInput={setArrayInput}

						key={ele.type + index}
					/>
				);
			default:
				return (
					<InputCoreText
						inputItem={ele as InputCore.InputText.InputTypeText}
						// setArrayInput={setArrayInput}

						key={ele.type + index}
					/>
				);
		}
	});
};

const FormCore = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as TFormCore.Form;

	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const RenderArrayInput: React.ReactNode = useMemo(
		() => generateInputForms(formCore.form_inputs),
		[formCore?.form_inputs]
	);

	const onGetDataDemo = () => {
		console.log(true);
		console.log({ form: formCore });
	};

	return (
		<>
			{modeScreen === "NORMAL" && (
				<DivNative
					className={`pt-[2rem] pb-[50rem] sm:pb-[30rem] w-full h-max  xl:ml-0 flex flex-col gap-[3rem]`}
				>
					{(formCore.form_avatar ||
						formCore.form_background ||
						formCore.form_background_state ||
						formCore.form_avatar_state) && <FormImage />}
					<React.Fragment>
						<DivNative
							className={`${
								!(
									formCore.form_avatar ||
									formCore.form_background ||
									formCore.form_background_state ||
									formCore.form_avatar_state
								)
									? "0"
									: "pt-[10rem]"
							}`}
						>
							<DivNative className={`group min-h-[6rem]`}>
								<DivNative className="w-full xl:min-w-[100rem] xl:w-max h-full px-[1rem] sm:pl-[8%] xl:pl-0 xl:ml-[20%] flex flex-col sm:flex-row sm:items-center  gap-[2rem]">
									<ButtonDesgin />

									<DivNative className="hidden group-hover:flex w-max h-[4rem]   gap-[2rem]">
										{!formCore.form_background_state && !formCore.form_background && (
											<ButtonAddBackgroundForm />
										)}
										{!formCore.form_avatar_state && !formCore.form_avatar && (
											<ButtonAddAvatarForm />
										)}
									</DivNative>
								</DivNative>
							</DivNative>
						</DivNative>
					</React.Fragment>

					<DivNative
						className={`px-[1rem] sm:px-[5rem]  w-full xl:min-w-[100rem] xl:w-max h-max xl:pl-0 xl:ml-[20%] flex flex-col gap-[2.4rem] pb-[4rem]  `}
					>
						<InputCoreTitle />
						<DivNative className="mt-[4rem] h-max w-full flex flex-col gap-[5rem] ">
							{RenderArrayInput}
						</DivNative>
						<ButtonNative
							textContent="Gửi"
							className="ml-[20%] xl:ml-0 w-[25%] h-[5rem] bg-slate-900 text-white rounded-md "
							onClick={onGetDataDemo}
						/>
					</DivNative>
				</DivNative>
			)}

			{modeScreen === "FULL" && (
				<DivNative className="relative">
					<DivNative
						className="absolute right-[0rem] top-[3rem] flex items-center justify-center z-[51]"
						title="Publish"
					>
						<ButtonNative
							textContent="Back to Editor"
							className="p-[.8rem] rounded-md bg-[#ffffff] text-slate-900 border-[1px] border-slate-200"
							onClick={() => setModeScreen("NORMAL")}
						/>
					</DivNative>
					<FormPageGuess FormCore={formCore} />
				</DivNative>
			)}
		</>
	);
};

export default FormCore;
