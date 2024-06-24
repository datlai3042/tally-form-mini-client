import { resetQueueToast } from "@/app/_lib/redux/features/toast.slice";
import { RootState } from "@/app/_lib/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ToastStoreQueue = () => {
	const toast_queue = useSelector((state: RootState) => state.toast.toast_queue);
	const dispatch = useDispatch();
	const onResetQueueToast = () => {
		dispatch(resetQueueToast());
	};

	return (
		<div className="absolute bottom-[2rem] border-[.1rem] border-gray-200 rounded-md p-[1rem_2rem] min-h-[10rem] w-full text-[1.6rem] flex flex-col justify-between">
			<p>
				Số toast đang lưu trữ <span>{toast_queue.length}</span>
			</p>
			<button
				onClick={onResetQueueToast}
				className="text-left bg-slate-800 max-w-[20rem] h-[4rem] text-[#ffffff] p-[1rem] rounded-lg flex items-center"
			>
				Reset hàng đợi
			</button>
		</div>
	);
};

export default ToastStoreQueue;
