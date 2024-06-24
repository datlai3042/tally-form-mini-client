"use client";
import { LayoutPanelTop, Map, SmilePlus, Sparkles, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
	return (
		<div className=" flex flex-col gap-[.6rem]  ">
			<p className="pl-[.6rem] text-[1.2rem] text-textGray">Product</p>

			{WorkItem.map((work) => {
				if (work.Href)
					return (
						<Link
							key={work.Title}
							href={work.Href}
							className="p-[.2rem_.8rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md"
						>
							{work.Icon}
							<span className="font-medium text-slate-600">{work.Title}</span>
						</Link>
					);
			})}
		</div>
	);
};

export default DashboardProduct;
