import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, ReactCustom } from "@/type";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModelInputType from "./ModelInputType";
import InputSettingWrapper from "./InputSettings/InputSettingWrapper";

type TProps = {
	funcRemoveInput: () => void;
	focus: boolean;
	indexItem: number;
	type: FormCore.InputType;
};

const SectionOption = (props: TProps) => {
	const { focus, indexItem, type, funcRemoveInput } = props;

	const [openSelectType, setOpenSelectType] = useState<boolean>(false);
	const [openSetting, setSetting] = useState<boolean>(false);

	const styleEffect = {
		onCheckFocus: (focus: boolean) => {
			if (!focus) return openSetting ? "flex" : "hidden  group-hover:flex";
			return "flex";
		},
	};

	return (
		<DivWrapper className=" absolute left-0  h-full text-[1.4rem] ">
			<DivWrapper className={`${styleEffect.onCheckFocus(focus)} h-full  items-center gap-[.3rem] `}>
				<Trash2 size={18} onClick={funcRemoveInput} className="hover:cursor-pointer" />
				<Plus size={18} onClick={() => setOpenSelectType(true)} className="hover:cursor-pointer" />
				<DivWrapper>
					<GripVertical size={18} onClick={() => setSetting(true)} className="hover:cursor-pointer" />
					{openSetting && (
						<InputSettingWrapper setOpenModel={setSetting} indexItem={indexItem} InputType={type} />
					)}
				</DivWrapper>
			</DivWrapper>
			{openSelectType && <ModelInputType setOpenModel={setOpenSelectType} indexItem={indexItem} />}
		</DivWrapper>
	);
};

export default SectionOption;
