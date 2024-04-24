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

	const refreshTokenQuery = useQuery({
		queryKey: ["/refresh-token"],
		queryFn: () => AuthService.refreshToken(),
	});

	useEffect(() => {
		const abort = new AbortController();
		if (refreshTokenQuery.isSuccess) {
			console.log({ metadata: refreshTokenQuery.data?.metadata });
			const { client_id } = refreshTokenQuery.data?.metadata as ResponseAuth;
			const {
				token: { access_token, refresh_token },
			} = refreshTokenQuery.data?.metadata as ResponseAuth;

			const signal = abort.signal;
			Http.post<TokenNextSync>(
				"/v1/api/auth/set-token",
				{
					access_token,
					refresh_token,
					client_id,
				},
				{ baseUrl: "", signal }
			).then(() => {
				console.log("alo");
				router.refresh();
				redirect(pathName || "");
			});
		}

		return () => {
			router.refresh();
			abort.abort();
		};
	}, [router, pathName, refreshTokenQuery]);

	if (refreshTokenQuery.isError) {
		return (
			<div className="w-screen h-screen flex  justify-center items-center gap-[20px]">
				<div className="w-[500px] h-[500px] flex flex-col justify-center items-center shadow-2xl shadow-blue-400 rounded-xl">
					<p>Page Không tồn tại {JSON.stringify(process)}</p>;
					<ButtonNavigation urlNavigation="/dashboard" textContent="Dashboard" onClick={() => {}} />
				</div>
			</div>
		);
	}

	return <div className="flex flex-col gap-10 ">Đang xử lí</div>;
};

export default RefreshTokenPage;
