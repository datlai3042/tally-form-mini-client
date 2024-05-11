import React from "react";

export interface DivNativeProps extends React.ComponentProps<"div"> {
	children?: React.ReactNode;
}

const DivNative = (props: DivNativeProps) => {
	const { children, ...nativeProps } = props;

	return <div {...nativeProps}>{children}</div>;
};

export default DivNative;
