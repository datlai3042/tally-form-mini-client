"use client";

import React from "react";

export interface ButtonNativeProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent: string;
	children?: React.ReactNode;
}

const ButtonNative = (props: ButtonNativeProps) => {
	const { textContent, children, ...buttonProps } = props;
	return (
		<button {...buttonProps} className={` ${buttonProps.className}`}>
			{textContent}
			{children}
		</button>
	);
};

export default ButtonNative;
