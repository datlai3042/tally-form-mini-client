import React from "react";
import SettingUpdateAvatar from "./SettingUpdateAvatar";

const SettingSection = () => {
	return (
		<div className="w-full h-[30rem]  flex flex-col gap-[4rem]">
			<div className="flex flex-col gap-[2rem]">
				<h3 className="text-h3 !text-[2.8rem]">Cài đặt</h3>
				<div className="min-h-[3rem] flex items-center justify-between border-b-[.1rem] border-slate-200 ">
					<h4 className="h-full pb-[.3rem] border-b-[.1rem] border-slate-700 font-semibold ">
						Tài khoản của tôi
					</h4>
				</div>
			</div>

			<SettingUpdateAvatar />
		</div>
	);
};

export default SettingSection;
