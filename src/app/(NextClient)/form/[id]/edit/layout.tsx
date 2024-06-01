"use client";
import FormDesignProvider from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import FormEditContextProvider from "@/app/(NextClient)/_components/provider/FormEditProvider";
import FormModeScreenProvider from "@/app/(NextClient)/_components/provider/FormModeScreen";
import React from "react";

const EditFormLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<FormModeScreenProvider>
			<FormEditContextProvider>
				<FormDesignProvider>{children}</FormDesignProvider>
			</FormEditContextProvider>
		</FormModeScreenProvider>
	);
};

export default EditFormLayout;
