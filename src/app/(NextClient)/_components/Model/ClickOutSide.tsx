import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

type TProps = {
	children: React.ReactElement;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const ClickOutSide = (props: TProps) => {
	const { children, setOpenModel } = props;

	const divWrapper = useRef<HTMLDivElement | null>(null);

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (divWrapper.current && !divWrapper.current.contains(e.target as Node)) {
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	useEffect(() => {
		document.addEventListener("click", globalClick);
		console.log("Check click outside");

		return () => {
			document.removeEventListener("click", globalClick);
			divWrapper.current = null;
		};
	}, [globalClick]);

	return (
		<div ref={divWrapper} className="w-max min-h-max ">
			{children}
		</div>
	);
};

export default ClickOutSide;
