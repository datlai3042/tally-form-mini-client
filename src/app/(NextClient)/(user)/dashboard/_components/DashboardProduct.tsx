"use client";
import { LayoutPanelTop, Map, SmilePlus, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

const WorkItem = [
	{ Title: "Tempaltes", Icon: <LayoutPanelTop className="w-[1.8rem]" />, Href: "#" },
	{ Title: "What's new", Icon: <Sparkles className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Roadmap", Icon: <Map className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Feedback", Icon: <SmilePlus className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Trash", Icon: <Trash2 className="w-[1.8rem]" />, Href: "#" },
];

const DashboardProduct = () => {
	return (
		<div className=" flex flex-col gap-[.6rem] text-[1.4rem] ">
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
