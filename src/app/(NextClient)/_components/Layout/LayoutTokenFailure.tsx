import React from "react";

type TProps = {
	message: string;
};

const LayoutTokenFailure = (props: TProps) => {
	const { message } = props;

	return (
		<div className="relative inset-0 w-screen h-screen flex justify-center items-center">
			<p className="font-bold text-[3rem]">{message}</p>
		</div>
	);
};

export default LayoutTokenFailure;
