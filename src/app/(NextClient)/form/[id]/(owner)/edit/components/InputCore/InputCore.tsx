import React, { SetStateAction, forwardRef, useContext, useRef, useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import ModelInputType from "../ModelInputType";
import InputLabel from "./InputLabel";
import InputTitle from "./InputTitle";
import { addInputItem, removeInputWithId } from "@/app/_lib/utils";
import { FormCore, InputCore as TInputCore } from "@/type";
import SectionLabelTitle from "../SectionLabelTitle";
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

type TProps = {
	type: FormCore.InputType;
	InputComponent: React.ReactNode;
	inputItem: TInputCore.InputForm;
	labelValue: boolean;
	titleValue: boolean;
	inputHeading: string;
};

const InputCore = (props: TProps) => {
	const { inputItem, InputComponent, labelValue, titleValue, inputHeading, type } = props;
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: inputItem._id as UniqueIdentifier,
	});

	const [label, setLabel] = useState<boolean>(labelValue);
	const [title, setTitle] = useState<boolean>(titleValue);
	const [focus, setFocus] = useState<boolean>(false);

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
			const newFormUpdate = await addInputItem(inputItem, formCore);
			const { form } = newFormUpdate.metadata;
			dispatch(onFetchForm({ form }));
		}
	};

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	return (
		<div
			className="flex flex-col gap-[.5rem] border-none outline-none "
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
		>
			{/* <div className="relative w-full h-[5rem] opacity-30 ">
				<div className="absolute top-[50%] translate-y-[50%] w-full h-[.1rem] bg-slate-500"></div>
				<div className="absolute top-[50%] translate-x-[-50%] left-[50%] translate-y-[-50%] w-[12rem] bg-[#ffffff] flex items-center justify-center ">
					{inputItem.type}
				</div>
			</div> */}
			{label && <InputLabel inputItem={inputItem} />}
			{title && <InputTitle inputItem={inputItem} />}

			<DivWrapper
				className="group relative min-h-[8rem] h-max   w-full pt-[2.4rem] flex items-center "
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			>
				{modeScreen === "NORMAL" && (
					<SectionOption funcRemoveInput={removeFormItem} inputItem={inputItem} type={type} focus={focus} />
				)}

				<DivWrapper className="relative  w-full  h-max flex flex-col gap-[2rem]" onKeyDown={onPressEnter}>
					{InputComponent}
				</DivWrapper>
				{!label && !title && modeScreen === "NORMAL" && (
					<SectionLabelTitle setLabel={setLabel} setTitle={setTitle} focus={focus} />
				)}
			</DivWrapper>
		</div>
	);
};

export default InputCore;
