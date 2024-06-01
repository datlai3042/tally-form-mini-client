"use client";
import FormDesignProvider from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import FormModeScreenProvider from "@/app/(NextClient)/_components/provider/FormModeScreen";
import React from "react";

const EditFormLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormModeScreenProvider>
			<FormDesignProvider>{children}</FormDesignProvider>
		</FormModeScreenProvider>
	);
};

export default EditFormLayout;
