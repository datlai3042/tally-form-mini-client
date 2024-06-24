"use client";
import React, { useContext } from "react";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";

type TProps = {
	children: React.ReactNode;
};

const TrashFormLayout = (props: TProps) => {
	const { children } = props;

	return <LayoutSidebar>{children}</LayoutSidebar>;
};

export default TrashFormLayout;
