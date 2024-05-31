import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { CircleAlert } from "lucide-react";
import React from "react";

const InputErrorRequire = () => {
	return (
		<DivNative className="flex items-center gap-[1rem]">
			<CircleAlert className="text-red-800" />
			<span className="text-[1.4rem] text-red-800">Đây là một câu hỏi bắt buộc</span>
		</DivNative>
	);
};

export default InputErrorRequire;
