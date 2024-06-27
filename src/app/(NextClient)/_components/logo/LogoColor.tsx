import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const LogoColor = () => {
	const { theme } = useContext(ThemeContext);

	const url = theme === "dark" ? "/assets/images/icon/logo/light.png" : "/assets/images/icon/logo/dark.png";

	return (
		<Link href={"/dashboard"} className="w-full flex items-center justify-center">
			<Image
				src={url}
				width={70}
				height={70}
				quality={100}
				alt="logo"
				className="w-[16rem] h-[12rem] "
				unoptimized={true}
			/>
		</Link>
	);
};

export default LogoColor;
