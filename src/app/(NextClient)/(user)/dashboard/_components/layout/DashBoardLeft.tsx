"use client";
import React, { useContext, useEffect } from "react";

import DashBoardWork from "../DashBoardWork";
import DashboardAccount from "../DashboardAccount";
import DashboardWorkspaces from "../DashboardWorkspaces";
import DashboardProduct from "../DashboardProduct";
import DashboardHelp from "../DashboardHelp";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { useDispatch } from "react-redux";
import LogoColor from "@/app/(NextClient)/_components/logo/LogoColor";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ChevronsLeft } from "lucide-react";
import { SidebarContext } from "../../SidebarContext";

const DashBoardLeft = () => {
	const dispatch = useDispatch();
	const { setOpenSidebar } = useContext(SidebarContext);

	const fetchMe = useQuery({
		queryKey: ["/me"],
		queryFn: () => UserService.me(),
	});

	useEffect(() => {
		if (fetchMe.isSuccess) {
			const { user } = fetchMe.data!.metadata;

			dispatch(onFetchUser({ user }));
		}
	}, [fetchMe.isSuccess, dispatch, fetchMe]);

	return (
		<div className="p-[1rem] flex flex-col gap-[1.1rem] text-text-theme text-[1.4rem]">
			<div className="mb-[2rem] flex items-center justify-between gap-[1rem]">
				<LogoColor />

				<ButtonIcon
					Icon={<ChevronsLeft className="w-[1.4rem]" />}
					onClick={() => setOpenSidebar(false)}
					className=" bg-transparent hover:bg-slate-200 rounded-lg"
				/>
			</div>
			<DashBoardWork />
			<div className="mt-[1rem] flex flex-col gap-[1.8rem] text-[1.4rem]">
				<DashboardWorkspaces />
				<DashboardProduct />
				{/* <DashboardHelp /> */}
			</div>
		</div>
	);
};
export default DashBoardLeft;
