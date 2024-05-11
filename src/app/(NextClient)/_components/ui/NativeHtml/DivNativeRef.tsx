/* eslint-disable react/display-name */
import React, { forwardRef } from "react";

export interface DivNativeRefProps extends React.ComponentProps<"div"> {
	children?: React.ReactNode;
}
export type Ref = HTMLDivElement;

const DivNativeRef = forwardRef<Ref, DivNativeRefProps>((props, ref) => {
	const { children, ...nativeProps } = props;

	return (
		<div {...nativeProps} ref={ref}>
			{children}
		</div>
	);
});

export default DivNativeRef;
