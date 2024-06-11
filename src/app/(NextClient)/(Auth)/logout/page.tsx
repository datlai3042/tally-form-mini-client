"use client";
import Http from "@/app/_lib/http";
import AuthService from "@/app/_services/auth.service";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { object } from "zod";

const LogoutPage = () => {
	const [error, setError] = useState(false);

	const searchParams = useSearchParams();
	const code_verify_token_sv = searchParams.get("code_verify_token");

	const router = useRouter();

	useEffect(() => {
		const abort = new AbortController();
		const signal = abort.signal;

		const codeLocal = localStorage.getItem("code_verify_token");
		const code_verify_token_cl = codeLocal ? JSON.parse(codeLocal) : "";

		const logoutFunction = async () => {
			await AuthService.logoutNextClient();
			await Http.post("/v1/api/auth/next-logout", object, { baseUrl: "" });
			window.location.href = "/login";
		};

		console.log("OKKK", code_verify_token_cl, code_verify_token_sv);

		if (!codeLocal) {
			logoutFunction();
			return;
		}

		if (!code_verify_token_cl) {
			setError(true);
			return;
		}

		if (code_verify_token_cl === code_verify_token_sv) {
			logoutFunction();
		} else {
			console.log("set-state");
			setError(true);
		}
		return () => {
			abort.abort();
		};
	}, [code_verify_token_sv, router]);

	return <div>LogoutPage</div>;
};

export default LogoutPage;
