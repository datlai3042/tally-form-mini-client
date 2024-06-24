import Image from "next/image";
import React from "react";

const NotificationEmpty = () => {
	return (
		<div className="w-full min-h-[40rem] h-full flex flex-col items-center justify-center gap-[4rem]">
			<Image
				src={"/assets/images/icon/notification_empty.png"}
				width={200}
				height={200}
				alt="logo"
				className="w-[20rem] h-[20rem]"
			/>
			<p className="text-[2rem]">Danh sách thông báo hiện đang trống</p>
		</div>
	);
};

export default NotificationEmpty;
