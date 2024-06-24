import Image from "next/image";
import React from "react";

type TProps = {
	content?: string;
	gap?: string;
};

const NotFoundPage = (props: TProps) => {
	const { content = "Không tìm thấy thông tin", gap = "4rem" } = props;

	return (
		<div style={{ gap }} className="w-full h-full min-h-[40rem] flex flex-col items-center justify-center">
			<Image
				src={"/assets/images/icon/errors/404.png"}
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

export default NotFoundPage;
