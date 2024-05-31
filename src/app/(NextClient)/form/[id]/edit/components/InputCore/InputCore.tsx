import React, { SetStateAction, forwardRef, useContext, useRef, useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import ModelInputType from "../ModelInputType";
import InputLabel from "./InputLabel";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import InputTitle from "./InputTitle";
import { addInputItem, removeInputFirstItem, removeInputWithId } from "@/app/_lib/utils";
import { FormCore, InputCore as TInputCore } from "@/type";
import SectionLabelTitle from "../SectionLabelTitle";
import SectionOption from "../SectionOption";
import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import InputSettingWrapper from "../InputSettings/InputSettingWrapper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";

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

	return (
		<DivWrapper className="flex flex-col gap-[.5rem]  ">
			{label && <InputLabel inputItem={inputItem} />}
			{title && <InputTitle inputItem={inputItem} />}
			<DivWrapper
				className="group relative min-h-[8rem] h-max ml-[-8rem] min-w-full  xl:w-[60rem]  pl-[8rem] flex items-center "
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			>
				{modeScreen === "NORMAL" && (
					<SectionOption funcRemoveInput={removeFormItem} inputItem={inputItem} type={type} focus={focus} />
				)}

				<DivWrapper className="w-[90%] sm:w-full h-max flex flex-col gap-[2rem]" onKeyDown={onPressEnter}>
					{InputComponent}
				</DivWrapper>

				{!label && !title && modeScreen === "NORMAL" && (
					<SectionLabelTitle setLabel={setLabel} setTitle={setTitle} focus={focus} />
				)}
			</DivWrapper>
		</DivWrapper>
	);
};

export default InputCore;
