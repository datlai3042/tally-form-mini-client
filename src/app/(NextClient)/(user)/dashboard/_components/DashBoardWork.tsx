"use client";
import { Flower, Globe, Home, HomeIcon, LogOut, LogOutIcon, Search, Settings, User, Users } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import AuthService from "@/app/_services/auth.service";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import path from "path";

const WorkItem = [
	{
		Title: "Trang chủ",
		Icon: <Home />,
		Href: "/dashboard",
	},

	{
		Title: "Trang cá nhân",
		Icon: (
			<Image
				src={"/assets/images/icon/navigation/profile_me.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[2.4rem] h-[2.4rem]"
			/>
		),
		Href: (user_atlas: string) => `/profile/${user_atlas}`,
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
	const user = useSelector((state: RootState) => state.authReducer.user);

	const [openModelDomain, setOpenModelDomain] = useState<boolean>(false);
	const [openModelSearch, setopenModelSearch] = useState<boolean>(false);
	const router = useRouter();

	const pathName = usePathname();

	console.log({ pathName });

	const logoutMutation = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => AuthService.logoutNextClient(),
		onSuccess: () => {
			router.push("/");
		},
	});

	const matchPathName = (link: string) => link === pathName;

	const urlProlife = `/profile/${user?.user_atlas}`;

	return (
		<div className="flex flex-col gap-[.8rem] text-[1.4rem] ">
			<Link
				href={"/"}
				className={`nav ${
					matchPathName("/dashboard") ? "nav__isActive" : "nav__normal !text-text-theme "
				} group  `}
			>
				<HomeIcon size={18} />
				<span className="font-medium">Trang chủ</span>
			</Link>

			<Link
				href={urlProlife}
				className={`nav ${matchPathName(urlProlife) ? "nav__isActive" : "nav__normal !text-text-theme "} group`}
			>
				<User size={18} />
				<span className="font-medium  ">Trang cá nhân</span>
			</Link>

			<Link
				href={urlProlife}
				className={`nav ${matchPathName("/search") ? "nav__isActive" : "nav__normal !text-text-theme"} group `}
			>
				<Search size={18} />
				<span className="font-medium">Tìm kiếm</span>
			</Link>

			<Link
				href={"/settings"}
				className={`nav ${
					matchPathName("/settings") ? "nav__isActive" : "nav__normal !text-text-theme"
				} group `}
			>
				<Settings size={18} />
				<span className="font-medium">Cài đặt</span>
			</Link>

			<button className="nav nav__normal !text-text-theme " onClick={() => logoutMutation.mutate()}>
				<LogOutIcon size={18} />
				Đăng xuất
			</button>
		</div>
	);
};

export default DashBoardWork;
