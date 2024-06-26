import { RootState } from "@/app/_lib/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NotificationSystem from "./_notification_type/NotificationSystem";
import NotificationAccount from "./_notification_type/NotificationAccount";
import NotificationFormAnswers from "./_notification_type/NotificationFormAnswers";
import NotificationEmpty from "../_StatusCodeComponent/NotificationEmpty";

const ModelNotification = () => {
	const notifications = useSelector((state: RootState) => state.notification.notification);

	useEffect(() => {
		document.body.style.overflow = "hidden";
		return () => {
			document.body.style.overflow = "scroll";
		};
	}, []);

	return (
		<div className="bg-[#fff] text-[#000] rounded-3xl w-[46rem]  text-[1.4rem] max-h-[50rem] flex flex-col gap-[1.4rem] min-h-[4rem] h-max p-[3rem]  shadow-xl">
			<p className="text-left text-[1.6rem]">Thông báo</p>

			<div
				onClick={(e) => e.stopPropagation()}
				className="scroll-hidden overflow-y-scroll pb-[1rem] flex flex-col gap-[.5rem] "
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
