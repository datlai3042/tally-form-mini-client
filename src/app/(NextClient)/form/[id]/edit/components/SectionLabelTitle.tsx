import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { ReactCustom } from "@/type";
import React from "react";

type TProps = {
	setLabel: ReactCustom.SetStateBoolean;
	setTitle: ReactCustom.SetStateBoolean;
	focus: boolean;
};

const SectionLabelTitle = (props: TProps) => {
	const { focus, setLabel, setTitle } = props;

	const styleEffect = {
		onCheckFocus: (focus: boolean) => {
			if (!focus) return "hidden  group-hover:flex";
			return "flex";
		},
	};

	return (
		<DivWrapper className="absolute right-0  h-full flex items-center text-[1.4rem]" style={{ direction: "rtl" }}>
			<DivWrapper
				className={`
				${styleEffect.onCheckFocus(focus)} h-full  flex-col xl:flex-row items-center xl:gap-[2rem] `}
			>
				<ButtonNative
					className="text-textGray opacity-60 hover:opacity-100 hover:text-textHeader"
					tabIndex={-1}
					onClick={() => setLabel(true)}
					textContent="Add Label"
				/>

				<ButtonNative
					className="text-textGray opacity-60 hover:opacity-100 hover:text-textHeader"
					onClick={() => setTitle(true)}
					tabIndex={-1}
					textContent="Add Title"
				/>
			</DivWrapper>
		</DivWrapper>
	);
};

export default SectionLabelTitle;
