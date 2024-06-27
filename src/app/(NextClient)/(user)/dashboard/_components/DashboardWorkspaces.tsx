import React, { useContext, useState } from "react";
import { ChevronDown, ChevronRight, Notebook } from "lucide-react";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import useGetAllFormUser from "@/app/hooks/useGetAllFormUser";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";

const DashboardWorkspaces = () => {
	const [openWorkspace, setOpenWorkspace] = useState<boolean>(false);
	const { forms, pending, success } = useGetAllFormUser();
	const { theme } = useContext(ThemeContext);

	const pathName = usePathname();

	const Icon = openWorkspace ? <ChevronDown className="w-[1.4rem] " /> : <ChevronRight className="w-[1.4rem] " />;

	const styleEffect = {
		onCheckFocus: (state: boolean) => {
			if (state) return "bg-blue-400 text-[#fff] outline outline-[2px] outline-blue-200";
			return "bg-transparent hover:bg-slate-200";
		},
	};

	const hoverThemeStyle =
		theme === "dark" ? "hover:bg-blue-400 scroll-color-main" : "hover:bg-blue-100 scroll-common";

	const scrollThemeStyle = theme === "dark" ? "scroll-color-main" : "scroll-common";

	return (
		<div
			className="pl-[.6rem]  flex flex-col gap-[.6rem] hover:cursor-pointer"
			onClick={() => setOpenWorkspace((prev) => !prev)}
		>
			{success && (
				<>
					<p className="text-[1.3rem] text-[rgb(137_136_132)]">Nơi làm việc</p>

					<div
						className={`nav ${
							pathName.startsWith("/form") ? "nav__isActive" : "nav__normal !text-text-theme "
						} p-[.1rem] flex items-center gap-[1rem] text-text-theme`}
					>
						<ButtonIcon
							Icon={Icon}
							className={`${styleEffect.onCheckFocus(
								openWorkspace
							)} flex  rounded-lg !w-[16px] !h-[16px]`}
						/>
						<span className="">Nơi làm việc</span>
					</div>
					{openWorkspace && forms.length > 0 && (
						<div
							className={`${scrollThemeStyle} ml-[2rem]  min-h-[2rem] max-h-[12rem]  transition-[height] duration-500 overflow-y-scroll  flex flex-col gap-[1.4rem] text-text-theme`}
						>
							{forms.map((form) => (
								<Link
									key={form._id}
									href={`/form/${form._id}/edit`}
									className={`${hoverThemeStyle} flex items-center w-full h-[5rem]  gap-[.8rem] text-[1.4rem]  p-[.6rem_1rem] `}
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
