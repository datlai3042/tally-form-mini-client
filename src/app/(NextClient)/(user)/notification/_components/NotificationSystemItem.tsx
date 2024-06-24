import { onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import useDeleteNotificationItem from "@/app/hooks/notifications/useDeleteNotificationItem";
import { Notification } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import NotificationItemWrapper from "./NotificationItemWrapper";

type TProps = {
	notification_item: Notification.System.NotificationSystem;
};

const NotificationSystemItem = (props: TProps) => {
	const dispatch = useDispatch();
	const queryclient = useQueryClient();

	const { notification_item } = props;
	const deleteNotificationItem = useDeleteNotificationItem();
	const onDeleteNotificationItem = () => {
		deleteNotificationItem.mutate({ notification_id: notification_item._id });
	};

	useEffect(() => {
		if (deleteNotificationItem.isSuccess) {
			const { notifications } = deleteNotificationItem.data.metadata.notification_user;
			queryclient.invalidateQueries({
				queryKey: ["get-notification-type"],
			});
			dispatch(onFetchNotification({ notification: notifications }));
		}
	}, [deleteNotificationItem.isSuccess]);

	return (
		<NotificationItemWrapper callbackDelete={onDeleteNotificationItem}>
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
		</NotificationItemWrapper>
	);
};

export default NotificationSystemItem;
