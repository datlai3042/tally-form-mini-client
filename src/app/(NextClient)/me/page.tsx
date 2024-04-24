import { UserType } from "@/app/_schema/user/user.type";
import UserService from "@/app/_services/user.service";
import React from "react";

//Không export tào lào trong component

const ProfileMe = async () => {
	let me: UserType | null | any = null;

	try {
		const res = await UserService.me();
		me = res!.metadata.user;
	} catch (error) {}

	return <div>Me: {JSON.stringify(me) || "none"}</div>;
};

export default ProfileMe;
