import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import DashBoardModel from "./DashBoardModel";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";

const DashBoardButtonModel = () => {
	const [openSmallModel, setOpenSmallModel] = useState<boolean>(false);

	const styleEffect = {
		onCheckFocus: (state: boolean) => {
			if (state) return "bg-slate-100 outline outline-[4px] outline-blue-200";
			return "bg-transparent hover:bg-slate-200";
		},
	};

	return (
		<div className="relative ml-[-.2rem]">
			<ButtonIcon
				Icon={<ChevronDown className="w-[1.4rem]  " />}
				className={`${styleEffect.onCheckFocus(openSmallModel)} flex  rounded-lg !w-[20px] !h-[20px]`}
				onClick={() => setOpenSmallModel((prev) => !prev)}
			/>
			{openSmallModel && <DashBoardModel setOpenSmallModel={setOpenSmallModel} />}
		</div>
	);
};

export default DashBoardButtonModel;
