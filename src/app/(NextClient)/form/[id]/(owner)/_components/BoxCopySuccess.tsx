import { Check } from "lucide-react";
import React from "react";

type TProps = {
	message: string;
};

const BoxCopySuccess = (props: TProps) => {
	const { message } = props;

	return (
		<div className="w-max min-h-[3rem] flex items-center gap-[1rem] border-[.1rem] border-slate-400 bg-[#ffffff] px-[2rem] rounded-lg">
			{message}
			<Check size={16} />
		</div>
	);
};

export default BoxCopySuccess;
