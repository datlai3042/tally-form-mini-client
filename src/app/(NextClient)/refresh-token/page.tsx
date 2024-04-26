"use client";

import Http, { clientToken } from "@/app/_lib/http";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import { abort } from "process";
import { TokenNextSync } from "@/type";
import { useQuery } from "@tanstack/react-query";
import AuthService from "@/app/_services/auth.service";
import { ResponseAuth } from "@/app/_schema/api/response.shema";
import LayoutTokenFailure from "../_components/Layout/LayoutTokenFailure";
import LayoutRequestLoading from "../_components/Layout/LayoutRequestLoading";

const RefreshTokenPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathName = searchParams.get("pathName");
	const code_verify_token_sv = searchParams.get("code_verify_token");

	const [error, setError] = useState(false);

	useEffect(() => {
		const abort = new AbortController();
		const signal = abort.signal;

		const codeLocal = localStorage.getItem("code_verify_token");
		const code_verify_token_cl = codeLocal ? JSON.parse(codeLocal) : "";

		if (!code_verify_token_cl) {
			setError(true);
			return;
		}
		console.log({ code_verify_token_cl, code_verify_token_sv });
		if (code_verify_token_cl === code_verify_token_sv) {
			AuthService.refreshToken(signal).then(() => {
				router.refresh();
				router.push(pathName || "/");
			});
		} else {
			console.log("set-state");
			setError(true);
		}
		return () => {
			abort.abort();
		};
	}, []);

	if (error) return <LayoutTokenFailure message="Yêu cầu không hợp lệ" />;
	return <LayoutRequestLoading message="Đang xử lí" />;
};

export default RefreshTokenPage;
