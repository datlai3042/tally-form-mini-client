"use client";

import { redirect, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

import AuthService from "@/app/_services/auth.service";
import LayoutTokenFailure from "../_components/Layout/LayoutTokenFailure";
import LayoutRequestLoading from "../_components/Layout/LayoutRequestLoading";

const RefreshTokenPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const code_verify_token_sv = searchParams.get("code_verify_token");

	const pathName = searchParams.get("pathName");

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
		if (code_verify_token_cl === code_verify_token_sv) {
			AuthService.refreshTokenServer(signal).then(() => {
				// timer.current = setTimeout(() => {
				router.replace("/dashboard");
				router.refresh();
				// }, 2000);
			});
			return;
		} else {
			console.log("set-state");
			setError(true);
		}
		return () => {
			abort.abort();
		};
	}, [code_verify_token_sv, pathName, router]);

	if (error) return <LayoutTokenFailure message="Yêu cầu không hợp lệ, vui lòng quay về giao diện đăng nhập" />;
	return <LayoutRequestLoading message="Server đang xác thực lại một số thông tin" />;
};

export default RefreshTokenPage;
