"use client";

import React from "react";

export interface ButtonNativeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent: string;
}

const ButtonNative = (props: ButtonNativeProps) => {
	const { textContent, ...buttonProps } = props;
	return (
		<button {...buttonProps} className={` ${buttonProps.className}`}>
			{textContent}
		</button>
	);
};

export default ButtonNative;
