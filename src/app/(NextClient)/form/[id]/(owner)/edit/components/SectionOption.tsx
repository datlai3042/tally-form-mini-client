import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import React, { SetStateAction, useState } from "react";
import ModelInputType from "./ModelInputType";
import InputSettingWrapper from "./InputSettings/InputSettingWrapper";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
	funcRemoveInput: () => void;
	inputItem: InputCore.InputForm;
	openSetting: boolean;
	setOpenSetting: React.Dispatch<SetStateAction<boolean>>;
};

const SectionOption = (props: TProps) => {
	const { inputItem, openSetting, setOpenSetting, funcRemoveInput } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const [openSelectType, setOpenSelectType] = useState<boolean>(false);

	const styleEffect = {
		onCheckModeDisplay: () => {
			if (formCore.form_mode_display === "custom") {
				return "group-hover:!text-[#ffffff]";
			}
			return "";
		},
	};

	console.log({ openSetting });
	return (
		<>
			<DivWrapper className={`flex  h-full  items-center gap-[.3rem] `}>
				<Trash2
					size={18}
					onClick={funcRemoveInput}
					className={`${styleEffect.onCheckModeDisplay()} hover:cursor-pointer `}
				/>
				<Plus
					size={18}
					onClick={() => setOpenSelectType(true)}
					className={`${styleEffect.onCheckModeDisplay()} hover:cursor-pointer `}
				/>
				<DivWrapper
					style={{ backgroundColor: openSetting ? colorMain : "", padding: openSetting ? ".8rem .4rem" : "" }}
					className=" rounded-lg"
				>
					<GripVertical
						size={18}
						onClick={() => setOpenSetting(true)}
						className={`${styleEffect.onCheckModeDisplay()} hover:cursor-pointer `}
					/>
					{openSetting && <InputSettingWrapper setOpenModel={setOpenSetting} inputItem={inputItem} />}
				</DivWrapper>
			</DivWrapper>
			{openSelectType && <ModelInputType setOpenModel={setOpenSelectType} inputItem={inputItem} />}
		</>
	);
};

export default SectionOption;
