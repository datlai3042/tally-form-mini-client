"use client";
import { RootState } from "@/app/_lib/redux/store";
import { Toast } from "@/type";
import React, { createContext, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onUpdateToastGlobal } from "@/app/_lib/redux/features/toast.slice";
import { toast } from "@/components/ui/use-toast";
import ToastSuccessItem from "../ui/toast/toast_type/ToastSuccessItem";
import ToastStoreQueue from "../ui/toast/ToastStoreQueue";
import ToastWarningItem from "../ui/toast/toast_type/ToastWarningItem";
import ToastErrorItem from "../ui/toast/toast_type/ToastErrorItem";
import ToastFormAnswerItem from "../ui/toast/toast_type/ToastFormAnswerItem";

const ToastContext = createContext<Toast.ToastCore[]>([]);

const generateToastType = (toasts: Toast.ToastCore[]) => {
	return toasts.map((toast, i) => {
		if (toast.type === "SUCCESS") return <ToastSuccessItem index={i} key={toast._id} toast_item={toast} />;
		if (toast.type === "WARNING") return <ToastWarningItem index={i} key={toast._id} toast_item={toast} />;
		if (toast.type === "ERROR") return <ToastErrorItem index={i} key={toast._id} toast_item={toast} />;
		if (toast.type === "FormAnswer") return <ToastFormAnswerItem index={i} key={toast._id} toast_item={toast} />;
	});
};

const ToastProvider = () => {
	const toast_stack = useSelector((state: RootState) => state.toast.toast_stack);
	const toast_queue = useSelector((state: RootState) => state.toast.toast_queue);
	const toast_max_show = useSelector((state: RootState) => state.toast.toast_max_show);

	const toast_timer = useSelector((state: RootState) => state.toast.toast_timer);

	const renderToastStack = useMemo(() => generateToastType(toast_stack), [toast_stack]);
	const renderToastQueue = useMemo(() => generateToastType(toast_queue), [toast_queue]);
	if (toast_stack.length === 0 && toast_queue.length === 0) return;

	return (
		<div className="fixed z-[1000] right-0 top-0 w-[36rem]  mt-[2rem] px-[2rem]">
			<div className="relative max-h-screen flex flex-col gap-[2rem]">
				{renderToastStack}

				{toast_queue.length < 1 && renderToastQueue}
				{toast_queue.length >= 1 && <ToastStoreQueue />}
			</div>
		</div>
	);
};

export default ToastProvider;
