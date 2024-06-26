"use client";
import React, { useContext, useState } from "react";
import { Bell, ChevronRight, ChevronsRight, Flower, Search, Settings } from "lucide-react";
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
import useChangeModeForm from "@/app/hooks/useChangeModeForm";
import ModelFormState from "./ModelFormState";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import Image from "next/image";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

type TProps = {
	showHeaderAction: boolean;
};

const renderText = (form_state: FormCore.FormState) => {
	let textMessage = "";
	if (form_state === "isPublic") textMessage = "Công khai";
	if (form_state === "isPrivate") textMessage = "Riêng tư";
	if (form_state === "isDelete") textMessage = "Xóa";
	return textMessage;
};
const HeaderEditForm = (props: TProps) => {
	const { showHeaderAction } = props;

	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);
	const { openFormDesign } = useContext(FormDesignContext);

	const [openModelFormState, setOpenModelFormState] = useState<boolean>(false);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const onSetScreen = () => {
		if (modeScreen === "FULL") return setModeScreen("NORMAL");
		setModeScreen("FULL");
		setOpenSidebar(false);
	};

	const styleEffect = {
		onCheckLengthTitle: () => {
			return formCore?.form_title ? "w-max max-w-[9rem] xl:max-w-[20rem]" : "w-max";
		},

		onCheckWidthHeader: () => {
			if (openFormDesign && !openSidebar) return "w-[78%]";
			if (openSidebar && !openFormDesign) return "w-full sm:w-[65%] xl:w-[86%] xl:left-[14%]";
			if (openSidebar && openFormDesign) return "w-full sm:w-[65%] xl:w-[68%] xl:left-[14%]";
			return "w-full";
		},
	};

	const label = renderText(formCore.form_state);

	if (modeScreen === "FULL") return null;

	return (
		<DivNative
			className={`${styleEffect.onCheckWidthHeader()}  bg-[#fff] fixed  z-[101]  h-[5rem] p-[.8rem_1.8rem]  flex items-center justify-between gap-[1rem] text-[1.3rem]`}
		>
			<DivNative className="h-[3.6rem] flex items-center   text-textHeader ">
				{!openSidebar && <ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />}
				<Link href={"/dashboard"} className="hover:bg-gray-200 p-[.6rem] rounded-xl">
					<Image
						src={"/assets/images/icon/navigation/home2.png"}
						width={18}
						height={18}
						alt="icon"
						className="w-[2.4rem] h-[2.4rem]"
					/>{" "}
				</Link>
				<DivNative className="h-full hidden xl:flex  items-center  ">
					<ButtonIcon Icon={<ChevronRight size={16} />} />
					<ParagraphNative
						className="hidden sm:block text-[1.5rem] font-bold p-[.6rem] rounded-lg hover:bg-gray-100 hover:text-slate-800"
						textContent="Nơi làm việc"
					/>
				</DivNative>
				<DivNative className="h-full flex  items-center gap-[.1rem] ">
					<ButtonIcon Icon={<ChevronRight size={16} />} />
					<ParagraphNative
						className={`${styleEffect.onCheckLengthTitle()} truncate text-[1.5rem] font-bold p-[.6rem] rounded-lg hover:bg-gray-100 hover:text-slate-800 `}
						textContent={formCore?.form_title.form_title_value || "Không tiêu đề"}
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

					<DivNative
						className="relative  z-[103] xl:z-[105]  flex items-center justify-center "
						title="Publish"
					>
						<ButtonNative
							textContent={label}
							className="color-core p-[.8rem] rounded-md bg-slate-400 text-white"
							onClick={() => setOpenModelFormState((prev) => !prev)}
						/>
						{openModelFormState && (
							<div className="absolute z-[105] h-max min-w-full w-max top-[120%] right-0">
								<ClickOutSide setOpenModel={setOpenModelFormState}>
									<ModelFormState />
								</ClickOutSide>
							</div>
						)}
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
