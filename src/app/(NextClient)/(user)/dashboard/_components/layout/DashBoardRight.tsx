import Button from "@/app/(NextClient)/_components/ui/button/Button";
import ButtonCreateForm from "@/app/(NextClient)/_components/ui/button/ButtonCreateForm";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { ChevronsRight, Flower, Plus, Search, Settings } from "lucide-react";
import React, { SetStateAction, useContext } from "react";
import { SidebarContext } from "../../SidebarContext";
import DashBoardRightHeader from "../DashBoardRightHeader";
import DashboardForms from "../DashboardForms";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { generateFullNameUser } from "@/app/_lib/utils";

const DashBoardRight = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const user = useSelector((state: RootState) => state.authReducer.user);
	const width = openSidebar ? " w-full" : "w-full";

	return (
		<div className={`${width} min-h-full h-max   flex flex-col text-[1.4rem]`}>
			<DashBoardRightHeader />

			<div className="section w-full flex items-center justify-between bg-color-section-theme ">
				<p className="font-extrabold text-text-theme">
					Chào mừng trở lại{" "}
					<span className="text-color-main text-[2rem] ">{generateFullNameUser(user || undefined)}</span>
				</p>
				<ButtonCreateForm
					textContent="Tạo Form"
					urlNavigation="/"
					className=" xl:[&]:p-[4px_10px] !text-[1.4rem]"
					position="LEFT"
					icon={<Plus />}
				/>
			</div>
			{/* <DashBoardRightHeader /> */}
			{/* <DashBoardRightHeader /> */}

			<div className="section   w-full   mx-auto flex flex-col gap-[4rem] bg-color-section-theme">
				<DashboardForms />
			</div>
		</div>
	);
};

export default DashBoardRight;
