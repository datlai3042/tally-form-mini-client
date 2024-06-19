import React from "react";

type TProps = {
	color: string;
};

const LoadingSpinner = (props: TProps) => {
	const { color } = props;

	return (
		<div
			style={{
				borderTopColor: color,
				borderRightColor: color,
				borderLeftColor: "transparent",
				borderBottomColor: "transparent",
			}}
			className="inline-block h-8 w-8 animate-spin rounded-full border-[.3rem] border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
			role="status"
		></div>
	);
};

export default LoadingSpinner;
