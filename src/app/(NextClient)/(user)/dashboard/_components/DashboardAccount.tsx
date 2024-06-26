import React, { useContext } from "react";
import { SidebarContext } from "../SidebarContext";

import { ChevronsLeft } from "lucide-react";

import DashBoardButtonModel from "./DashBoardButtonModel";
import { UserType } from "@/app/_schema/user/user.type";
import { RootState } from "@/app/_lib/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";

const DashboardAccount = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	return (
		<div className="group min-w-[17.2rem] h-[3rem] flex items-center justify-between ">
			{user && (
				<>
					<div className="max-w-[90%] flex gap-[1rem] items-center ">
						{user?.user_avatar_current && (
							<Image
								src={user.user_avatar_current}
								width={20}
								height={20}
								alt="avatar"
								className="w-[2rem] h-[2rem] rounded-full"
							/>
						)}
						{!user?.user_avatar_current && (
							<div className="min-w-[2rem] h-[2rem] bg-green-300 rounded-full flex items-center justify-center">
								{user?.user_first_name.slice(0, 1)}
							</div>
						)}

						<span className="font-semibold w-fullbreak-words line-clamp-2 " title={"Nickname"}>
							{user?.user_first_name + " " + user?.user_last_name}
						</span>
						<DashBoardButtonModel />
					</div>
				</>
			)}

			{!user && <div className="animate-pulse w-full h-full rounded-md bg-slate-200"></div>}
		</div>
	);
};

export default DashboardAccount;
