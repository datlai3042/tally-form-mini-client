"use client";
import React, { useContext, useEffect, useState } from "react";
import Portal from "../_components/Portal";
import Link from "next/link";
import Image from "next/image";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const [loader, setLoader] = useState<boolean>(false);

	useEffect(() => {
		setLoader(true);
	}, []);

	if (!loader) return null;

	return (
		<Portal>
			<div className="relative z-[500] top-0 xl:top-0 left-0 w-full min-h-screen h-max  xl:pt-0  px-[20px] flex justify-center items-center  ">
				<header className="absolute top-[2rem] left-[2rem] z-[301] p-[10px] xl:p-[10px] flex flex-col  justify-between items-center ">
					<Link href={"/"}>
						<Image
							src={"/assets/images/icon/logo_v2.png"}
							width={70}
							height={28}
							alt="logo"
							className="w-[70px] h-[28px]"
						/>
					</Link>
				</header>
				<div className="pt-[6rem]">{children}</div>
			</div>
		</Portal>
	);
};

export default AuthLayout;
