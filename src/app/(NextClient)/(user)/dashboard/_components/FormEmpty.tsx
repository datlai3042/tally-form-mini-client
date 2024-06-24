import Image from "next/image";
import React from "react";

type TProps = {
	content?: string;
	gap?: string;
};

const FormEmpty = (props: TProps) => {
	const { content = "Bạn chưa tạo form, hãy tạo thử nhé", gap = "4rem" } = props;

	return (
		<div style={{ gap }} className="w-full h-full min-h-[40rem] flex flex-col items-center justify-center">
			<Image
				src={"/assets/images/icon/form/empty.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[30rem] h-[30rem]"
				unoptimized={true}
			/>
			<div className="text-[4rem]">{content}</div>
		</div>
	);
};

export default FormEmpty;
