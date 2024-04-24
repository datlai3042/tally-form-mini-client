"use client";

import Http, { clientToken } from "@/app/_lib/http";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import { abort } from "process";
import { TokenNextSync } from "@/type";

const RefreshTokenPage = () => {
	const router = useRouter();
	const searchParams = useSearchParams();

	const token_expires = searchParams.get("token_expires");
	const new_access_token = searchParams.get("new_access_token");
	const new_refresh_token = searchParams.get("new_refresh_token");
	const user_id = searchParams.get("user_id");
	const pathName = searchParams.get("pathName") || "/";
	const [process, setProcess] = useState(false);

	useEffect(() => {
		const abort = new AbortController();
		if (token_expires !== clientToken.refreshToken) {
			// setProcess(true);
			router.refresh();
		}
		if (token_expires === clientToken.refreshToken) {
			console.log("run api ");
			const signal = abort.signal;
			Http.post<TokenNextSync>(
				"/v1/api/auth/set-token",
				{
					access_token: new_access_token,
					refresh_token: new_refresh_token,
					_id: user_id,
				},
				{ baseUrl: "", signal }
			).then(() => {
				console.log("alo");
				router.refresh();
				router.push(pathName);
			});
		}

		return () => {
			router.refresh();
			abort.abort();
		};
	}, [router, new_access_token, new_refresh_token, user_id, token_expires, pathName]);

	if (token_expires !== clientToken.refreshToken) {
		return (
			<div className="w-screen h-screen flex  justify-center items-center gap-[20px]">
				<div className="w-[500px] h-[500px] flex flex-col justify-center items-center shadow-2xl shadow-blue-400 rounded-xl">
					<p>Page Không tồn tại {JSON.stringify(process)}</p>;
					<ButtonNavigation urlNavigation="/dashboard" textContent="Dashboard" onClick={() => {}} />
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col gap-10 ">
			<p className="w-[360px] break-words">Client ref: {clientToken.refreshToken}</p>
			<p className="w-[360px] break-words">Server ref: {token_expires}</p>
			<ButtonNavigation urlNavigation="/dashboard" textContent="Dashboard" onClick={() => {}} />
		</div>
	);
};

export default RefreshTokenPage;
