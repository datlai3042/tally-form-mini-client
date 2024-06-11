"use client";
import { clientToken } from "@/app/_lib/http";
import { socket } from "@/app/_lib/socket";

import React, { useEffect, useRef, useState } from "react";

type TProps = {
	children: React.ReactNode;
};

const AppProvider = (props: TProps) => {
	const { children } = props;
	const count = useRef(1);
	console.log({ message: "re-render when token onChange" });

	console.log(count.current);
	count.current += 1;

	useEffect(() => {
		socket.on("connect", () => console.log("ok"));
		socket.on("disconnect", () => console.log("ok"));
		socket.on("foo", () => console.log("ok"));

		return () => {
			socket.off("connect", () => console.log("ok"));
			socket.off("disconnect", () => console.log("ok"));
			socket.off("foo", () => console.log("ok"));
		};
	}, []);

	return <div className="">{children}</div>;
};

export default AppProvider;
