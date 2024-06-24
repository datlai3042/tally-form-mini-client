"use client";
import LayoutSidebar from "@/app/(NextClient)/_components/Layout/LayoutSidebar";
import FormDesignProvider from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import FormModeScreenProvider from "@/app/(NextClient)/_components/provider/FormModeScreen";
import React from "react";

const EditFormLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormDesignProvider>
			<FormModeScreenProvider>{children}</FormModeScreenProvider>
		</FormDesignProvider>
	);
};

export default EditFormLayout;
