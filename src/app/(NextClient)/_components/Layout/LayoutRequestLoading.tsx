import React from "react";

type TProps = {
	message: string;
};

const LayoutRequestLoading = (props: TProps) => {
	const { message } = props;

	return (
		<div className="relative inset-0 flex justify-center items-center">
			<p className="font-bold text-[4rem]">{message}</p>
		</div>
	);
};

export default LayoutRequestLoading;
