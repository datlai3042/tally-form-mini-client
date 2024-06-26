import Image from "next/image";
import React from "react";

type TProps = {
	content?: string;
	gap?: string;
};

const FormAnswerEmpty = (props: TProps) => {
	const { content = "Form này không có thông tin", gap = "4rem" } = props;

	return (
		<div style={{ gap }} className="w-screen h-screen min-h-[40rem] flex flex-col items-center justify-center">
			<Image
				src={"/assets/images/icon/form_answer/form_empty.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[30rem] h-[30rem]"
				unoptimized={true}
			/>
			<div className="text-[4rem]">{content.toUpperCase()}</div>
		</div>
	);
};

export default FormAnswerEmpty;
