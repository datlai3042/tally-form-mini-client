import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
	return (
		<Link href={"/"}>
			<Image
				src={"/assets/images/icon/logo/png/logo-black.png"}
				width={70}
				height={70}
				quality={100}
				alt="logo"
				className="w-[17rem] h-[12rem] object-contain"
				unoptimized={true}
			/>
		</Link>
	);
};

export default Logo;
