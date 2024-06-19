"use client";
import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserService from "@/app/_services/user.service";
import { useDispatch } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { set } from "zod";
import { SidebarContext } from "../../(user)/dashboard/SidebarContext";
import DashBoardLeft from "../../(user)/dashboard/_components/layout/DashBoardLeft";

const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
	const { openSidebar } = useContext(SidebarContext);

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
					className={` absolute z-[2] w-[0%] sm:w-[35%] xl:w-[16.5%] min-h-full h-max   hidden sm:block transition-[width]  duration-1000  bg-[#ffffff] `}
				>
					{openSidebar && <DashBoardLeft />}
				</aside>
			)}
			<div className={`${styleEffect.onCheckSidebar(openSidebar)} absolute  h-full  transition-all    `}>
				{children}
			</div>
		</div>
	);
};

export default LayoutSidebar;
