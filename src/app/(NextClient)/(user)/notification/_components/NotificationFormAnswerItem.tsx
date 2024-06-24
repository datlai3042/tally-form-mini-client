import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import useInfoFormNotification from "@/app/hooks/notifications/useInfoFormNotification";
import { Notification } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import NotificationItemWrapper from "./NotificationItemWrapper";
import useDeleteNotificationItem from "@/app/hooks/notifications/useDeleteNotificationItem";
import { onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import { useDispatch } from "react-redux";
type TProps = {
	notification_item: Notification.FormAnswers.NotificationFormAnswers;
};

const NotificationFormAnswerItem = (props: TProps) => {
	const { notification_item } = props;
	const queryClient = useQueryClient();
	const dispatch = useDispatch();

	const infoFormNotification = useInfoFormNotification({
		form_id: notification_item.core.form_id,
		active: true,
		notification_id: notification_item._id,
	});

	let image_src =
		infoFormNotification.data?.metadata.form?.form_avatar?.form_avatar_url ||
		infoFormNotification.data?.metadata.form?.form_setting_default.form_avatar_default_url;
	let titleForm = infoFormNotification.data?.metadata.form?.form_title.form_title_value;

	const deleteNotificationItem = useDeleteNotificationItem();
	const onDeleteNotificationItem = () => {
		deleteNotificationItem.mutate({ notification_id: notification_item._id });
	};

	useEffect(() => {
		if (deleteNotificationItem.isSuccess) {
			const { notifications } = deleteNotificationItem.data.metadata.notification_user;
			queryClient.invalidateQueries({
				queryKey: ["get-notification-type"],
			});
			dispatch(onFetchNotification({ notification: notifications }));
		}
	}, [deleteNotificationItem.isSuccess]);
	return (
		<NotificationItemWrapper callbackDelete={onDeleteNotificationItem}>
			{image_src ? (
				<Image
					src={image_src}
					width={50}
					height={50}
					alt="avatar form"
					className="min-w-[6rem] h-[6rem] rounded-full"
				/>
			) : (
				<div className="w-[6rem] h-[6rem] rounded-full">
					<LoadingArea />
				</div>
			)}
			<div className="w-[80%]  flex flex-col gap-[1rem] text-[1.4rem] leading-10">
				<div className="h-max flex flex-wrap gap-[1rem] text-left break-words max-w-full">
					<span className="font-bold">Tin nhắn: </span>
					{titleForm ? (
						<span> Form [{titleForm}] của </span>
					) : (
						<div className="w-[3rem] h-[2rem]">
							<LoadingArea />
						</div>
					)}
					<span className="h-max ">{notification_item.core.message}</span>
				</div>
				<span className="text-left">
					Thời gian: {moment(new Date(notification_item.create_time)).format("hh:mm Do MMMM YYYY")}
				</span>
				<Link
					href={`/form/${notification_item.core.form_id}/summary#${notification_item.core.form_answer_id}`}
					className="text-left bg-blue-600 text-[#fff] p-[.5rem] rounded-lg w-max"
				>
					Xem chi tiết
				</Link>
			</div>
		</NotificationItemWrapper>
	);
};

export default NotificationFormAnswerItem;
