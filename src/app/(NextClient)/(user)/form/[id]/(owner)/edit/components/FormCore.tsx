"use client";

import React, { useContext, useMemo } from "react";

import InputCoreText from "./InputCore/InputCoreText";
import InputCoreEmail from "./InputCore/InputCoreEmail";
import { InputCore, FormCore as TFormCore } from "@/type";
import InputCoreTitle from "./InputCore/InputCoreTitle";
import InputCoreOption from "./InputCore/InputCoreOption";
import InputCoreOptionMultiple from "./InputCore/InputCoreOptionMultiple";
import InputCoreDate from "./InputCore/InputCoreDate";

import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import ButtonAddAvatarForm from "@/app/(NextClient)/_components/ui/button/ButtonAddAvatarForm";
import ButtonAddBackgroundForm from "@/app/(NextClient)/_components/ui/button/ButtonAddBackgroudForm";

import FormImage from "./FormImage";
import FormPageGuess from "@/app/(NextClient)/_components/Layout/FormPageGuess";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import ButtonDesgin from "./FormDesign/DesignCommon/ButtonDesgin";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";

import {
	DndContext,
	DragEndEvent,
	MouseSensor,
	UniqueIdentifier,
	closestCorners,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import useUpdateForm from "../../../../../../../hooks/useUpdateForm";

export const generateInputForms = (Inputs: InputCore.InputForm[]): React.ReactNode => {
	return Inputs.map((ele, index) => {
		switch (ele.type) {
			case "TEXT":
				return <InputCoreText inputItem={ele} key={ele._id} />;

			case "EMAIL":
				return <InputCoreEmail inputItem={ele} key={ele._id} />;
			case "OPTION":
				return <InputCoreOption inputItem={ele} key={ele._id} />;

			case "OPTION_MULTIPLE":
				return <InputCoreOptionMultiple inputItem={ele} key={ele._id} />;
			case "DATE":
				return <InputCoreDate inputItem={ele} key={ele._id} />;
			default:
				return <InputCoreText inputItem={ele} key={index} />;
		}
	});
};

const FormCore = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as TFormCore.Form;
	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
	const { openFormDesign } = useContext(FormDesignContext);
	const { setOpenSidebar } = useContext(SidebarContext);

	const updateFormAPI = useUpdateForm();

	const dispatch = useDispatch();

	const RenderArrayInput: React.ReactNode = useMemo(() => {
		return generateInputForms(formCore.form_inputs);
	}, [formCore?.form_inputs]);

	const onGetDataDemo = () => {
		console.log(true);
		console.log({ form: formCore });
	};

	const styleEffect = {
		onCheckModeScreen: () => {
			if (modeScreen === "FULL")
				return " !min-h-screen !w-screen  !h-max relative !top-0 !left-0   !transition-[scale] animate-modeScreen z-[50]";
			return "";
		},
	};

	const getPos = (id: UniqueIdentifier) => formCore.form_inputs.findIndex((ip) => ip._id === id);

	const onDrapEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id === over?.id) return;

		const posActive = getPos(active.id as unknown as UniqueIdentifier);
		const postOver = getPos(over?.id as unknown as UniqueIdentifier);

		const newArray = arrayMove(formCore.form_inputs, posActive, postOver);
		const newForm = structuredClone(formCore);
		newForm.form_inputs = newArray;
		dispatch(onFetchForm({ form: newForm }));
		updateFormAPI.mutate(newForm);
		return newArray;
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	return (
		<>
			{modeScreen === "NORMAL" && (
				<DivNative
					className={` w-full pt-[2rem] pb-[50rem] sm:pb-[30rem] px-[2rem] sm:px-0  h-max  xl:ml-0 flex flex-col gap-[3rem]`}
				>
					{(formCore.form_avatar ||
						formCore.form_background ||
						formCore.form_background_state ||
						formCore.form_avatar_state) && <FormImage />}

					<DivNative
						className={`${
							openFormDesign ? "w-[79rem]" : "min-w-[35rem] sm:min-w-[50rem] xl:w-max"
						} px-[1rem] sm:px-[5rem]  w-full xl:min-w-[80rem] mx-auto  h-max xl:pl-0  flex flex-col pb-[4rem] gap-[2rem] `}
					>
						<DivNative
							className={`${
								!(
									formCore.form_avatar ||
									formCore.form_background ||
									formCore.form_background_state ||
									formCore.form_avatar_state
								)
									? "pt-0"
									: "pt-[5rem] sm:pt-[10rem]"
							}`}
						>
							<DivNative className={`group max-h-[18rem] sm:max-h-[8rem] sm:min-h-[10rem] xl:min-h-max `}>
								<DivNative className="w-full xl:min-w-[80rem] xl:w-max h-full   flex flex-wrap flex-col sm:flex-row sm:items-center  gap-[2rem]">
									<ButtonDesgin className={`${openFormDesign ? "xl:ml-[8rem]" : "ml-0"}`} />

									<DivNative className="flex sm:hidden sm:group-hover:flex flex-col sm:flex-row w-max h-[16rem] sm:h-[4rem]   gap-[2rem]">
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

						<DivNative className={`${openFormDesign ? "xl:ml-[8rem]" : "ml-0"}`}>
							<InputCoreTitle />
							<DivNative className="mt-[6rem] h-max w-full flex flex-col gap-[8rem] ">
								<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDrapEnd}>
									<SortableContext
										items={
											formCore.form_inputs.map((ip) => ip._id) as unknown as UniqueIdentifier[]
										}
										strategy={verticalListSortingStrategy}
									>
										{RenderArrayInput}
									</SortableContext>
								</DndContext>
							</DivNative>
							<ButtonNative
								textContent="Gửi"
								className="mt-[5rem] w-[25%] h-[5rem] bg-slate-900 text-white rounded-md "
								onClick={onGetDataDemo}
							/>
						</DivNative>
					</DivNative>
				</DivNative>
			)}

			{modeScreen === "FULL" && (
				<div className={`${styleEffect.onCheckModeScreen()}`}>
					<DivNative
						className="absolute right-[4rem] top-[3rem] flex items-center justify-center z-[51]"
						title="Publish"
					>
						<ButtonNative
							style={{ borderColor: colorMain, backgroundColor: colorMain }}
							textContent="Back to Editor"
							className="p-[.8rem] rounded-lg  text-[#ffffff] "
							onClick={() => {
								setModeScreen("NORMAL");
								setOpenSidebar(true);
							}}
						/>
					</DivNative>

					<FormPageGuess FormCore={formCore} />
				</div>
			)}
		</>
	);
};

export default FormCore;
