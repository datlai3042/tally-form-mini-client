import useGetNotificationType from "@/app/hooks/notifications/useGetNotificationType";
import useGetListFormDelete from "@/app/hooks/useGetListFormDelete";
import { Notification } from "@/type";
import React, { useState } from "react";
import NotificationShow from "./NotificationShow";

export type NotificationMode = "All" | Notification.Type.Common;

const NotificationMode = () => {
	const [modeNotification, setModeNotification] = useState<NotificationMode>("All");

	const getNotificationType = useGetNotificationType(modeNotification);

	const styleEffect = {
		onActiveRequireWrapper: (checked: boolean) => {
			if (checked) return "bg-blue-400";
			return "bg-gray-100";
		},
		onActiveRequireCircle: (checked: boolean) => {
			if (checked) return "right-0";
			return " left-0";
		},
	};

	const increasePage = () => {
		getNotificationType.fetchNextPage();
	};

	const descreasePage = () => {
		getNotificationType.fetchPreviousPage();
	};

	return (
		<div className="flex flex-col gap-[4rem]">
			<div className="flex flex-col xl:flex-row gap-[2rem]">
				<button
					onClick={() => setModeNotification("All")}
					className="bg-stone-400 w-full xl:w-[20%] h-[8rem] p-[1rem] flex flex-col justify-start gap-[1rem] text-[#fff] text-[1.4rem]"
				>
					<span>Tất cả thông báo</span>
					<div
						className={`${styleEffect.onActiveRequireWrapper(
							modeNotification === "All"
						)} relative w-[5rem] h-[2rem] flex items-center rounded-2xl`}
					>
						<div
							className={`${styleEffect.onActiveRequireCircle(
								modeNotification === "All"
							)} absolute bg-blue-200 w-[2rem] h-[2rem] rounded-full  `}
						></div>
					</div>
				</button>

				<button
					onClick={() => setModeNotification("Form_Answers")}
					className="bg-teal-700 w-full xl:w-[20%] h-[8rem] p-[1rem] flex flex-col justify-start gap-[1rem] text-[#fff] text-[1.4rem]"
				>
					<span>Thông báo form</span>
					<div
						className={`${styleEffect.onActiveRequireWrapper(
							modeNotification === "Form_Answers"
						)} relative w-[5rem] h-[2rem] flex items-center rounded-2xl`}
					>
						<div
							className={`${styleEffect.onActiveRequireCircle(
								modeNotification === "Form_Answers"
							)} absolute bg-blue-200 w-[2rem] h-[2rem] rounded-full  `}
						></div>
					</div>
				</button>
				<button
					onClick={() => setModeNotification("System")}
					className="bg-green-400 w-full xl:w-[20%] h-[8rem] p-[1rem] flex flex-col justify-start gap-[1rem] text-[#fff] text-[1.4rem]"
				>
					<span>Thông báo hệ thống</span>
					<div
						className={`${styleEffect.onActiveRequireWrapper(
							modeNotification === "System"
						)} relative w-[5rem] h-[2rem] flex items-center rounded-2xl`}
					>
						<div
							className={`${styleEffect.onActiveRequireCircle(
								modeNotification === "System"
							)} absolute bg-blue-200 w-[2rem] h-[2rem] rounded-full  `}
						></div>
					</div>
				</button>

				<button
					onClick={() => setModeNotification("Account")}
					className="bg-red-400  w-full xl:w-[20%] h-[8rem] p-[1rem] flex flex-col justify-start gap-[1rem] text-[#fff] text-[1.4rem]"
				>
					<span>Thông báo tài khoản</span>
					<div
						className={`${styleEffect.onActiveRequireWrapper(
							modeNotification === "Account"
						)} relative w-[5rem] h-[2rem] flex items-center rounded-2xl`}
					>
						<div
							className={`${styleEffect.onActiveRequireCircle(
								modeNotification === "Account"
							)} absolute bg-blue-200 w-[2rem] h-[2rem] rounded-full  `}
						></div>
					</div>
				</button>
			</div>

			<NotificationShow
				isLoading={getNotificationType.isLoading}
				isNextPage={getNotificationType.hasNextPage}
				notification_data={
					getNotificationType.data?.pages.flatMap((data) => data.metadata.notification_user.notifications) ||
					[]
				}
				nextPageCallback={increasePage}
			/>
		</div>
	);
};

export default NotificationMode;
