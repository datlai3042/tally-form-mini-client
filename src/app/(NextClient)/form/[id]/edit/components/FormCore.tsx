"use client";

import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputCoreText from "./InputCore/InputCoreText";
import InputCoreEmail from "./InputCore/InputCoreEmail";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
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
import FormAvatar from "./FormAvatar";
import FormBackground from "./FormBackground";
import FormImage from "./FormImage";

export const generateInputForms = (Inputs: InputCore.InputForm[]): React.ReactNode => {
	return Inputs.map((ele, index) => {
		switch (ele.type) {
			case "TEXT" as unknown as TFormCore.InputType:
				return (
					<InputCoreText
						// setArrayInput={setArrayInput}
						inputItem={ele as InputCore.InputText.InputTypeText}
						indexItem={index}
						key={ele.type + index}
					/>
				);
			case "EMAIL" as unknown as TFormCore.InputType:
				return (
					<InputCoreEmail
						inputItem={ele as InputCore.InputEmail.InputTypeEmail}
						// setArrayInput={setArrayInput}
						indexItem={index}
						key={ele.type + index}
					/>
				);
			default:
				return (
					<InputCoreText
						inputItem={ele as InputCore.InputText.InputTypeText}
						// setArrayInput={setArrayInput}
						indexItem={index}
						key={ele.type + index}
					/>
				);
		}
	});
};

const FormCore = () => {
	const { formInitial } = useContext(FormEditContext);
	const [firstEnter, setFirstEnter] = useState<boolean>(formInitial.form_title ? true : false);

	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const RenderArrayInput: React.ReactNode = useMemo(
		() => generateInputForms(formInitial.form_inputs),
		[formInitial.form_inputs]
	);

	console.log({ firstEnter, title: formInitial.form_title });

	const onGetDataDemo = () => {
		console.log(true);
		console.log({ form: formInitial });
	};

	return (
		<DivNative
			className={`${
				modeScreen === "FULL" ? "pb-[8rem]" : "pb-[50rem] sm:pb-[30rem]`"
			} w-full h-max flex flex-col gap-[3rem] `}
		>
			{modeScreen === "FULL" && (
				<DivNative
					className="absolute right-[4rem] top-[3rem] flex items-center justify-center z-[51]"
					title="Publish"
				>
					<ButtonNative
						textContent="Back to Editor"
						className="p-[.8rem] rounded-md bg-[#ffffff] text-slate-900 border-[1px] border-slate-200"
						onClick={() => setModeScreen("NORMAL")}
					/>
				</DivNative>
			)}
			{(formInitial.form_avatar || formInitial.form_background) && <FormImage />}
			{modeScreen === "FULL" ? null : (
				<React.Fragment>
					<DivNative
						className={`${!(formInitial.form_avatar || formInitial.form_background) ? "mt-[4rem]" : ""}`}
					>
						<DivNative className={`${formInitial.form_avatar ? "mt-[4rem]" : "mt-0"} group h-[6rem]`}>
							<DivNative className="w-full xl:min-w-[100rem] xl:w-max h-full px-[1rem] pl-[25%] xl:pl-0 xl:ml-[20%]">
								<DivNative className="hidden group-hover:flex w-full h-[4rem]   gap-[2rem]">
									{!formInitial.form_background && <ButtonAddBackgroundForm />}
									{!formInitial.form_avatar && <ButtonAddAvatarForm />}
								</DivNative>
							</DivNative>
						</DivNative>
					</DivNative>
				</React.Fragment>
			)}

			<DivNative
				className={`${modeScreen === "NORMAL" ? "  px-[1rem]  pl-[25%]" : " px-[5rem]"} ${
					formInitial.form_avatar && modeScreen === "FULL" ? "mt-[12rem]" : "mt-0"
				} w-full xl:min-w-[100rem] xl:w-max h-max xl:pl-0 xl:ml-[20%] flex flex-col gap-[2.4rem] pb-[4rem]  `}
			>
				<InputCoreTitle setFirstEnter={setFirstEnter} />
				<DivNative className="mt-[4rem] h-max w-full flex flex-col gap-[3rem] ">{RenderArrayInput}</DivNative>
				{true && (
					<ButtonNative
						textContent="Submit"
						className="w-[25%] h-[3.6rem] bg-slate-900 text-white rounded-md "
						onClick={onGetDataDemo}
					/>
				)}
			</DivNative>
		</DivNative>
	);
};

export default FormCore;
