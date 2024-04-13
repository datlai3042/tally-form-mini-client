"use client";
import React from "react";
import Portal from "../Portal";

type TProps = {
	children: React.ReactNode;
	zIndex?: number;
};

const WrapperAuthLayout = (props: TProps) => {
	const { children, zIndex } = props;

	const styleEffect = {
		_zIndex: zIndex ? zIndex : 500,
	};

	return (
		<Portal>
			<div
				style={{ zIndex: styleEffect._zIndex }}
				className="fixed top-0 xl:top-0 left-0 ] w-full min-h-full h-max pt-[100px] xl:pt-0 flex justify-center  xl:items-center bg-[rgba(0,0,0,.3)] px-[20px]"
			>
				{children}
			</div>
		</Portal>
	);
};

export default WrapperAuthLayout;