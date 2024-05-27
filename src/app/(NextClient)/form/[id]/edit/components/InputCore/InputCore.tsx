import React, { SetStateAction, forwardRef, useContext, useRef, useState } from "react";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import ModelInputType from "../ModelInputType";
import InputLabel from "./InputLabel";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import InputTitle from "./InputTitle";
import { removeInputFirstItem, removeInputWithIndex } from "@/app/_lib/utils";
import { FormCore, InputCore as TInputCore } from "@/type";
import SectionLabelTitle from "../SectionLabelTitle";
import SectionOption from "../SectionOption";
import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import InputSettingWrapper from "../InputSettings/InputSettingWrapper";

type TProps = {
	type: FormCore.InputType;
	InputComponent: React.ReactNode;
	indexItem: number;
	labelValue: boolean;
	titleValue: boolean;
	inputHeading: string;
};

const InputCore = (props: TProps) => {
	const { indexItem, InputComponent, labelValue, titleValue, inputHeading, type } = props;

	const [label, setLabel] = useState<boolean>(labelValue);
	const [title, setTitle] = useState<boolean>(titleValue);
	const [focus, setFocus] = useState<boolean>(false);

	const { setFormInitial } = useContext(FormEditContext);
	const { modeScreen } = useContext(FormModeScreenContext);

	const removeFormItem = () => {
		if (typeof indexItem === "number") {
			if (indexItem === 0) {
				removeInputFirstItem(setFormInitial);
				return;
			}

			removeInputWithIndex(setFormInitial, indexItem);
		}
	};

	return (
		<DivWrapper className="flex flex-col gap-[.5rem]  ">
			{label && <InputLabel labelValue={inputHeading} indexItem={indexItem} />}
			{title && <InputTitle titleValue={inputHeading} indexItem={indexItem} />}
			<DivWrapper
				className="group relative min-h-[8rem] h-max ml-[-8rem] min-w-full  xl:w-[60rem]  pl-[8rem] flex items-center "
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
			>
				{modeScreen === "NORMAL" && (
					<SectionOption funcRemoveInput={removeFormItem} indexItem={indexItem} type={type} focus={focus} />
				)}

				<DivWrapper className="w-full h-max flex flex-col gap-[2rem]">{InputComponent}</DivWrapper>

				{!label && !title && modeScreen === "NORMAL" && (
					<SectionLabelTitle setLabel={setLabel} setTitle={setTitle} focus={focus} />
				)}
			</DivWrapper>
		</DivWrapper>
	);
};

export default InputCore;
