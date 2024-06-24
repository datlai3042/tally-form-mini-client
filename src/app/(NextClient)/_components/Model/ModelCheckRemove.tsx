"use client";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";
import ClickOutSide from "./ClickOutSide";

type TProps = {
	content: string;
	callbackCancel: React.Dispatch<SetStateAction<boolean>>;
	callbackAction: () => void;
};

const ModelCheckRemove = (props: TProps) => {
	const { content, callbackAction, callbackCancel } = props;

	return (
		<div className="fixed z-[50] inset-0 w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,.6)]">
			<div className="w-[40rem] min-h-[12rem]">
				<ClickOutSide setOpenModel={callbackCancel}>
					<div className="relative w-[40rem] min-h-full h-max  bg-[#ffffff] rounded-lg text-[#000] p-[2rem] flex flex-col justify-between">
						<button
							onClick={() => callbackCancel(false)}
							className="absolute right-[-1.5rem] top-[-1.5rem] w-[3rem] h-[3rem]  rounded-full bg-green-500 flex items-center justify-center"
						>
							<X size={18} color="white" />
						</button>
						<p className="text-[1.4rem] leading-10">{content}</p>
						<div className="mt-[2rem] flex gap-[1rem] ml-auto text-[1.3rem]">
							<button className="p-[1rem] h-[3rem] flex items-center justify-center bg-green-500 text-[#fff] rounded-lg">
								Hủy bỏ
							</button>
							<button
								onClick={callbackAction}
								className="p-[1rem] h-[3rem] flex items-center justify-center hover:bg-red-500 hover:text-[#fff] text-red-400 rounded-lg"
							>
								Vẫn xóa
							</button>
						</div>
					</div>
				</ClickOutSide>
			</div>
		</div>
	);
};

export default ModelCheckRemove;
