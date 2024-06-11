"use client";
import { RootState } from "@/app/_lib/redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import FormTitleImage from "../../form/[id]/(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";
import { FormCore } from "@/type";
import ModelShowImage from "./ModelShowImage";

type TProps = {
	images: string[] | FormCore.Title.FormTitleSub[];
	type: "stringUrl" | "Components";
	page: "Edit" | "Answer";
	colorMain: string;
};

const SliderImage = (props: TProps) => {
	const { images, type, page, colorMain } = props;

	const [indexImage, setIndexImage] = useState<number>(0);
	const [showImageModel, setShowImageModel] = useState<boolean>(false);

	const divContainerRef = useRef<HTMLDivElement | null>(null);

	const divRef = useRef<HTMLDivElement | null>(null);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const handleIncrease = () => {
		console.log("OK");
		if (indexImage + 1 === formCore.form_title.form_title_sub.length) return;
		setIndexImage((prev) => (prev += 1));
	};

	const handleDecrease = () => {
		console.log("OK", indexImage);

		if (indexImage + 1 === 1) return;
		setIndexImage((prev) => (prev -= 1));
	};

	const iamgeChange = (index: number) => {
		if (divRef.current && divContainerRef.current) {
			const width = divContainerRef.current?.getBoundingClientRect().width * -1;
			divRef.current.style.transform = `translateX(${width * index}px)`;
			divRef.current.style.transition = "all 0s";
			setIndexImage(index);
		}
	};

	useEffect(() => {
		console.log({ indexImage });
		if (divRef.current && divContainerRef.current) {
			const width = divContainerRef.current?.getBoundingClientRect().width * -1;
			divRef.current.style.transform = `translateX(${width * indexImage}px)`;
			divRef.current.style.transition = "all 0s";
		}
	}, [indexImage]);

	const widthPage = page === "Edit" ? "w-[35rem] sm:w-[50rem] xl:w-[80rem] w-full" : "w-[62rem]";

	return (
		<div
			ref={divContainerRef}
			className={`${widthPage} relative  pb-[6rem] h-max overflow-y-hidden overflow-x-hidden`}
		>
			<button
				style={{ backgroundColor: colorMain }}
				disabled={indexImage + 1 >= images.length}
				onClick={handleIncrease}
				className="absolute top-[50%] translate-y-[-50%] right-0 z-[100] w-[4rem] h-[4rem] flex items-center justify-center  border-[.1rem]  rounded-full disabled:hover:cursor-not-allowed"
			>
				<ChevronRight color="white" />
			</button>
			<div ref={divRef} className="min-w-full h-max w-max  flex pb-[5rem]  ">
				{type === "stringUrl" &&
					(images as string[]).map((image) => (
						<Image
							src={image}
							key={image}
							width={150}
							height={200}
							quality={100}
							alt="form iamge"
							className="!min-w-full w-[15rem] !h-[30rem] object-contain object-center "
						/>
					))}

				{type === "Components" &&
					(images as FormCore.Title.FormTitleSub[]).map((img) => (
						<div key={img._id} className="w-full min-h-[80%]" onClick={() => setShowImageModel(true)}>
							<FormTitleImage mode="Slider" page={page} subTitleItem={img} className="!min-h-full " />
						</div>
					))}
			</div>
			{showImageModel && (
				<ModelShowImage
					imageActive={(images as FormCore.Title.FormTitleSub[])[indexImage].value}
					imagesUrl={(images as FormCore.Title.FormTitleSub[]).map((img) => img.value)}
					setOpenModel={setShowImageModel}
				/>
			)}

			<button
				style={{ backgroundColor: colorMain }}
				disabled={indexImage === 0}
				onClick={handleDecrease}
				className="absolute top-[50%] translate-y-[-50%] left-0 w-[4rem] h-[4rem] flex items-center justify-center bg-[#ffffff] border-[.1rem]  rounded-full disabled:hover:cursor-not-allowed"
			>
				<ChevronLeft color="white" />
			</button>
			<div className="absolute bottom-[0rem]  left-[50%] translate-x-[-50%] flex gap-[2rem]">
				{images.map((btn, i) => (
					<button
						key={i}
						className="w-[1.6rem] h-[1.6rem] flex items-center justify-center rounded-full bg-slate-200 "
						onClick={() => setIndexImage(i)}
					>
						{i === indexImage && (
							<p style={{ backgroundColor: colorMain }} className="w-[60%] h-[60%] rounded-full "></p>
						)}
					</button>
				))}
			</div>
			{type === "Components" && (
				<div className="absolute bottom-[4rem]  left-[50%] translate-x-[-50%] flex gap-[2rem] hover:cursor-pointer">
					{(images as FormCore.Title.FormTitleSub[]).map((img, i) => (
						<div
							key={img._id}
							onClick={() => iamgeChange(i)}
							className="relative group w-[7rem] h-[7rem] rounded-lg overflow-hidden"
						>
							<Image
								src={img.value}
								width={70}
								height={70}
								alt="image form"
								className={`${
									i === indexImage ? "z-[3]" : ""
								} group-hover:z-[3] transition-all duration-500 absolute inset-0 w-full h-full  flex items-center justify-center  bg-[#000000] opacity-75 `}
							/>
							<div className=" absolute inset-0 bg-[rgba(0,0,0,.6)] z-[2]"></div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default SliderImage;
