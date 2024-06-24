import { Toast } from "@/type";
import React from "react";

type TProps = {
	toast_item: Toast.ToastCore;
};

const ToastItem = (props: TProps) => {
	const { toast_item } = props;

	return (
		<div className="bg-[#ffffff] p-[2rem] flex flex-col gap-[2rem] ">
			<span>{toast_item._id}</span>
			{/* <span>{toast_item.message}</span> */}
		</div>
	);
};

export default ToastItem;
