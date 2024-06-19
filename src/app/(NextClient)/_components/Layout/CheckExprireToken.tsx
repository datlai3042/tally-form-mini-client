"use client";
import { nextClient401 } from "@/app/_lib/httpCase";
import AuthService from "@/app/_services/auth.service";
import { metadata } from "@/app/layout";
import { differenceInHours, differenceInMilliseconds, differenceInSeconds } from "date-fns";
import { redirect } from "next/dist/server/api-utils";
import React, { useEffect } from "react";

const timeCheck = 3000;

const CheckExprireToken = () => {
	useEffect(() => {
		const interval = setInterval(async () => {
			const now = new Date();
			const exprireToken = JSON.parse(localStorage.getItem("expireToken") || "0");
			const exprireTokemTime = new Date(exprireToken);
			if (differenceInSeconds(exprireTokemTime, now) <= 3) {
				try {
					const res = await AuthService.refreshTokenServer();
				} catch (error) {
					await AuthService.logoutNextClient();
					window.location.href = "/";
				}
			}
		}, timeCheck);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return null;
};

export default CheckExprireToken;
