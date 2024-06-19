"use client";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketProvider } from "../_components/provider/SocketProvider";
import CheckExprireToken from "../_components/Layout/CheckExprireToken";

const UserAuthenticationPage = ({ children }: { children: React.ReactNode }) => {
	return (
		<SocketProvider>
			{children}
			{/* <CheckExprireToken /> */}
		</SocketProvider>
	);
};

export default UserAuthenticationPage;
