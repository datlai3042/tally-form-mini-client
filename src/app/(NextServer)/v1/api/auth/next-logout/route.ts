import Http from "@/app/_lib/http";
import AuthService from "@/app/_services/auth.service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(res: Request) {
	cookies().delete("next_access_token");

	cookies().delete("next_client_id");
	cookies().delete("next_refresh_token");
	cookies().delete("next_code_verify_token");

	return Response.json({ message: "OK" });
}
