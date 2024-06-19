import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

const URL = process.env.NEXT_PUBLIC_MODE === "pro" ? process.env.BACK_END_URL : "http://localhost:4000";
const SocketContext = createContext<Socket | null>(null);

const SocketProvider = ({ children }: { children: React.ReactNode }) => {
	const [socket, setSocket] = useState<Socket | null>(null);
	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore);
	const dispatch = useDispatch();

	useEffect(() => {
		const socket = io(URL!, { withCredentials: true });
		function onConnect() {
			setSocket(socket);
			console.log("123");
			socket.emit("checkError", { error: "Ok" });
		}

		function onDisconnect() {}
		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);
		socket.on("add-new-reports", (dataSocket: { type: string; formAnswer: FormCore.FormAnswer.FormAnswerCore }) => {
			const { formAnswer, type } = dataSocket;
			console.log({ dataSocket });
			dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));
		});

		socket.on("mai", (data) => console.log({ data }));

		socket.on("connect_error", (error) => {
			// the connection was denied by the server
			// in that case, `socket.connect()` must be manually called in order to reconnect
			console.error(error.message);
		});

		return () => {
			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
		};
	}, []);

	useEffect(() => {
		console.log({ formAnswer });
	}, [formAnswer]);

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
export { SocketContext, SocketProvider };
