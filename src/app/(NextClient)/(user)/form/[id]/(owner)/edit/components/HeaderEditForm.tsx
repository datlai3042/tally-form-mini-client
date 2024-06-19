"use client";
import React, { useContext } from "react";
import { ChevronRight, ChevronsRight, Flower, Search, Settings } from "lucide-react";
import { RootState } from "@/app/_lib/redux/store";
import { useSelector } from "react-redux";

import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { SidebarContext } from "@/app/(NextClient)/(user)/dashboard/SidebarContext";
import { useSelectedLayoutSegment } from "next/navigation";

import { FormCore } from "@/type";

import Link from "next/link";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";

type TProps = {
	showHeaderAction: boolean;
};

const HeaderEditForm = (props: TProps) => {
	const { showHeaderAction } = props;

	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const onSetScreen = () => {
		if (modeScreen === "FULL") return setModeScreen("NORMAL");
		setModeScreen("FULL");
		setOpenSidebar(false);
	};

	const styleEffect = {
		onCheckLengthTitle: () => {
			return formCore?.form_title ? "w-max max-w-[9rem] xl:max-w-[20rem]" : "w-max";
		},
	};

	if (modeScreen === "FULL") return null;

	return (
		<DivNative className="relative z-[101] w-full h-[5rem] p-[.8rem_1.8rem]  flex items-center justify-between gap-[1rem] text-[1.3rem]">
			<DivNative className="h-[3.6rem] flex items-center   text-textHeader ">
				{!openSidebar && <ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />}
				<Link href={"/dashboard"}>
					<Flower className="w-[2.8rem] h-full p-[.3rem] rounded-lg hover:bg-slate-300 hover:text-slate-800" />
				</Link>
				<DivNative className="h-full flex  items-center  ">
					<ButtonIcon Icon={<ChevronRight size={16} />} />
					<ParagraphNative
						className="hidden sm:block text-[1.5rem] font-bold p-[.6rem] rounded-lg hover:bg-slate-300 hover:text-slate-800"
						textContent="My workspace"
					/>
				</DivNative>
				<DivNative className="h-full flex  items-center gap-[.1rem] ">
					<ButtonIcon Icon={<ChevronRight size={16} />} />
					<ParagraphNative
						className={`${styleEffect.onCheckLengthTitle()} truncate text-[1.5rem] font-bold p-[.6rem] rounded-lg hover:bg-slate-300 hover:text-slate-800 `}
						textContent={formCore?.form_title.form_title_value || "Untitled"}
					/>
				</DivNative>
			</DivNative>
			{showHeaderAction && (
				<DivNative className="flex gap-[1rem]">
					<DivNative className=" flex items-center justify-center " title="Review">
						<ButtonNative
							textContent={`Xem trước  `}
							className="p-[.8rem] rounded-md text-slate-700 opacity-70 hover:opacity-80"
							onClick={onSetScreen}
						/>
					</DivNative>

					<DivNative className="flex items-center justify-center " title="Publish">
						<ButtonNative textContent="Publish" className="p-[.8rem] rounded-md bg-slate-400 text-white" />
					</DivNative>

					<DivNative
						className="p-[.2rem_.8rem] hidden xl:flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
						title="Tìm kiếm"
					>
						<Search className="w-[1.6rem]" />
						<SpanNative textContent="Search" />
					</DivNative>

					<Link
						href={"/settings"}
						className="p-[.2rem_.8rem] hidden xl:flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
						title="Cài đặt"
					>
						<Settings className="w-[1.6rem]" />
					</Link>
				</DivNative>
			)}
		</DivNative>
	);
};

export default HeaderEditForm;
