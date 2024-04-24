"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

type TProps = {
	Images: string[];
	duration: number;
};

//timeout -> chay sao time -> 3s
//interval -> cu time-> 3s

const SliderImages = (props: TProps) => {
	const { Images, duration } = props;

	const [imageIndex, setImageIndex] = useState<number>(0);

	const intervalId = useRef<NodeJS.Timeout | null>(null);
	const timeOutId = useRef<NodeJS.Timeout | null>(null);
	const timeOutId2 = useRef<NodeJS.Timeout | null>(null);

	const image = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		if (image.current) {
			image.current.style.opacity = "0";
			image.current.style.visibility = "hidden";
		}
		intervalId.current = setInterval(() => {
			if (imageIndex === Images.length - 1) {
				setImageIndex(0);
				return;
			}

			setImageIndex((index) => index + 1);
		}, duration);
		return () => {
			clearInterval(intervalId.current as NodeJS.Timeout);
		};
	}, [imageIndex, Images.length, duration]);

	useEffect(() => {
		timeOutId2.current = setTimeout(() => {
			if (image.current) {
				image.current.style.opacity = "0";
				image.current.style.visibility = "visible";
			}
		}, 300);
		timeOutId.current = setTimeout(() => {
			if (image.current) {
				image.current.style.visibility = "visible";

				image.current.style.opacity = "1";
			}
		}, 400);

		return () => {
			clearTimeout(timeOutId2.current as NodeJS.Timeout);

			clearTimeout(timeOutId.current as NodeJS.Timeout);
		};
	}, [imageIndex]);

	return (
		<Image
			className="!min-w-full h-full opacity-0 transition-all duration-500   object-cover "
			src={Images[imageIndex]}
			width={1800}
			height={500}
			alt="slider index"
			ref={image}
		/>
	);
};

export default SliderImages;
