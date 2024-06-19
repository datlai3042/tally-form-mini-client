import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";
import ModelInputType from "./ModelInputType";
import InputSettingWrapper from "./InputSettings/InputSettingWrapper";

type TProps = {
	funcRemoveInput: () => void;
	inputItem: InputCore.InputForm;
	type: FormCore.InputType;
};

const SectionOption = (props: TProps) => {
	const { inputItem, type, funcRemoveInput } = props;

	const [openSelectType, setOpenSelectType] = useState<boolean>(false);
	const [openSetting, setSetting] = useState<boolean>(false);

	return (
		<>
			<DivWrapper className={`flex  h-full  items-center gap-[.3rem] `}>
				<Trash2 size={18} onClick={funcRemoveInput} className="hover:cursor-pointer" />
				<Plus size={18} onClick={() => setOpenSelectType(true)} className="hover:cursor-pointer" />
				<DivWrapper>
					<GripVertical size={18} onClick={() => setSetting(true)} className="hover:cursor-pointer" />
					{openSetting && <InputSettingWrapper setOpenModel={setSetting} inputItem={inputItem} />}
				</DivWrapper>
			</DivWrapper>
			{openSelectType && <ModelInputType setOpenModel={setOpenSelectType} inputItem={inputItem} />}
		</>
	);
};

export default SectionOption;
