import { ChevronsLeft } from "lucide-react";
import React from "react";
import { ButtonCustomProps } from "./Button";

export type TProps = {
	Icon: React.ReactNode;
} & Partial<ButtonCustomProps>;

const ButtonIcon = (props: TProps) => {
	const { textContent, Icon, ...buttonProps } = props;

	return (
		<button
			{...buttonProps}
			className={`${
				buttonProps.className || ""
			} min-w-[3rem] min-h-[3rem] w-max h-max flex justify-center items-center gap-[.5rem] `}
		>
			{textContent && textContent}
			{Icon}
		</button>
	);
};

export default ButtonIcon;
