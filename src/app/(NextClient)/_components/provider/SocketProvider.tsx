"use client";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { onAddNewNotification, onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import { addOneToastSuccess } from "@/app/_lib/redux/features/toast.slice";
import { RootState } from "@/app/_lib/redux/store";
import { handleDataForm } from "@/app/_lib/utils";
import { FormCore, Notification } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { v4 as uunid } from "uuid";

const URL = process.env.NEXT_PUBLIC_MODE === "PRO" ? process.env.BACK_END_URL : "http://localhost:4000";
const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socketState, setSocketState] = useState<Socket | null>(null);
	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	useEffect(() => {
		if (socketState === null) {
			console.log("ok");
			setSocketState(io(URL!, { withCredentials: true }));
			return;
		}
		function onConnect() {
			console.log("connect");

			dispatch(
				addOneToastSuccess({
					toast_item: {
						_id: uunid(),
						type: "SUCCESS",
						toast_title: "Socket",
						core: {
							message: `Kết nối socketState thành công`,
						},
					},
				})
			);
			socketState!.emit("checkError", { error: "Ok" });
		}
		if (socketState) {
			const socketStateNewForm = (dataSocket: {
				formAnswer: FormCore.FormAnswer.FormAnswerCore;
				notification: { notifications: Notification.NotificationUser["notifications"] };
				notification_item_id: string;
				form_origin: FormCore.Form;
			}) => {
				const { formAnswer, notification, notification_item_id, form_origin } = dataSocket;
				console.log({ dataSocket });
				dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));
				dispatch(onFetchNotification({ notification: notification.notifications, animation: true }));
				dispatch(onAddNewNotification({ notification_item_id }));
				dispatch(
					addOneToastSuccess({
						toast_item: {
							_id: uunid(),
							type: "SUCCESS",
							toast_title: "Bạn nhận được 1 phiếu trả lời",
							core: {
								message: `Bạn nhận được 1 phản hồi từ Form [${form_origin.form_title.form_title_value}]`,
							},
						},
					})
				);

				handleDataForm(formAnswer.reports, formAnswer.form_id);

				queryClient.invalidateQueries({
					queryKey: ["get-notification-type"],
				});
			};

			socketState.on("connect", onConnect);
			socketState.on("disconnect", onDisconnect);
			socketState.on("add-new-reports", socketStateNewForm);

			socketState.on("mai", (data) => console.log({ data }));

			socketState.on("connect_error", (error) => {
				// the connection was denied by the server
				// in that case, `socketState.connect()` must be manually called in order to reconnect
				console.error(error.message);
			});
		}

		function onDisconnect() {}
		return () => {
			socketState.off("connect", onConnect);
			socketState.off("disconnect", onDisconnect);
			socketState.off(
				"add-new-notification",
				(data: { notification: { notifications: Notification.NotificationUser } }) => {
					const { notifications } = data.notification;
					dispatch(onFetchNotification({ notification: notifications.notifications, animation: true }));
				}
			);
		};
	}, [socketState]);

	return <SocketContext.Provider value={socketState}>{children}</SocketContext.Provider>;
};
export { SocketContext, SocketProvider };
