import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { InputCore } from "@/type";
import { CircleAlert } from "lucide-react";
import React from "react";

type TProps = {
	type: InputCore.Commom.ErrorText;
	message: string;
};

const InputErrorMessage = (props: TProps) => {
	const { type, message } = props;

	return (
		<DivNative className="flex items-center gap-[1rem]">
			<CircleAlert className="text-red-800" />
			<span className="text-[1.4rem] text-red-800">
				Lỗi {`[${type}]`}: {message}
			</span>
		</DivNative>
	);
};

export default InputErrorMessage;
