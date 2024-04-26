import Http from "@/app/_lib/http";
import { cookies } from "next/headers";

export async function POST() {
	const access_token = cookies().get("next_acccess_token")?.value;

	cookies().delete("next_access_token");

	cookies().delete("next_client_id");
	cookies().delete("next_refresh_token");
	cookies().delete("next_code_verify_token");

	return Response.json({ message: "next client logout thành công" });
}
