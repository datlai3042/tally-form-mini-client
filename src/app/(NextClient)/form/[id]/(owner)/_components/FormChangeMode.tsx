import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { FormPageMode } from "../layout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { LinkIcon, Pencil } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BoxCopySuccess from "./BoxCopySuccess";

type TProps = {
	formPageMode: FormPageMode;
	setFormPageMode: React.Dispatch<SetStateAction<FormPageMode>>;
	children: React.ReactNode;
};

const iconSize = 16;

const FormChangeMode = (props: TProps) => {
	const { children, formPageMode, setFormPageMode } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const router = useRouter();

	const fontSize = formCore.form_title.form_title_size
		? formCore.form_title.form_title_size / 10 + "rem"
		: formCore.form_setting_default.form_title_size_default / 10 + "rem";

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	const fontStyle = formCore.form_title.form_title_style
		? formCore.form_title.form_title_style
		: formCore.form_setting_default.form_title_style_default;

	const avatarSrc =
		formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url || "";

	const styleEffect = {
		linkActive: (checkLink: boolean) => {
			if (!checkLink) return "border-transparent";
			return "border-text-theme font-bold";
		},
	};

	const [copySuccess, setCopySuccess] = useState<boolean>(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (copySuccess) {
			const time = 3000;
			timeoutRef.current = setTimeout(() => setCopySuccess(false), time);
		}

		return () => {
			clearTimeout(timeoutRef.current as NodeJS.Timeout);
		};
	}, [copySuccess]);

	return (
		<div className=" w-full p-[6rem]  mx-auto h-full flex  flex-col gap-[2rem] text-text-theme">
			<div className="w-full flex justify-between">
				<h1
					title={formCore.form_title.form_title_value}
					className="line-clamp-2 w-[80%] text-text-theme"
					style={{
						fontSize,
						fontStyle,
					}}
				>
					{formCore?.form_title?.form_title_value}
				</h1>
				<div className="flex items-center gap-[1rem]">
					<div className="relative ">
						<button
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								navigator.clipboard
									.writeText(`${window.location.origin}/form/${formCore._id}`)
									.then(() => setCopySuccess(true));
							}}
							className="flex items-center gap-[1rem] p-[.5rem_.7rem] hover:bg-color-main rounded-lg"
						>
							<LinkIcon size={iconSize} />
						</button>
						{copySuccess && (
							<div className="absolute bottom-[-4rem] left-[-10rem] xl:left-0 ">
								<BoxCopySuccess message="Copy link chia sẽ thành công" />
							</div>
						)}
					</div>

					{avatarSrc ? (
						<Image
							src={avatarSrc}
							width={30}
							height={30}
							alt="avatar"
							className="w-[3rem] h-[3rem] rounded-full"
						/>
					) : (
						<div className="animate-pulse w-[3rem] h-[3rem] rounded-full bg-slate-200 "></div>
					)}

					<button
						className="flex items-center gap-[1rem] p-[.5rem_.7rem] hover:bg-color-main rounded-lg"
						onClick={(e) => {
							e.preventDefault();
							router.push(`/form/${formCore._id}/edit`);
						}}
					>
						<Pencil size={iconSize} />
						<span>Edit</span>
					</button>
				</div>
			</div>

			<div className="w-full h-max flex items-center gap-[2rem] text-[1.4rem] border-b-[.1rem] border-slate-200 text-text-theme">
				<Link
					onClick={() => setFormPageMode("summary")}
					href={`/form/${formCore._id}/summary`}
					className={`${styleEffect.linkActive(
						formPageMode === "summary"
					)} border-b-[.2rem] pb-[.5rem] font-semibold  hover:border-slate-500 `}
				>
					Bản tóm tắt
				</Link>

				<Link
					onClick={() => setFormPageMode("submit")}
					href={`/form/${formCore._id}/submit`}
					className={`${styleEffect.linkActive(
						formPageMode === "submit"
					)} border-b-[.2rem] pb-[.5rem] font-semibold  hover:border-slate-500 `}
				>
					Bản đầy đủ
				</Link>

				<Link
					onClick={() => setFormPageMode("share")}
					href={`/form/${formCore._id}/share`}
					className={`${styleEffect.linkActive(
						formPageMode === "share"
					)} border-b-[.2rem] pb-[.5rem] font-semibold  hover:border-slate-500 `}
				>
					Chia sẽ
				</Link>
			</div>

			<div className="overflow-scroll scroll-color-main pr-[2rem]">
				<div className="mt-[1rem]">{children}</div>
			</div>
		</div>
	);
};

export default FormChangeMode;
