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

const RefreshTokenPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const pathName = searchParams.get("pathName");
	const code_verify_token_sv = searchParams.get("code_verify_token");

	const [error, setError] = useState(false);

	let code_verify_token_cl = "";
	if (typeof window !== "undefined") {
		code_verify_token_cl = JSON.parse(localStorage.getItem("code_verify_token") || "");
	}
	// const refreshTokenQuery = useQuery({
	// 	queryKey: ["/refresh-token"],
	// 	queryFn: () => AuthService.refreshToken(signal),
	// });

	// useEffect(() => {
	// 	if (refreshTokenQuery.isSuccess) {
	// 		console.log("success");
	// 		router.push(pathName || "");
	// 	}

	// 	return () => {
	// 		// router.refresh();
	// 		abort.abort();
	// 	};
	// }, [router, pathName, refreshTokenQuery.isSuccess]);

	console.log({ code_verify_token_cl, code_verify_token_sv });

	useEffect(() => {
		const abort = new AbortController();
		const signal = abort.signal;
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

	if (error) return <div>Yêu cầu không hợp lệ</div>;
	return <div className="flex flex-col gap-10 ">Đang xử lí</div>;
};

export default RefreshTokenPage;
