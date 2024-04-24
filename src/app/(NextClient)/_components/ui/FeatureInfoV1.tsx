import { TextCursorInput } from "lucide-react";
import Image from "next/image";
import React from "react";
import SliderImages from "./SliderImages";
import ImageAndText, { PostionHighlight } from "./ImageAndText";

type ModeSlider = {
	mode: "SLIDER";
	ImagePathArray: string[];
	DescriptionBgImg?: string;
};

type ModeImage = {
	mode: "IMAGE";
	ImagePath: string;
};

type Mode = ModeSlider | ModeImage;

type TProps = {
	BeforeTextHighlight?: string;
	TextHighlight?: string;
	AfterTextHighlight?: string;
	ImageHighlight?: string;
	ImageRight?: string;
	TextSub?: string;
	HiddenTextArea?: boolean;
	DescriptionIcon: React.ReactNode;
	DescriptionText: string;
	DescriptionTextSub: string;
	Mode: Mode;
	Postion: PostionHighlight;
};

const FeatureInfoV1 = (props: TProps) => {
	const {
		BeforeTextHighlight,
		TextHighlight,
		AfterTextHighlight,
		ImageHighlight = "",
		TextSub,
		HiddenTextArea = false,
		ImageRight,
		DescriptionIcon,
		DescriptionText,
		DescriptionTextSub,
		Mode,
		Postion,
	} = props;

	const styleEffect = {
		onCheckMode: () => (Mode.mode === "SLIDER" ? `url(${Mode.DescriptionBgImg})` : ""),
	};

	return (
		<div className="w-full h-full max-h-max flex flex-col  gap-[24px]">
			{!HiddenTextArea && (
				<ImageAndText
					BeforeTextHighlight={BeforeTextHighlight}
					TextHighlight={TextHighlight}
					AfterTextHighlight={AfterTextHighlight}
					TextSub={TextSub}
					ImageHighlight={ImageHighlight}
					ImageRight={ImageRight}
					Position={Postion}
				/>
			)}

			<div className="border-shadow-normal flex-1 justify-items-stretch h-full w-full  !rounded-xl flex flex-col  overflow-hidden ">
				<div className="p-[36px] pb-[30px] flex flex-col gap-[20px]">
					{DescriptionIcon}
					<h3 className="text-h3 break-words ">{DescriptionText}</h3>
					<p className="text-[1.6rem]">{DescriptionTextSub}.</p>
				</div>
				<div className="flex-1 flex items-stretch " style={{ backgroundImage: styleEffect.onCheckMode() }}>
					{Mode.mode === "SLIDER" && Mode.DescriptionBgImg && (
						<div className="border-shadow-normal mt-[3%] ml-0 xl:ml-[16%] min-h-full pl-0 xl:pl-[40px] flex items-center justify-center bg-[#ffffff]  ">
							<div className="w-full xl:w-[850px] min-h-full   ">
								<SliderImages Images={Mode.ImagePathArray} duration={3000} />
							</div>
						</div>
					)}

					{Mode.mode === "SLIDER" && !Mode.DescriptionBgImg && (
						<div className="border-shadow-normal flex items-center justify-center px-[50px] h-full  bg-[#ffffff] ">
							<SliderImages Images={Mode.ImagePathArray} duration={3000} />
						</div>
					)}
					{Mode.mode === "IMAGE" && (
						<div className=" pl-[40px] flex-1 h-full w-full ">
							<Image
								className="border-shadow-normal !min-w-full min-h-full object-contain "
								src={Mode.ImagePath}
								width={908}
								height={646}
								alt="description"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeatureInfoV1;
