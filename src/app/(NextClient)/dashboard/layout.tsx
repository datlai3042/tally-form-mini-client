import React from "react";
import SidebarContextProvider from "./SidebarContext";
import UserService from "@/app/_services/user.service";
import { UserType } from "@/app/_schema/user/user.type";

const DashBoardLayout = async ({ Children }: { Children: React.ComponentType<{ user: UserType | null }> }) => {
	let user = null;
	try {
		const res = await UserService.me();
		user = res.metadata.user;
	} catch (error) {
		console.log({ error });
	}

	return (
		<div>
			<Children user={user} />
		</div>
	);
};

export default DashBoardLayout;
