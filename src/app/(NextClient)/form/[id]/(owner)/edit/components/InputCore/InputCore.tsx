import React, { SetStateAction, forwardRef, memo, useContext, useRef, useState } from "react";
import InputTitle from "./InputTitle";
import { addInputItem, removeInputWithId } from "@/app/_lib/utils";
import { FormCore, InputCore as TInputCore } from "@/type";
import SectionLabelTitle from "../SetTitleInput";
import SectionOption from "../SectionOption";
import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import InputSettingWrapper from "../InputSettings/InputSettingWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import SetTitleInput from "../SetTitleInput";
import { useAddInputToEnter } from "@/app/hooks/useAddInputToEnter";
import RenderSettingItem from "../RenderSettingItem";

type TProps = {
	InputComponent: React.ReactNode;
	inputItem: TInputCore.InputForm;
	inputTitle: string;
	dataTextTitle?: string;
};

const InputCore = (props: TProps) => {
	const { inputItem, dataTextTitle, InputComponent, inputTitle } = props;
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: inputItem._id as UniqueIdentifier,
	});

	const [title, setTitle] = useState<boolean>(!!inputTitle || inputItem.type === "OPTION");
	const [focus, setFocus] = useState<boolean>(false);
	const [openSetting, setSetting] = useState<boolean>(false);

	const addInputToEnter = useAddInputToEnter(inputItem, formCore);

	const { modeScreen } = useContext(FormModeScreenContext);

	const removeFormItem = async () => {
		const newFormUpdate = await removeInputWithId(formCore, inputItem._id!);
		const { form } = newFormUpdate.metadata;
		dispatch(onFetchForm({ form }));
	};

	const onPressEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			if (modeScreen === "FULL") {
				return null;
			}
			(await addInputToEnter).mutate();
		}
	};

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	let $color = "#000000";

	const checkModeDisplay =
		formCore.form_mode_display === "custom"
			? {
					"--bg-input-core": colorMain,
					"--bg-input-core-2": $color,
					// borderColor: "var(--borderInputAnswerFocus) !important",
					borderColor: colorMain,
					position: "relative",
			  }
			: "";

	return (
		<div
			onMouseEnter={() => ($color = "#fff")}
			onMouseLeave={() => ($color = "#000")}
			className={`${
				formCore.form_mode_display === "custom"
					? "input-core shadow-md border-[.2rem] min-h-[40rem] p-[2rem] xl:p-[4rem]"
					: ""
			}   group flex flex-col justify-center gap-[1.8rem] outline-none focus:cursor-move     rounded-[1.6rem]  `}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={
				{
					...style,
					...checkModeDisplay,
				} as React.CSSProperties
			}
		>
			{title && <InputTitle inputItem={inputItem} dataTextTitle={dataTextTitle} />}

			<DivWrapper
				className={`${
					formCore.form_mode_display === "custom" ? " w-[90%]  xl:w-[70%]" : "w-full"
				}  group relative min-h-[8rem] h-max pt-[2.4rem] flex items-center  `}
			>
				{modeScreen === "NORMAL" && (
					<DivWrapper className=" absolute top-[-1rem]  xl:left-0  h-[2rem] text-[1.4rem] ">
						<SectionOption
							openSetting={openSetting}
							setOpenSetting={setSetting}
							funcRemoveInput={removeFormItem}
							inputItem={inputItem}
						/>
					</DivWrapper>
				)}

				<DivWrapper
					className={`${
						formCore.form_mode_display === "custom" ? "input-core-children relative  w-[76%]" : "w-full"
					}  h-max flex flex-col gap-[2rem] `}
					onKeyDown={onPressEnter}
				>
					{InputComponent}
				</DivWrapper>
				{!title && modeScreen === "NORMAL" && <SetTitleInput setTitle={setTitle} focus={focus} />}
			</DivWrapper>

			{formCore.form_mode_display === "custom" && (
				<div
					onClick={() => {
						if (!openSetting) {
							setSetting(true);
						}
					}}
				>
					<div className="absolute top-0 right-[.2rem] xl:right-[4rem] flex flex-col items-center">
						<div
							style={{ borderColor: colorMain }}
							className="group-hover:!border-[#ffffff] w-[1rem] h-[3rem] border-x-[.2rem] "
						></div>
						<div
							style={{ backgroundColor: colorMain }}
							className="group-hover:!bg-[#ffffff] group-hover:!text-inherit group-hover:font-semibold xl:group-hover:text-[1.6rem] text-[1.2rem] xl:text-[1.4rem] w-[12rem] xl:w-[16rem] h-[4rem] flex items-center justify-center text-white rounded-lg"
						>
							{inputItem.type.toUpperCase()}
						</div>
					</div>
					<div
						style={{ backgroundColor: colorMain }}
						className="absolute group-hover:!bg-[#ffffff] bottom-0 right-0 w-[8rem] xl:w-[26rem] h-[77%]  rounded-tl-[10rem]"
					>
						<div
							className={`${
								openSetting ? "hidden xl:block xl:group-hover:block " : "hidden xl:group-hover:block"
							}  hover:cursor-pointer h-full  rounded-tl-[10rem]`}
						>
							<RenderSettingItem inputItem={inputItem} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default memo(InputCore);
