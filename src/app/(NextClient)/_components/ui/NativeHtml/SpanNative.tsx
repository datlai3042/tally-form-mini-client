import React from "react";

export interface SpanNativeProps extends React.ComponentProps<"span"> {
	textContent: string;
}

const SpanNative = (props: SpanNativeProps) => {
	const { textContent, ...spanNativeProps } = props;

	return <span {...spanNativeProps}>{textContent}</span>;
};

export default SpanNative;
