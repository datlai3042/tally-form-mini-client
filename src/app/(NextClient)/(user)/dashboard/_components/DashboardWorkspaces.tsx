import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";

const DashboardWorkspaces = () => {
	const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);

	const Icon = openWorkspace ? (
		<ChevronDown className="w-[1.4rem] out " />
	) : (
		<ChevronRight className="w-[1.4rem] out " />
	);

	const styleEffect = {
		onCheckFocus: (state: boolean) => {
			if (state) return "bg-slate-100 outline outline-[4px] outline-blue-200";
			return "bg-transparent hover:bg-slate-200";
		},
	};

	return (
		<div className="pl-[.6rem] flex flex-col gap-[.6rem]">
			<p className="text-[1.2rem] text-[rgb(137_136_132)]">Workspaces</p>

			<div className="flex gap-[1rem]">
				<ButtonIcon
					Icon={Icon}
					className={`${styleEffect.onCheckFocus(openWorkspace)} flex  rounded-lg !w-[20px] !h-[20px]`}
					onClick={() => setOpenWorkspace((prev) => !prev)}
				/>
				<span>My workspace</span>
			</div>
		</div>
	);
};

export default DashboardWorkspaces;
