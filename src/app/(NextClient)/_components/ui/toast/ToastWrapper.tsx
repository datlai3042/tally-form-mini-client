import { onUpdateToastGlobal, removeOneToast } from "@/app/_lib/redux/features/toast.slice";
import { RootState } from "@/app/_lib/redux/store";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	children: React.ReactNode;
	toast_item_id: string;
};

const ToastWrapper = (props: TProps) => {
	const { children, toast_item_id } = props;

	const timer = useRef<NodeJS.Timeout | null>(null);
	const toast_timer = useSelector((state: RootState) => state.toast.toast_timer);
	const toast_queue = useSelector((state: RootState) => state.toast.toast_queue);

	const dispatch = useDispatch();

	useEffect(() => {
		if (toast_queue.some((toast) => toast._id === toast_item_id)) return;
		timer.current = setTimeout(() => {
			dispatch(removeOneToast({ toast_item_id }));
		}, toast_timer * 1000);

		return () => {
			clearTimeout(timer.current as NodeJS.Timeout);
		};
	}, []);

	return <div className="w-full min-h-[8rem] h-max ">{children}</div>;
};

export default ToastWrapper;
