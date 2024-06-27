"use client";

import { RootState } from "@/app/_lib/redux/store";
import { Copy } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import BoxCopySuccess from "../../_components/BoxCopySuccess";

const ShareFormPage = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const [focus, setFocus] = useState<boolean>(false);
	const [copySuccess, setCopySuccess] = useState<boolean>(false);

	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const styleEffect = {
		onFocus: (check: boolean) => {
			if (!check) return " border-slate-200";
			return " border-blue-400 outline-[4px] outline-blue-400";
		},
	};

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
		<div className="mt-[2rem] w-full xl:w-[70%] flex flex-col gap-[2rem] text-text-theme">
			<h2 className="text-[1.8rem] font-bold">Chia sẽ Link</h2>
			<p className="text-justify text-[1.4rem] opacity-80">
				Form của bạn đã được xây dựng xong, hãy chia sẽ Link qua các trang mạng xã hội hoặc các ứng dụng tin
				nhắn để tương tác thêm với mọi người.
			</p>

			<input
				onFocus={() => setFocus(true)}
				onBlur={() => setFocus(false)}
				className={`${styleEffect.onFocus(
					focus
				)} ml-[1rem] w-full h-[4rem] px-[1rem] flex items-center text-[1.2rem] xl:text-[1.4rem] border-[.2rem] hover:border-blue-400  rounded-lg outline-none text-color-main font-semibold`}
				value={`${window.location.origin}/form/${formCore._id}`}
				readOnly={true}
			/>

			<div className="relative w-max h-[3rem] ">
				<button
					onClick={() =>
						navigator.clipboard
							.writeText(`${window.location.origin}/form/${formCore._id}`)
							.then(() => setCopySuccess(true))
					}
					className="w-full h-full px-[1rem] flex items-center gap-[1rem] rounded-lg bg-slate-900 text-[#ffffff] "
				>
					<Copy size={16} />
					Copy
				</button>
				{copySuccess && (
					<div className="absolute bottom-[-4rem] left-0 ">
						<BoxCopySuccess message="Copy link chia sẽ thành công" />
					</div>
				)}
			</div>
		</div>
	);
};

export default ShareFormPage;
