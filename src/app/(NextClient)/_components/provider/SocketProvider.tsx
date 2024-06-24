"use client";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { onAddNewNotification, onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import { addOneToastSuccess } from "@/app/_lib/redux/features/toast.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, Notification } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";
import { v4 as uunid } from "uuid";

const URL = process.env.NEXT_PUBLIC_MODE === "PRO" ? process.env.BACK_END_URL : "http://localhost:4000";
const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore);
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	useEffect(() => {
		const socket = io(URL!, { withCredentials: true });
		function onConnect() {
			setSocket(socket);
			dispatch(
				addOneToastSuccess({
					toast_item: {
						_id: uunid(),
						type: "SUCCESS",
						toast_title: "Socket",
						core: {
							message: `Kết nối socket thành công`,
						},
					},
				})
			);
			socket.emit("checkError", { error: "Ok" });
		}

		const socketNewForm = (dataSocket: {
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

			queryClient.invalidateQueries({
				queryKey: ["get-notification-type"],
			});
		};

		function onDisconnect() {}
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("add-new-reports", socketNewForm);

		socket.on("mai", (data) => console.log({ data }));

		socket.on("connect_error", (error) => {
			// the connection was denied by the server
			// in that case, `socket.connect()` must be manually called in order to reconnect
			console.error(error.message);
		});

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off(
				"add-new-notification",
				(data: { notification: { notifications: Notification.NotificationUser } }) => {
					const { notifications } = data.notification;
					dispatch(onFetchNotification({ notification: notifications.notifications, animation: true }));
				}
			);
		};
	}, []);

	useEffect(() => {
		console.log({ formAnswer });
	}, [formAnswer]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
export { SocketContext, SocketProvider };
