"use client";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { onAddNewNotification, onFetchNotification } from "@/app/_lib/redux/features/notification.slice";
import { addOneToastFormAnswer, addOneToastSuccess } from "@/app/_lib/redux/features/toast.slice";
import { RootState } from "@/app/_lib/redux/store";
import { handleDataForm } from "@/app/_lib/utils";
import FormAnswerService from "@/app/_services/formAnswer.service";
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
			setSocketState(io(URL!, { withCredentials: true }));
			return;
		}
		function onConnect() {
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
		const socketStateNewForm = (dataSocket: {
			form_answer_id: string;
			form_answer_item_id: string;
			notification: { notifications: Notification.NotificationUser["notifications"] };
			notification_item_id: string;
			form_origin: FormCore.Form;
		}) => {
			console.log({ dataSocket });
			const { form_answer_id, notification, notification_item_id, form_origin, form_answer_item_id } = dataSocket;
			dispatch(onFetchNotification({ notification: notification.notifications, animation: true }));
			dispatch(onAddNewNotification({ notification_item_id }));
			dispatch(
				addOneToastFormAnswer({
					toast_item: {
						_id: uunid(),
						type: "FormAnswer",
						toast_title: "Bạn nhận được 1 phiếu trả lời",
						core: {
							message: `Bạn nhận được 1 phản hồi từ Form [${form_origin.form_title.form_title_value}]`,
							url: `/form/${form_origin._id}/summary#${form_answer_item_id}`,
						},
					},
				})
			);
			FormAnswerService.getFormAnswer(form_origin._id).then((data) => {
				const { formAnswer } = data.metadata;
				dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));

				const { reports } = formAnswer;
				const arrayReserver = [...reports];
				console.log("dispatch api");

				const OK = handleDataForm(arrayReserver.reverse(), formAnswer.form_id);
			});
			queryClient.invalidateQueries({
				queryKey: ["get-notification-type"],
			});
		};
		if (socketState) {
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

		function onDisconnect() {
			console.log("OK");
		}
		return () => {
			socketState.off("connect", onConnect);
			socketState.off("disconnect", onDisconnect);
			socketState.off("add-new-notification", socketStateNewForm);
		};
	}, [socketState]);

	return <SocketContext.Provider value={socketState}>{children}</SocketContext.Provider>;
};
export { SocketContext, SocketProvider };
