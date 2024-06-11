import { renderStyleTitleCore } from "@/app/_lib/utils";
import { FormCore } from "@/type";
import React from "react";
import FormTitleImage from "../(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";
import SliderImage from "@/app/(NextClient)/_components/Model/SliderImage";

type TProps = {
	formCore: FormCore.Form;
};

const HeaderFormAnswer = (props: TProps) => {
	const { formCore } = props;

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
	const checkMode: FormCore.Title.FormTitleImageMode = "Slider";

	let flag = false;

	return (
		<header
			style={{ borderTopColor: colorMain }}
			className="w-full min-h-[16rem] h-max p-[4rem_2rem] flex flex-col gap-[2rem] justify-between border-[.4rem] border-indigo-50 break-words	 border-t-[1.6rem]  bg-[#ffffff] rounded-lg"
		>
			<h1 style={renderStyleTitleCore(formCore)} className="text-[4rem] ">
				{formCore.form_title.form_title_value}
			</h1>

			{formCore.form_title.form_title_sub.map((ft) => {
				if (ft.type === "Text" && ft.write)
					return (
						<span key={ft._id} className="text-[1.4rem] text-justify leading-10">
							{ft.value}
						</span>
					);
				if (ft.type === "Image") {
					if (formCore.form_title.form_title_mode_image !== checkMode) {
						return <FormTitleImage mode="Normal" page={"Answer"} subTitleItem={ft} key={ft._id} />;
					}

					if (formCore.form_title.form_title_mode_image === "Slider" && !flag) {
						flag = true;
						const images = formCore.form_title.form_title_sub.filter(
							(image) => image.type === "Image" && image.value
						);
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
			})}

			<span className="text-red-600 text-[1.4rem] mt-[2rem]">* Biểu thị câu hỏi bắt buộc</span>
		</header>
	);
};

export default HeaderFormAnswer;
