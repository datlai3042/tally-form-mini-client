import React, { useCallback, useEffect, useRef, useState } from "react";

type TProps = {
	children: React.ReactElement;
};

const ClickOutSide = (props: TProps) => {
	const { children } = props;
	const [outSide, setOutSide] = useState<boolean>(false);

	const divColorRef = useRef<HTMLDivElement | null>(null);

	console.log({ outSide });

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (divColorRef.current && !divColorRef.current.contains(e.target as Node)) {
				setOutSide(true);
			}
		},
		[setOutSide]
	);

	console.log("123");

	useEffect(() => {
		document.addEventListener("click", globalClick);

		return () => {
			document.removeEventListener("click", globalClick);
		};
	}, [globalClick]);

	return (
		<div ref={divColorRef} className="w-max h-max bg-blue-700">
			{" "}
			{React.cloneElement(children, { outSide })}
		</div>
	);
};

export default ClickOutSide;
