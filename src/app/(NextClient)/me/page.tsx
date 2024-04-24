import Http from "@/app/_lib/http";
import { ResponseApi } from "@/app/_schema/api/response.shema";
import { UserType } from "@/app/_schema/user/user.type";
import UserService from "@/app/_services/user.service";
import { cookies, headers } from "next/headers";
import React from "react";

//Không export tào lào trong component

const ProfileMe = async () => {
	let me: any = {};
	let res: any;
	const cookieStore = cookies();
	const client_id = cookieStore.get("client_id")?.value;
	const access_token = cookieStore.get("access_token")?.value;
	const refresh_token = cookieStore.get("refresh_token")?.value;
	const headersList = headers();

	const header_url = headersList.get("x-url") || "";

	console.log({ header_url });
	// try {
	res = await Http.get<ResponseApi<{ user: UserType }>>("/v1/api/account/me", {
		credentials: "include",
		headers: {
			Cookie: `refresh_token=${refresh_token};access_token=${access_token};client_id=${client_id}`,
		},
		pathName: header_url,
	});
	me = res!.metadata.user;
	// } catch (error) {}

	return <div>Me: {JSON.stringify(res) || "none"}</div>;
};

export default ProfileMe;
