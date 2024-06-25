import React, { useState } from "react";
import { ChevronDown, ChevronRight, Notebook } from "lucide-react";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import Link from "next/link";
import Image from "next/image";

const DashboardWorkspaces = () => {
	const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);
	const { forms, pending, success } = useGetAllFormUser();

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
		<div
			className="pl-[.6rem]  flex flex-col gap-[.6rem] hover:cursor-pointer"
			onClick={() => setOpenWorkspace((prev) => !prev)}
		>
			{success && (
				<>
					<p className="text-[1.3rem] text-[rgb(137_136_132)]">Nơi làm việc</p>

					<div className="flex items-center gap-[1rem]">
						<ButtonIcon
							Icon={Icon}
							className={`${styleEffect.onCheckFocus(
								openWorkspace
							)} flex  rounded-lg !w-[20px] !h-[20px]`}
						/>
						<span>Nơi làm việc</span>
					</div>
					{openWorkspace && forms.length > 0 && (
						<div className="mt-[1rem] scroll-common min-h-[2rem] max-h-[12rem]  transition-[height] duration-500 overflow-y-scroll  flex flex-col gap-[1.4rem]">
							{forms.map((form) => (
								<Link
									key={form._id}
									href={`/form/${form._id}/edit`}
									className="flex items-center w-full h-[5rem]  gap-[.8rem] text-[1.4rem] hover:bg-blue-100 p-[.6rem_1rem] "
								>
									<Image
										src={"/assets/images/icon/navigation/one_item.png"}
										width={18}
										height={18}
										alt="icon"
										className="w-[2rem] h-[2rem]"
										unoptimized={true}
									/>
									<p className="max-w-[80%] truncate ">
										{form.form_title.form_title_value || "Chưa tạo tiêu đề"}
									</p>
								</Link>
							))}
						</div>
					)}
					{openWorkspace && forms.length === 0 && (
						<div className="p-[.4rem_2rem] text-[1.3rem] text-gray-400">Danh sách hiện đang trống</div>
					)}
				</>
			)}

			{pending && (
				<div className="w-full h-[2rem]">
					<LoadingArea />
				</div>
			)}
		</div>
	);
};

export default DashboardWorkspaces;
