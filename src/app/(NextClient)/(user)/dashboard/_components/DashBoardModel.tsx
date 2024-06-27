"use client";
import { ChevronDown, Flower, Globe, Search, Settings, Users } from "lucide-react";
import Link from "next/link";
import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

const WorkItem = [
	{ Title: "Trang chủ", Icon: <Flower className="w-[1.8rem]" />, Href: "/" },
	{ Title: "Tìm kiếm", Icon: <Search className="w-[1.8rem]" />, Model: "search" },
	{ Title: "Cài đặt", Icon: <Settings className="w-[1.8rem]" />, Href: "/settings" },
];

type TProps = {
	setOpenSmallModel: React.Dispatch<SetStateAction<boolean>>;
};

const DashBoardModel = (props: TProps) => {
	const { setOpenSmallModel } = props;

	const [openModelDomain, setOpenModelDomain] = useState<boolean>(false);
	const [openModelSearch, setopenModelSearch] = useState<boolean>(false);
	const divRef = useRef<HTMLDivElement>(null);

	const controllShowResultSearch = useCallback((e: MouseEvent) => {
		if (divRef.current && !divRef.current.contains(e.target as Node)) {
			setOpenSmallModel(false);
		}
	}, []);

	useEffect(() => {
		document.addEventListener("click", controllShowResultSearch);
		return () => {
			document.removeEventListener("click", controllShowResultSearch);
		};
	}, [controllShowResultSearch]);

	return (
		<div
			className=" absolute z-[2] right-0 w-[20rem] min-h-[10rem] py-[1rem] h-max bg-[#ffffff] rounded-lg border-[.1rem] border-gray-200 shadow-lg flex flex-col gap-[.5rem] text-[1.4rem]"
			ref={divRef}
		>
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
				if (work.Model === "users")
					return (
						<button
							key={work.Title}
							className="p-[.2rem_.8rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md"
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
							className="p-[.2rem_.8rem] flex items-center gap-[1rem] hover:bg-slate-200 rounded-md"
							onClick={() => setopenModelSearch(true)}
						>
							{work.Icon}
							<span className="font-medium text-slate-600">{work.Title}</span>
						</button>
					);
			})}
		</div>
	);
};

export default DashBoardModel;
