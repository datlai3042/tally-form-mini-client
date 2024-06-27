import React, { useContext } from "react";
import { Bell, ChevronsRight, Flower, Plus, Search, Settings } from "lucide-react";
import { SidebarContext } from "../SidebarContext";
import Link from "next/link";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Notification from "@/app/(NextClient)/_components/notification/Notification";
import Image from "next/image";
import DashboardAccount from "./DashboardAccount";
import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";
import { usePathname } from "next/navigation";
import { generateContentToUrl } from "@/app/_lib/utils";

const DashBoardRightHeader = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const pathName = usePathname();

	return (
		<div
			className={`w-full section sticky  top-[0rem] z-[2]  h-[6rem]  flex flex-col gap-[1rem]  text-[1.3rem] bg-color-section-theme border-[.1rem] border-border-color border-l-0`}
		>
			<div className="h-full w-full flex items-center justify-between">
				{!openSidebar && (
					<div className="flex items-center gap-[1rem] ">
						<ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />
					</div>
				)}
				<p className="text-text-theme text-[2rem] font-semibold">{generateContentToUrl(pathName)}</p>
				<div
					className=" w-[30%] p-[.2rem_1rem] h-[3rem]  rounded-lg focus-within:border-[.1rem] focus-within:border-color-main border-[.1rem] border-border-color flex items-center gap-[.8rem]"
					title="Tìm kiếm"
				>
					<Search className="w-[1.6rem]" />
					<input className="hidden xl:inline min-h-full w-[95%] bg-transparent" placeholder="Tìm kiếm" />
				</div>

				<div className="flex justify-end gap-[20px]">
					<ButtonDarkMode />
					<Link
						href={"/settings"}
						className="p-[.2rem_.8rem] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
						title="Cài đặt"
					>
						<Settings className="w-[1.6rem]" />
					</Link>
					<Notification />
					<DashboardAccount />
				</div>
			</div>
		</div>
	);
};

export default DashBoardRightHeader;
