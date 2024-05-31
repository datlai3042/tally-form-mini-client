import React, { useContext } from "react";
import ButtonIcon from "../../_components/ui/button/ButtonIcon";
import { ChevronsRight, Flower, Search, Settings } from "lucide-react";
import { SidebarContext } from "../SidebarContext";
import Link from "next/link";

const DashBoardRightHeader = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);

	return (
		<div className=" w-full h-[3rem] flex items-center justify-between gap-[1rem] text-[1.3rem]">
			<div className="flex items-center gap-[1rem] ">
				{!openSidebar && <ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />}
				<Flower className="w-[1.8rem]" />
			</div>
			<div className="flex gap-[20px]">
				<div
					className="p-[.2rem_.8rem] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					title="Tìm kiếm"
				>
					<Search className="w-[1.6rem]" />
					<span>Search</span>
				</div>

				<Link
					href={"/settings"}
					className="p-[.2rem_.8rem] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					title="Cài đặt"
				>
					<Settings className="w-[1.6rem]" />
				</Link>
			</div>
		</div>
	);
};

export default DashBoardRightHeader;
