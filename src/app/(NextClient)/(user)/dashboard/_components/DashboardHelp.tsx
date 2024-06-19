"use client";
import { Book, LifeBuoy, MessageCircle, Navigation } from "lucide-react";
import Link from "next/link";
import React from "react";

const WorkItem = [
	{ Title: "Get started", Icon: <Navigation className="w-[1.8rem]" />, Href: "#" },
	{ Title: "How to guides", Icon: <Book className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Help center", Icon: <LifeBuoy className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Contact support", Icon: <MessageCircle className="w-[1.8rem]" />, Href: "#" },
];

const DashboardHelp = () => {
	return (
		<div className="flex flex-col gap-[.6rem] text-[1.4rem] ">
			<p className="pl-[.6rem] text-[1.2rem] text-textGray">Help</p>

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

export default DashboardHelp;
