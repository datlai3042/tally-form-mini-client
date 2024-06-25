import Image from "next/image";
import React from "react";

const ButtonLoginFacebook = () => {
	return (
		<button className="w-full flex items-center justify-center gap-[2rem] border-[.1rem] border-gray-200 rounded-xl p-[.8rem_1rem]">
			<Image
				src={"/assets/images/icon/oauth2/facebook.png"}
				width={50}
				height={50}
				alt="toast success"
				className="w-[2.4rem] h-[2.4rem]"
			/>
			<span>Google</span>
		</button>
	);
};

export default ButtonLoginFacebook;
