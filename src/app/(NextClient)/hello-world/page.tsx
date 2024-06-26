import { cookies, headers } from "next/headers";
import React, { Fragment } from "react";
import ButtonLogOut from "../_components/ui/button/ButtonLogOut";
import Http from "@/app/_lib/http";
import parse from "html-react-parser";

import ButtonNavigation from "../_components/ui/button/ButtonNavigation";

const DashBoardPageTextToken = async () => {
	const requestUrl = headers().get("x-url");

	const cookieStore = cookies();
	const headersList = headers();
	const domain = headersList.get("host") || "";
	console.log({ domain });
	const access_token = cookieStore.get("access_token")?.value || "";
	const refresh_token = cookieStore.get("refresh_token")?.value || "";

	const _id = cookieStore.get("_id")?.value || "";
	let data: any;

	data = await Http.get<any>("/v1/api/product/get-all-product", {
		headers: {
			Authorization: `Bearer ${access_token}`,
			"x-client-id": _id,
			refresh_token: refresh_token,
			domain,
		},
		cache: "no-store",
		pathName: "/dashboard",
	});

	return (
		<div className="w-full h-screen flex justify-center items-center gap-[20px]">
			<p>DashBoardPageTextToken {JSON.stringify(data)}</p>
			{parse("<a href='https://www.facebook.com/datlai304'>Me</a>")}

			{/* <ButtonNavigation urlNavigation="/see-token" textContent="Xem token" /> */}
			<ButtonLogOut />
		</div>
	);
};

export default DashBoardPageTextToken;
