import { Toast } from "@/type";
import React, { useEffect, useRef, useState } from "react";
import ToastWrapper from "../ToastWrapper";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { removeOneToast } from "@/app/_lib/redux/features/toast.slice";
import { X } from "lucide-react";

type TProps = {
	toast_item: Toast.ToastSuccess.ToastSuccessCore;
	index: number;
};

const ToastSuccessItem = (props: TProps) => {
	const { toast_item, index } = props;
	const toast_timer = useSelector((state: RootState) => state.toast.toast_timer);

	const [count, setCount] = useState<number>(toast_timer);

	const timer = useRef<NodeJS.Timeout | null>(null);

	const dispatch = useDispatch();

	useEffect(() => {
		timer.current = setInterval(() => {
			setCount((prev) => {
				return (prev -= 1);
			});
		}, 1000);

		return () => {
			clearInterval(timer.current as NodeJS.Timeout);
		};
	}, []);

	const onDeleteToast = () => {
		dispatch(removeOneToast({ toast_item_id: toast_item._id }));
	};

	return (
		<ToastWrapper toast_item_id={toast_item._id} indexItem={index}>
			<div className="relative min-h-[10rem] h-max p-[1rem] flex justify-between rounded-xl  bg-[#444] text-[#fff] text-[1.4rem]">
				<button
					onClick={onDeleteToast}
					className="absolute right-[-1.5rem] top-[-1.5rem] w-[3rem] h-[3rem]  rounded-full bg-green-600 flex items-center justify-center"
				>
					<X size={18} color="white" />
				</button>
				<div className="border-l-[.6rem] border-green-600 pl-[2rem] flex flex-col min-w-[70%] max-w-[80%] gap-[1rem]">
					<span className=" text-green-600  font-extrabold max-w-[90%] break-words">
						{toast_item.toast_title.toUpperCase()}
					</span>
					<span className="opacity-80 font-semibold max-w-[90%] break-words">{toast_item.core.message}</span>
				</div>
				<div className="flex flex-col items-center justify-between gap-[.4rem]">
					<Image
						src={"/assets/images/icon/toast/toast_success.png"}
						width={50}
						height={50}
						alt="toast success"
						className="min-w-[5rem] h-[5rem]"
					/>
					<div className="bg-green-600 text-[#fff] w-[2.6rem] h-[2.6rem] text-[1.3rem] rounded-full flex items-center justify-center ">
						{count}
					</div>
				</div>
			</div>
		</ToastWrapper>
	);
};

export default ToastSuccessItem;
