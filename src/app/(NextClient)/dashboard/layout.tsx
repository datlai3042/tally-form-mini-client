import React from "react";
import SidebarContextProvider from "./SidebarContext";
type TProps = {
	children: React.ReactNode;
};
const DashBoardLayout = (props: TProps) => {
	return <div>{props.children}</div>;
};

export default DashBoardLayout;
