import { expiresToken } from "@/app/_lib/utils";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export async function POST(request: Request) {
	const { access_token, refresh_token, client_id, expireToken, code_verify_token } = await request.json();
	const expiresRT = new Date(expireToken).getTime();
	cookies().set({
		name: "client_id",
		value: client_id,
		httpOnly: true,
		path: "/",
		expires: expiresRT,
	});

	cookies().set({
		name: "code_verify_token",
		value: code_verify_token,
		httpOnly: true,
		path: "/",
		expires: expiresRT,
	});

	cookies().set({
		name: "access_token",
		value: access_token,
		httpOnly: true,
		path: "/",
		expires: expiresRT,
	});

	cookies().set({
		name: "refresh_token",
		value: refresh_token,
		httpOnly: true,
		path: "/",
		expires: expiresRT,
	});

	cookies().set({
		name: "flag",
		value: "yes",
		httpOnly: true,
		path: "/",
		expires: expiresRT,
	});

	return Response.json({ access_token, refresh_token, client_id, expireToken, expiresRT });
}
