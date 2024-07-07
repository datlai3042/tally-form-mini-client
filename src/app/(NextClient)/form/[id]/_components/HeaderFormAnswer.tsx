import { renderStyleTitleCore } from "@/app/_lib/utils";
import { FormCore } from "@/type";
import React, { useContext } from "react";
import FormTitleImage from "../(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";
import SliderImage from "@/app/(NextClient)/_components/Model/SliderImage";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";

type TProps = {
	formCore: FormCore.Form;
};

const HeaderFormAnswer = (props: TProps) => {
	const { formCore } = props;

	const {
		formAnswer: { inputFormRequire },
	} = useContext(FormAnswerContext);

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
	const checkMode: FormCore.FormTitle["form_title_mode_image"] = "Slider";

	let flag = false;

	return (
		<header
			style={{ borderTopColor: colorMain }}
			className="w-full min-h-[14rem] m h-max p-[1.8rem] flex flex-col gap-[.4rem]   break-words	 border-t-[1rem]  bg-[#ffffff] rounded-2xl"
		>
			<h1 className="text-[3.6rem] font-extrabold ">{formCore.form_title.form_title_value}</h1>

			{formCore.form_title.form_title_sub.map((ft) => {
				if (ft.type === "Text" && ft?.core?.value)
					return (
						<span key={ft._id} className="text-[1.4rem] text-justify leading-10">
							{ft.core.value}
						</span>
					);
				if (ft.type === "Image") {
					if (formCore.form_title.form_title_mode_image !== checkMode) {
						return <FormTitleImage mode="Normal" page={"Answer"} subTitleItem={ft} key={ft._id} />;
					}

					if (formCore.form_title.form_title_mode_image === "Slider" && !flag) {
						flag = true;
						const images = formCore.form_title.form_title_sub.filter(
							(image) => image.type === "Image" && image.core.url
						) as FormCore.FormTitleSub.Image.Core[];
						return (
							<SliderImage
								colorMain={colorMain as string}
								page={"Answer"}
								type="Components"
								images={images}
								key={ft._id}
							/>
						);
					}
				}

				if (ft.type === "FullDescription") {
					return (
						<div
							className="w-[calc(100%+2.8rem)] ml-[-1.4rem] text-[1.4rem] my-[1rem] border-y-[.1rem] border-gray-200 flex flex-col gap-[1.6rem] p-[2rem_1rem]"
							key={ft._id}
						>
							<span className="font-bold">{ft.core.header_value}</span>
							<span>{ft.core.value}</span>
						</div>
					);
				}
			})}

			{inputFormRequire.length > 0 && (
				<span className="text-red-600 text-[1.4rem] mt-[2rem]">* Biểu thị câu hỏi bắt buộc</span>
			)}
		</header>
	);
};

export default HeaderFormAnswer;
