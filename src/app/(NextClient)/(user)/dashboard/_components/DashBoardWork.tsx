"use client";
import { Flower, Globe, LogOut, Search, Settings, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/app/_services/auth.service";
import { useRouter } from "next/navigation";
import Image from "next/image";

const WorkItem = [
	{
		Title: "Trang chủ",
		Icon: (
			<Image
				src={"/assets/images/icon/navigation/home.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[2.4rem] h-[2.4rem]"
			/>
		),
		Href: "/dashboard",
	},
	{
		Title: "Tìm kiếm",
		Icon: (
			<Image
				src={"/assets/images/icon/navigation/search.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[2.4rem] h-[2.4rem]"
			/>
		),
		Model: "search",
	},
	{
		Title: "Cài đặt",
		Icon: (
			<Image
				src={"/assets/images/icon/navigation/setting.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[2.4rem] h-[2.4rem]"
			/>
		),
		Href: "/settings",
	},
];

const DashBoardWork = () => {
	const [openModelDomain, setOpenModelDomain] = useState<boolean>(false);
	const [openModelSearch, setopenModelSearch] = useState<boolean>(false);
	const router = useRouter();

	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => AuthService.logoutNextClient(),
		onSuccess: () => {
			router.push("/");
		},
	});

	return (
		<div className="flex flex-col gap-[.8rem] text-[1.4rem] ">
			{WorkItem.map((work) => {
				if (work.Href)
					return (
						<Link
							key={work.Title}
							href={work.Href}
							className="p-[.6rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md"
						>
							{work.Icon}
							<span className="font-medium text-slate-600">{work.Title}</span>
						</Link>
					);
				if (work.Model === "users")
					return (
						<button
							key={work.Title}
							className="p-[.6rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md"
							onClick={() => setOpenModelDomain(true)}
						>
							{work.Icon}
							<span className="font-medium text-slate-600">{work.Title}</span>
						</button>
					);

				if (work.Model === "search")
					return (
						<button
							key={work.Title}
							className="p-[.6rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md"
							onClick={() => setopenModelSearch(true)}
						>
							{work.Icon}
							<span className="font-medium text-slate-600">{work.Title}</span>
						</button>
					);
			})}

			<button
				className="p-[.6rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md text-[1.4rem]"
				onClick={() => logoutMutation.mutate()}
			>
				<Image
					src={"/assets/images/icon/navigation/logout.png"}
					width={18}
					height={18}
					alt="icon"
					className="w-[2.4rem] h-[2.4rem]"
				/>
				Đăng xuất
			</button>
		</div>
	);
};

export default DashBoardWork;
