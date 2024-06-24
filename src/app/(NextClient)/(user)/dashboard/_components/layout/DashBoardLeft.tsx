"use client";
import React, { useEffect } from "react";

import DashBoardWork from "../DashBoardWork";
import DashboardAccount from "../DashboardAccount";
import DashboardWorkspaces from "../DashboardWorkspaces";
import DashboardProduct from "../DashboardProduct";
import DashboardHelp from "../DashboardHelp";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { useDispatch } from "react-redux";

const DashBoardLeft = () => {
	const dispatch = useDispatch();

	const fetchMe = useQuery({
		queryKey: ["/me"],
		queryFn: () => UserService.me(),
	});

	useEffect(() => {
		if (fetchMe.isSuccess) {
			const { user } = fetchMe.data!.metadata;
			if (user) {
				console.log({ user: user });
			}
			dispatch(onFetchUser({ user }));
		}
	}, [fetchMe.isSuccess, dispatch, fetchMe]);

	return (
		<div className="p-[1rem] flex flex-col gap-[1.1rem] bg-[#fffffff] text-[1.4rem]">
			<DashboardAccount />
			<DashBoardWork />
			<div className="mt-[1rem] flex flex-col gap-[1.8rem] text-[1.4rem]">
				<DashboardWorkspaces />
				<DashboardProduct />
				<DashboardHelp />
			</div>
		</div>
	);
};
export default DashBoardLeft;
