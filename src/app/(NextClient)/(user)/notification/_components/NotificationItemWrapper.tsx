import { Trash2 } from "lucide-react";
import React from "react";

type TProps = {
	children: React.ReactNode;
	callbackDelete: () => void;
};

const NotificationItemWrapper = (props: TProps) => {
	const { children, callbackDelete } = props;

	return (
		<div className="relative h-max p-[2rem_1rem] xl:p-[2rem_1.8rem] flex flex-col xl:flex-row xl:items-center gap-[2rem] hover:bg-blue-300 transition-all duration-300 rounded-xl hover:cursor-pointer">
			{children}

			<button
				onClick={callbackDelete}
				className="xl:ml-auto w-max flex items-center gap-[1rem] p-[.5rem_.7rem] hover:bg-[#ffffff] hover:text-red-600 rounded-lg"
			>
				<Trash2 size={20} />
			</button>
		</div>
	);
};

export default NotificationItemWrapper;
