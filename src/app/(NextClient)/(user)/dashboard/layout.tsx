import { ResponseApi } from "@/app/_schema/api/response.shema";
import { UserType } from "@/app/_schema/user/user.type";
import AuthService from "@/app/_services/auth.service";
import UserService from "@/app/_services/user.service";
import { Metadata, ResolvingMetadata } from "next";
import { redirect } from "next/navigation";

import { cookies } from "next/headers";
import React, { use } from "react";
import Http from "@/app/_lib/http";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";

type Props = {
	params: { id: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

type TProps = {
	children: React.ReactNode;
};
const DashBoardLayout = async (props: TProps) => {
	return <LayoutSidebar>{props.children}</LayoutSidebar>;
};

export default DashBoardLayout;
