import React, { SetStateAction, useCallback, useEffect, useRef, useState } from "react";

type TProps = {
	children: React.ReactElement;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const ClickOutSide = (props: TProps) => {
	const { children, setOpenModel } = props;

	const divColorRef = useRef<HTMLDivElement | null>(null);

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (divColorRef.current && !divColorRef.current.contains(e.target as Node)) {
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	console.log("123");

	useEffect(() => {
		document.addEventListener("click", globalClick);

		return () => {
			document.removeEventListener("click", globalClick);
		};
	}, [globalClick]);

	return (
		<div ref={divColorRef} className="w-max min-h-max ">
			{children}
		</div>
	);
};

export default ClickOutSide;
