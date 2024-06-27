"use client";
import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../../(user)/dashboard/SidebarContext";
import DashBoardLeft from "../../(user)/dashboard/_components/layout/DashBoardLeft";
import useGetAllNotification from "@/app/hooks/notifications/useGetAllNotification";
import { usePathname } from "next/navigation";

const LayoutSidebar = ({ children }: { children: React.ReactNode }) => {
	const { openSidebar } = useContext(SidebarContext);

	const pathName = usePathname();

	//sidebar 26rem gap-2rem

	const styleEffect = {
		onCheckSidebar: (check: boolean) => {
			if (check) return "w-full sm:w-[65%] xl:w-[calc(100vw-24rem)]   xl:left-[22rem]  duration-[300ms]";
			return "w-full inset-0 duration-[600ms]";
		},
	};

	// const pathEditForm = pathName.endsWith("/edit") ? "h-max min-h-screen" : "h-screen";

	return (
		<div className={` relative max-w-screen min-h-screen h-max w-full   flex  `}>
			{openSidebar && (
				<aside
					className={` fixed z-[2] w-[0%] sm:w-[35%] xl:w-[22rem] h-full overflow-hidden  hidden sm:block transition-[width]  duration-1000  bg-color-section-theme border-r-[.1rem] border-border-color`}
				>
					{openSidebar && <DashBoardLeft />}
				</aside>
			)}
			<div className={`${styleEffect.onCheckSidebar(openSidebar)} absolute  min-h-full h-max transition-all   `}>
				{children}
			</div>
		</div>
	);
};

export default LayoutSidebar;
