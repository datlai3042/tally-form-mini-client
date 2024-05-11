import React from "react";

export interface ParagraphNativeProps extends React.ComponentProps<"p"> {
	textContent: string;
	children?: React.ReactNode;
}

const ParagraphNative = (props: ParagraphNativeProps) => {
	const { textContent, children, ...nativeProps } = props;

	return (
		<p {...nativeProps}>
			{textContent} {children}
		</p>
	);
};

export default ParagraphNative;
