import React, { useContext } from "react";
import { Bell, ChevronsRight, Flower, Search, Settings } from "lucide-react";
import { SidebarContext } from "../SidebarContext";
import Link from "next/link";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import Notification from "@/app/(NextClient)/_components/notification/Notification";
import Image from "next/image";

const DashBoardRightHeader = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

	return (
		<div className=" w-full h-[3rem] px-[1rem] py-[2rem] flex items-center justify-between gap-[1rem] text-[1.3rem]">
			<div className="flex items-center gap-[1rem] ">
				{!openSidebar && <ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />}
			</div>
			<div className="flex gap-[20px]">
				<div
					className="p-[.2rem_.8rem] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					title="Tìm kiếm"
				>
					<Search className="w-[1.6rem]" />
					<span>Tìm kiếm</span>
				</div>

				<Link
					href={"/settings"}
					className="p-[.2rem_.8rem] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					title="Cài đặt"
				>
					<Settings className="w-[1.6rem]" />
				</Link>
				<Notification />
			</div>
		</div>
	);
};

export default DashBoardRightHeader;
