import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { FormCore, ReactCustom } from "@/type";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
	setTitle: ReactCustom.SetStateBoolean;
	focus: boolean;
};

const SetTitleInput = (props: TProps) => {
	const { focus, setTitle } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const styleEffect = {
		onCheckModeDisplay: () => {
			if (formCore.form_mode_display === "custom") {
				return "group-hover:text-[#ffffff] text-[#000000] ";
			}
			return "text-gray-400 hover:text-gray-600";
		},
	};

	return (
		<DivWrapper
			className={`${
				formCore.form_mode_display === "custom" ? "right-[6rem]" : "right-0"
			} absolute top-[-1rem]   h-max flex items-center text-[1.4rem]`}
			style={{ direction: "rtl" }}
		>
			<DivWrapper
				className={`
			flex h-full   justify-around items-center gap-[2rem] `}
			>
				<ButtonNative
					className={`${styleEffect.onCheckModeDisplay()}`}
					onClick={() => setTitle(true)}
					tabIndex={-1}
					textContent="Thêm tiêu đề"
				/>
			</DivWrapper>
		</DivWrapper>
	);
};

export default SetTitleInput;
