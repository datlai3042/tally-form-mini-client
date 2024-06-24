"use client";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";

type TProps = {
	children: React.ReactNode;
};

const AppProvider = (props: TProps) => {
	const { children } = props;
	useEffect(() => {
		console.log(
			"%cXin chào mình là Lại Huỳnh Phát Đạt, đây là dự án cá nhân mình tự viết rất mong được mọi người góp ý",
			`color:#64aaa8;font-size:20px;`
		);
	}, []);

	return <div className="">{children}</div>;
};

export default AppProvider;
