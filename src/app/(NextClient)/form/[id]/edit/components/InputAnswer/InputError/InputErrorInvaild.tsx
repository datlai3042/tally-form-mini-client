import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { CircleAlert } from "lucide-react";
import React from "react";

type TProps = {
	messageErorr: string;
};

const InputErrorInvaild = (props: TProps) => {
	const { messageErorr } = props;

	return (
		<DivNative className="flex items-center gap-[1rem]">
			<CircleAlert className="text-red-800" />
			<span className="text-[1.4rem] text-red-800">{messageErorr}</span>
		</DivNative>
	);
};

export default InputErrorInvaild;
