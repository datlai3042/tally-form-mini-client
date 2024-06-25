import React from "react";
import LayoutSidebar from "../../_components/Layout/LayoutSidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
	return <LayoutSidebar>{children}</LayoutSidebar>;
};

export default ProfileLayout;
