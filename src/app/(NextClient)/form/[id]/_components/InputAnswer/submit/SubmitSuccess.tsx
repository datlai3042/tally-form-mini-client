import React from "react";

type TProps = {
	message?: string;
	color: string;
};

const SubmitSuccess = (props: TProps) => {
	const { message = "Câu trả lời của bạn đã được ghi lại", color } = props;

	return (
		<div
			style={{ color: color }}
			className="w-full min-h-[14rem] h-max flex items-center justify-center text-[2rem] font-bold bg-[#ffffff] rounded-lg"
		>
			{message}
		</div>
	);
};

export default SubmitSuccess;
