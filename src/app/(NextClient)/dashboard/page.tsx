"use client";
import React, { useContext, useEffect, useState } from "react";
import DashBoardLeft from "./_components/layout/DashBoardLeft";
import DashBoardRight from "./_components/layout/DashBoardRight";
import { SidebarContext } from "./SidebarContext";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { useDispatch } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { UserType } from "@/app/_schema/user/user.type";

type TProps = {
	user: UserType | null;
};

const DashBoardPage = (props: TProps) => {
	const { openSidebar } = useContext(SidebarContext);
	const dispatch = useDispatch();
	const { user } = props;

	useEffect(() => {
		if (user) {
			dispatch(onFetchUser({ user }));
		}
	}, [dispatch, user]);

	const styleEffect = {
		onCheckSidebar: (check: boolean) => {
			if (check)
				return "w-full sm:w-[65%] xl:w-[83.5%] left-0 sm:left-[35%] xl:left-[16.5%] right-0 duration-[300ms]";
			return "w-full inset-0 duration-[600ms]";
		},
	};

	return (
		<div className="relative max-w-screen w-full min-h-screen h-max flex  ">
			{openSidebar && (
				<aside
					className={` absolute z-[2] w-[0%] sm:w-[35%] xl:w-[16.5%] min-h-full h-max border-r-[.1rem]  border-b-[.1rem] border-slate-200 hidden sm:block transition-[width]  duration-1000  bg-[#ffffff] `}
				>
					{openSidebar && <DashBoardLeft />}
				</aside>
			)}
			<div className={`${styleEffect.onCheckSidebar(openSidebar)} absolute  h-full  transition-all    `}>
				<DashBoardRight />
			</div>
		</div>
	);
};

export default DashBoardPage;
