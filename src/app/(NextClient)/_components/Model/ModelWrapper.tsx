"use client";
import React, { useCallback, useEffect, useRef } from "react";
import Portal from "../Portal";
import DivNative from "../ui/NativeHtml/DivNative";
import DivNativeRef from "../ui/NativeHtml/DivNativeRef";
import { ReactCustom } from "@/type";

type TProps = {
	ModelHeight: string;
	ModelWidth: string;
	ModelWrapperOpacity?: string;
	ModelBackgroud?: string;
	ModelOpacity?: string;
	ModelRounded?: string;
	children: React.ReactNode;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const ModelWrapper = (props: TProps) => {
	const {
		ModelWidth,
		ModelHeight,
		ModelWrapperOpacity = "bg-[rgba(0,0,0,.7)]",
		ModelBackgroud = "bg-[#ffffff]",
		ModelOpacity = ".8",
		ModelRounded = "rounded-[.8rem]",
		children,
		setOpenModel,
	} = props;
	const modelRef = useRef<HTMLDivElement | null>(null);
	const styleProps = `${ModelWidth} ${ModelHeight} ${ModelBackgroud} ${ModelOpacity} ${ModelOpacity} ${ModelRounded}`;

	const checkDocumentClick = useCallback(
		(e: MouseEvent) => {
			if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
				console.log("check");
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	useEffect(() => {
		document.addEventListener("click", checkDocumentClick);

		return () => {
			document.removeEventListener("click", checkDocumentClick);
		};
	}, [checkDocumentClick]);

	return (
		<Portal>
			<DivNative
				className={`${ModelWrapperOpacity}  fixed z-[500] inset-0 w-full min-h-screen h-max  xl:pt-0  px-[20px] flex justify-center items-center  `}
			>
				<DivNativeRef ref={modelRef} className={`${styleProps}`}>
					{children}
				</DivNativeRef>
			</DivNative>
		</Portal>
	);
};

export default ModelWrapper;
