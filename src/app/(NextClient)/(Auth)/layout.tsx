"use client";
import React, { useContext, useEffect, useState } from "react";
import Portal from "../_components/Portal";
import Link from "next/link";
import Image from "next/image";
import Logo from "../_components/logo/Logo";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const [loader, setLoader] = useState<boolean>(false);

	useEffect(() => {
		setLoader(true);
	}, []);

	if (!loader) return null;

	return (
		<Portal>
			<div className="relative z-[500] top-0 xl:top-0 left-0 w-full min-h-screen h-max  xl:pt-0  px-[20px] flex justify-center items-center  ">
				<header className="absolute top-[0rem] left-[2rem] z-[301] flex flex-col  justify-between items-center ">
					<Logo />
				</header>
				<div className="pt-[6rem]">{children}</div>
			</div>
		</Portal>
	);
};

export default AuthLayout;
