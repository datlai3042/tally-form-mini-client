import useInfoFormNotification from "@/app/hooks/notifications/useInfoFormNotification";
import { Notification } from "@/type";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import LoadingArea from "../../ui/loading/LoadingArea";
import { useIntersection } from "@mantine/hooks";
import ModelOneOption from "../../Model/ModelOneOption";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
type TProps = {
	notification_item: Notification.FormAnswers.NotificationFormAnswers;
};

const NotificationFormAnswers = (props: TProps) => {
	const { notification_item } = props;
	const containerRef = useRef<HTMLDivElement>(null);
	const new_notification = useSelector((state: RootState) => state.notification.new_notification);

	const { ref, entry } = useIntersection({
		root: containerRef.current,
		threshold: 1,
	});

	const infoFormNotification = useInfoFormNotification({
		form_id: notification_item.core.form_id,
		active: entry?.isIntersecting || false,
		notification_id: notification_item._id,
	});

	let image_src =
		infoFormNotification.data?.metadata.form?.form_avatar?.form_avatar_url ||
		infoFormNotification.data?.metadata.form?.form_setting_default.form_avatar_default_url;
	let titleForm = infoFormNotification.data?.metadata.form?.form_title.form_title_value;

	return (
		<div className=" my-[2rem] h-max px-[1.4rem] flex  gap-[1rem] " ref={ref}>
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
				<div className="h-max text-left break-words max-w-full">
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
				<div className="flex items-center gap-[2rem]">
					<Link
						href={`/form/${notification_item.core.form_id}/summary#${notification_item.core.form_answer_id}`}
						className="text-left bg-blue-600 text-[#fff] p-[.5rem] rounded-lg w-max"
					>
						Xem chi tiết
					</Link>
					{new_notification.includes(notification_item._id) && (
						<div className=" flex items-center gap-[1rem]">
							<span>Thông báo mới</span>
							<div className="w-[1rem] h-[1rem] bg-blue-700 rounded-full"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NotificationFormAnswers;
