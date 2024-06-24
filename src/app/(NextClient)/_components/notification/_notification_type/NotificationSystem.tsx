import { Notification } from "@/type";
import moment from "moment";
import Image from "next/image";
import React from "react";

type TProps = {
	notification_item: Notification.System.NotificationSystem;
};

const NotificationSystem = (props: TProps) => {
	const { notification_item } = props;

	return (
		<div className=" my-[2rem] h-max px-[1.4rem] flex  gap-[1rem] ">
			<Image
				src={"/assets/images/icon/system.png"}
				width={50}
				height={50}
				alt="avatar form"
				className="min-w-[6rem] h-[6rem] rounded-full"
			/>

			<div className="w-[80%]  flex flex-col gap-[1rem] text-[1.4rem] leading-10">
				<p className="text-left">Thông báo hệ thống</p>
				<p className="h-max text-left break-words max-w-full">
					<span className="font-bold">Tin nhắn: </span>

					<span className="h-max ">{notification_item.core.message}</span>
				</p>
				<span className="text-left">
					Thời gian: {moment(new Date(notification_item.create_time)).format("hh:mm Do MMMM YYYY")}
				</span>
			</div>
		</div>
	);
};

export default NotificationSystem;
