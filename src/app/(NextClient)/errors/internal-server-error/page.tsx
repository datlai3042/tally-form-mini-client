import Image from "next/image";
import React from "react";

const InternalServerErrorPage = () => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center gap-[6rem]">
			<Image
				src={"/assets/images/icon/errors/500.png"}
				width={50}
				height={50}
				alt="toast success"
				quality={100}
				className="min-w-[40rem] h-[40rem]"
				unoptimized={true}
			/>
			<div className="text-[4rem]  ">Server hiện đang gặp sự cố</div>
		</div>
	);
};

export default InternalServerErrorPage;
