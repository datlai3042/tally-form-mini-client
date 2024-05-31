import React, { useState } from "react";
import SelectColor from "../SelectColor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";

const ButtonColor = () => {
	const [openColorModel, setOpenColorModel] = useState<boolean>(false);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const color = formCore.form_title_color
		? formCore.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	return (
		<div className="relative h-[4rem] px-[3rem] flex items-center justify-between ">
			<p className="flex items-center gap-[1rem]">
				<span>Màu sắc </span>
				<span style={{ color }} className="text-[1.8rem]">
					{color}
				</span>
			</p>
			<button className="w-[6rem] h-[3rem] p-[.6rem] bg-[#ffffff] border-[.1rem] border-gray-200">
				<div
					style={{ backgroundColor: color }}
					onClick={() => setOpenColorModel(true)}
					className="w-full h-full "
				></div>
			</button>

			{openColorModel && <SelectColor setOpenColorModel={setOpenColorModel} />}
		</div>
	);
};

export default ButtonColor;
