"use client";

import React from "react";
import SettingHeader from "./_components/SettingHeader";
import SettingSection from "./_components/SettingSection";
import SettingAccount from "./_components/SettingAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
const SettingPage = () => {
	const user = useSelector((state: RootState) => state.authReducer.user);

	return (
		<div className="w-full h-full   p-[.8rem_1.8rem] flex flex-col gap-[5rem] text-[1.4rem]">
			<SettingHeader />
			<div className="w-[90%] xl:w-[69%] mx-auto">
				<SettingSection />
				{user && <SettingAccount />}
				{!user && (
					<div className="flex flex-col gap-[1.8rem]">
						<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
						<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
						<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
						<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
						<div className="animate-pulse bg-slate-200 w-[10%] p-[.2rem_.8rem] h-[2.7rem] d">Update</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SettingPage;
