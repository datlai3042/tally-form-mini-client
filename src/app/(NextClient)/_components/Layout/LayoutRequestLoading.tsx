import React from "react";
import LoadingSpinner from "../ui/loading/LoadingSpinner";

type TProps = {
	message: string;
};

const LayoutRequestLoading = (props: TProps) => {
	const { message } = props;

	return (
		<div className="relative inset-0 w-screen h-screen px-[2rem] flex justify-center items-center gap-[4rem]">
			<LoadingSpinner color="#000" />
			<p className="font-bold text-[3rem]">{message}</p>
		</div>
	);
};

export default LayoutRequestLoading;
