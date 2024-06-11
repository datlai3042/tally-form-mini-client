import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { CircleAlert } from "lucide-react";
import React from "react";

type TProps = {
	message: string;
};

const InputErrorRequire = (props: TProps) => {
	const { message } = props;

	return (
		<DivNative className="flex items-center gap-[1rem]">
			<CircleAlert className="text-red-800" />
			<span className="text-[1.4rem] text-red-800">{message}</span>
		</DivNative>
	);
};

export default InputErrorRequire;
