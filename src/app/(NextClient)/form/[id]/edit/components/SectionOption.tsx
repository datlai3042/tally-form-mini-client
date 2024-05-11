import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, ReactCustom } from "@/type";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import React from "react";

type TProps = {
	funcRemoveInput: () => void;
	funcOpenModelAddInput: ReactCustom.SetStateBoolean;
	focus: boolean;
};

const SectionOption = (props: TProps) => {
	const { focus, funcRemoveInput, funcOpenModelAddInput } = props;

	const styleEffect = {
		onCheckFocus: (focus: boolean) => {
			if (!focus) return "hidden  group-hover:flex";
			return "flex";
		},
	};

	return (
		<DivWrapper className=" absolute left-0  h-full text-[1.4rem] " style={{ direction: "ltr" }}>
			<DivWrapper className={`${styleEffect.onCheckFocus(focus)} h-full  items-center gap-[.3rem] `}>
				<Trash2 size={18} onClick={funcRemoveInput} className="hover:cursor-pointer" />
				<Plus size={18} onClick={() => funcOpenModelAddInput(true)} className="hover:cursor-pointer" />
				<GripVertical size={18} />
			</DivWrapper>
		</DivWrapper>
	);
};

export default SectionOption;
