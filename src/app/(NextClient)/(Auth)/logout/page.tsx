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
	const force = searchParams.get("force");
	console.log({ force });
	const router = useRouter();

	useEffect(() => {
		const abort = new AbortController();
		const signal = abort.signal;
		const localCodeJSON = localStorage.getItem("code_verify_token");

		const logoutFunction = async () => {
			await AuthService.logoutNextClient().catch(() => {
				setError(true);
				return;
			});
		};

		if (force === "true") {
			logoutFunction();
			return;
		}

		if (!localCodeJSON) {
			logoutFunction();
			return;
		}
		const localCode = JSON.parse(localCodeJSON || "");
		console.log({ localCode, force });
		// if (!localCode || !localCode) {
		// 	return;
		// }

		if (localCode === code_verify_token_sv) {
			logoutFunction();
			return;
		} else {
			console.log("set-state");
			setError(true);
		}
		return () => {
			abort.abort();
		};
	}, [code_verify_token_sv, router, force]);

	return <div>{error ? "Yêu cầu không hợp lệ" : "Đang xử lí"}</div>;
};

export default LogoutPage;
