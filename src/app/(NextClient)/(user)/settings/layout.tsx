"use client";
import React, { useContext } from "react";
import DashBoardLeft from "../dashboard/_components/layout/DashBoardLeft";
import { SidebarContext } from "../dashboard/SidebarContext";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";

type TProps = {
	children: React.ReactNode;
};

const SettingLayout = (props: TProps) => {
	const { children } = props;

	return <LayoutSidebar>{children}</LayoutSidebar>;
};

export default SettingLayout;
