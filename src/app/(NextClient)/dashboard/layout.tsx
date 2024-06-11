import { ResponseApi } from "@/app/_schema/api/response.shema";
import { UserType } from "@/app/_schema/user/user.type";
import AuthService from "@/app/_services/auth.service";
import UserService from "@/app/_services/user.service";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import React, { use } from "react";
import Http from "@/app/_lib/http";
import { object } from "zod";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(): Promise<Metadata> {
	const cookieStore = cookies();
	const client_id = cookieStore.get("next_client_id")?.value;
	const access_token = cookieStore.get("next_access_token")?.value;
	const refresh_token = cookieStore.get("next_refresh_token")?.value;
	const code_verify_token = cookieStore.get("next_code_verify_token")?.value;

	const res = await fetch(
		`${
			process.env.NEXT_PUBLIC_MODE === "DEV" ? "http://localhost:4000" : process.env.BACK_END_URL
		}/v1/api/account/me`,
		{
			credentials: "include",
			headers: {
				Cookie: `refresh_token=${refresh_token};access_token=${access_token};client_id=${client_id};code_verify_token=${code_verify_token}`,
				CodeVerifyToken: code_verify_token,
			} as HeadersInit,
		}
	);
	const data = (await res.json()) as ResponseApi<{ user: UserType }>;

	const { user } = data.metadata;

	if (!user) {
		redirect(`/logout?code_verify_token=${code_verify_token}`);
	}

	const fullName = user?.user_first_name + " " + user?.user_last_name;
	const imageAvatar = user?.user_avatar_current?.secure_url || user?.user_avatar_system;

	return {
		title: fullName || "Form Builder",
		icons: {
			icon: imageAvatar,
		},
	};
}

type TProps = {
	children: React.ReactNode;
};
const DashBoardLayout = async (props: TProps) => {
	return <div>{props.children}</div>;
};

export default DashBoardLayout;
