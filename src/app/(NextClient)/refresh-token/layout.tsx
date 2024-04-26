// "use client";
import React from "react";
import { Suspense } from "react";

const RefreshTokenLayout = ({ children }: { children: React.ReactNode }) => {
	return <Suspense>{children}</Suspense>;
};

export default RefreshTokenLayout;
