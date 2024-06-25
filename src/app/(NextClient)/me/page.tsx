import Http from "@/app/_lib/http";
import { ResponseApi } from "@/app/_schema/api/response.shema";
import { UserType } from "@/app/_schema/user/user.type";
import AuthService from "@/app/_services/auth.service";
import UserService from "@/app/_services/user.service";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

//Không export tào lào trong component

const ProfileMe = async () => {
	let me: any = {};
	let res: any;
	const cookieStore = cookies();
	const client_id = cookieStore.get("next_client_id")?.value;
	const access_token = cookieStore.get("next_access_token")?.value;
	const refresh_token = cookieStore.get("next_refresh_token")?.value;
	const code_verify_token = cookieStore.get("next_code_verify_token")?.value;

	if (!client_id || !access_token || !refresh_token || !code_verify_token) {
		await AuthService.logoutNextServer({
			headers: {
				Cookie: `code_verify_token=${code_verify_token};force=true`,
			} as HeadersInit,
		});
		redirect("/login");
	}

	const headersList = headers();

	const header_url = headersList.get("x-url") || "";

	// try {
	res = await Http.get<ResponseApi<{ user: UserType }>>("/v1/api/account/me", {
		credentials: "include",
		headers: {
			Cookie: `refresh_token=${refresh_token};access_token=${access_token};client_id=${client_id};code_verify_token=${code_verify_token}`,
			CodeVerifyToken: code_verify_token,
		} as HeadersInit,
		pathName: header_url,
	});
	me = res!.metadata.user;

	return <div>Me: {JSON.stringify(res) || "none"}</div>;
};

export default ProfileMe;
