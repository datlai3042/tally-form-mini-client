import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { SocketProvider } from "../_components/provider/SocketProvider";
import CheckExprireToken from "../_components/Layout/CheckExprireToken";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Http from "@/app/_lib/http";
import { ResponseApi } from "@/app/_schema/api/response.shema";
import { UserType } from "@/app/_schema/user/user.type";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
	const cookieStore = cookies();
	const client_id = cookieStore.get("next_client_id")?.value;
	const access_token = cookieStore.get("next_access_token")?.value;
	const refresh_token = cookieStore.get("next_refresh_token")?.value;
	const code_verify_token = cookieStore.get("next_code_verify_token")?.value;

	const res = await Http.get<ResponseApi<{ user: UserType }>>(`/v1/api/account/me`, {
		credentials: "include",
		headers: {
			Cookie: `refresh_token=${refresh_token};access_token=${access_token};client_id=${client_id};code_verify_token=${code_verify_token}`,
			CodeVerifyToken: code_verify_token,
		} as HeadersInit,
	});

	const { user } = res.metadata;

	const fullName = user?.user_first_name + " " + user?.user_last_name;
	const imageAvatar = user?.user_avatar_current?.secure_url || "/icon_core.png";
	console.log({ imageAvatar, user });

	return {
		title: fullName,
		icons: {
			icon: [
				{
					rel: "icon",
					type: "image/png",
					url: imageAvatar,
				},

				{
					rel: "icon",
					type: "image/ico",
					url: "/favicon.ico",
				},
			],
		},
	};
}

const UserAuthenticationPage = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<SocketProvider>
				{children}
				{/* <CheckExprireToken /> */}
			</SocketProvider>
		</>
	);
};

export default UserAuthenticationPage;
