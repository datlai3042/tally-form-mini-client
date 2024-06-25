import { getOAuthGoogleUrl } from "@/app/_lib/OAuth2";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ButtonLoginGoogle = () => {
	const oAuthUrl = getOAuthGoogleUrl();

	return (
		<Link
			href={oAuthUrl}
			className="w-full flex items-center justify-center gap-[2rem] border-[.1rem] border-gray-200 rounded-xl p-[.8rem_1rem]"
		>
			<Image
				src={"/assets/images/icon/oauth2/google.png"}
				width={50}
				height={50}
				alt="toast success"
				className="w-[2.4rem] h-[2.4rem]"
			/>
			<span>Google</span>
		</Link>
	);
};

export default ButtonLoginGoogle;
