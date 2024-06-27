"use client";
import { Bell, LayoutPanelTop, LayoutTemplate, Map, SmilePlus, Sparkles, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const WorkItem = [
	{ Title: "Tempaltes", Icon: <LayoutPanelTop className="w-[1.8rem]" />, Href: "#" },
	{
		Title: "Quản lí thông báo",
		Icon: (
			<Image
				src={"/assets/images/icon/notification_control.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[1.8rem]"
			/>
		),
		Href: "/notification",
	},
	{ Title: "Roadmap", Icon: <Map className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Feedback", Icon: <SmilePlus className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Thùng rác", Icon: <Trash2 className="w-[1.8rem]" />, Href: "/trash" },
];

const DashboardProduct = () => {
	const pathName = usePathname();

	return (
		<div className=" flex flex-col gap-[.6rem]  ">
			<p className="pl-[.6rem] text-[1.2rem] text-textGray">Product</p>

			<Link href={"/"} className={`nav ${pathName === "/templates" ? "nav__isActive" : "nav__normal"}  `}>
				<LayoutTemplate color={pathName === "/templates" ? "#fff" : "#000"} size={18} />
				<span className="font-medium ">Thư viện form</span>
			</Link>

			<Link
				href={"/notification"}
				className={`nav ${pathName === "/notification" ? "nav__isActive" : "nav__normal"}  `}
			>
				<Store color={pathName === "/notification" ? "#fff" : "#000"} size={18} />
				<span className="font-medium ">Kho của bạn</span>
			</Link>

			<Link
				href={"/notification"}
				className={`nav ${pathName === "/notification" ? "nav__isActive" : "nav__normal"}  `}
			>
				<Bell color={pathName === "/notification" ? "#fff" : "#000"} size={18} />
				<span className="font-medium ">Quản lí thông báo</span>
			</Link>

			<Link href={"/trash"} className={`nav ${pathName === "/trash" ? "nav__isActive" : "nav__normal"}  `}>
				<Trash2 color={pathName === "/trash" ? "#fff" : "#000"} size={18} />
				<span className="font-medium ">Thùng rác</span>
			</Link>
		</div>
	);
};

export default DashboardProduct;
