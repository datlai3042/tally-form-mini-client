import React, { useContext } from "react";
import { SidebarContext } from "../SidebarContext";

import { ChevronsLeft } from "lucide-react";
import ButtonIcon from "../../_components/ui/button/ButtonIcon";

import DashBoardButtonModel from "./DashBoardButtonModel";
import { UserType } from "@/app/_schema/user/user.type";
import { RootState } from "@/app/_lib/redux/store";
import { useSelector } from "react-redux";
import Image from "next/image";

const DashboardAccount = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	return (
		<div className="pl-[.6rem] group max-w-full h-[3rem] flex items-center justify-between ">
			{user && (
				<>
					<div className="max-w-[90%] flex gap-[1rem] items-center ">
						{user?.user_avatar_current?.secure_url && (
							<Image
								src={user.user_avatar_current.secure_url}
								width={20}
								height={20}
								alt="avatar"
								className="w-[2rem] h-[2rem] rounded-full"
							/>
						)}
						{!user?.user_avatar_current?.secure_url && (
							<div className="min-w-[2rem] h-[2rem] bg-green-300 rounded-full flex items-center justify-center">
								{user?.user_first_name.slice(0, 1)}
							</div>
						)}

						<span className="font-semibold w-[90%] break-words line-clamp-2 " title={"Nickname"}>
							{user?.user_first_name + " " + user?.user_last_name}
						</span>
						<DashBoardButtonModel />
					</div>
					<ButtonIcon
						Icon={<ChevronsLeft className="w-[1.4rem]" />}
						onClick={() => setOpenSidebar(false)}
						className="invisible group-hover:visible bg-transparent hover:bg-slate-200 rounded-lg"
					/>
				</>
			)}

			{!user && <div className="animate-pulse w-full h-full rounded-md bg-slate-200"></div>}
		</div>
	);
};

export default DashboardAccount;
