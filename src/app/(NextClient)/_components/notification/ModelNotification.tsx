import { RootState } from "@/app/_lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import NotificationSystem from "./_notification_type/NotificationSystem";
import NotificationAccount from "./_notification_type/NotificationAccount";
import NotificationFormAnswers from "./_notification_type/NotificationFormAnswers";
import NotificationEmpty from "../_StatusCodeComponent/NotificationEmpty";

const ModelNotification = () => {
	const notifications = useSelector((state: RootState) => state.notification.notification);

	return (
		<div className="bg-[#222] text-[#fff] rounded-2xl w-[36rem]  text-[1.4rem] max-h-[50rem] flex flex-col  min-h-[4rem] h-max  border-[.1rem] border-gray-200 shadow-xl">
			<p className="my-[2.8rem]  px-[1.4rem] text-[1.6rem]">Thông báo</p>

			<div
				onClick={(e) => e.stopPropagation()}
				className="scroll-notification overflow-y-scroll pb-[1rem] flex flex-col gap-[.5rem] "
			>
				{notifications &&
					notifications.map((notification) => {
						if (notification.type === "System")
							return <NotificationSystem key={notification._id} notification_item={notification} />;
						if (notification.type === "Account")
							return <NotificationAccount key={notification._id} notification_item={notification} />;
						if (notification.type === "Form_Answers")
							return <NotificationFormAnswers key={notification._id} notification_item={notification} />;
					})}

				{notifications && notifications.length == 0 && <NotificationEmpty />}
			</div>
		</div>
	);
};

export default ModelNotification;
