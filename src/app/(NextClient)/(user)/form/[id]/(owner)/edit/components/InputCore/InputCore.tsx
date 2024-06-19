import React, { SetStateAction, forwardRef, memo, useContext, useRef, useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import ModelInputType from "../ModelInputType";
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

type TProps = {
	type: FormCore.InputType;
	InputComponent: React.ReactNode;
	inputItem: TInputCore.InputForm;
	inputTitle: string;
	dataTextTitle?: string;
};

const InputCore = (props: TProps) => {
	const { inputItem, dataTextTitle, InputComponent, inputTitle, type } = props;
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: inputItem._id as UniqueIdentifier,
	});

	const [title, setTitle] = useState<boolean>(!!inputTitle || inputItem.type === "OPTION");
	const [focus, setFocus] = useState<boolean>(false);

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

	return (
		<div
			className="flex flex-col gap-[1.8rem] border-none outline-none hover:cursor-move "
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
		>
			{title && <InputTitle inputItem={inputItem} dataTextTitle={dataTextTitle} />}

			<DivWrapper className="group relative min-h-[8rem] h-max   w-full pt-[2.4rem] flex items-center ">
				{modeScreen === "NORMAL" && (
					<DivWrapper className=" absolute top-[-.8rem]  xl:left-0  h-[2rem] text-[1.4rem] ">
						<SectionOption funcRemoveInput={removeFormItem} inputItem={inputItem} type={type} />
					</DivWrapper>
				)}

				<DivWrapper className="relative  w-full  h-max flex flex-col gap-[2rem]" onKeyDown={onPressEnter}>
					{InputComponent}
				</DivWrapper>
				{!title && modeScreen === "NORMAL" && <SetTitleInput setTitle={setTitle} focus={focus} />}
			</DivWrapper>
		</div>
	);
};

export default memo(InputCore);
