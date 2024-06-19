"use client";
import React, { SetStateAction, createContext, useState } from "react";

type TSidebarContext = {
	openSidebar: boolean;
	setOpenSidebar: React.Dispatch<SetStateAction<boolean>>;
};

export const SidebarContext = createContext<TSidebarContext>({
	openSidebar: true,
	setOpenSidebar: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const SidebarContextProvider = (props: TProps) => {
	const { children } = props;
	const [openSidebar, setOpenSidebar] = useState<boolean>(true);

	return <SidebarContext.Provider value={{ openSidebar, setOpenSidebar }}>{children}</SidebarContext.Provider>;
};

export default SidebarContextProvider;
