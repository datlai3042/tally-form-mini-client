import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import SelectColor from "@/app/(NextClient)/_components/ui/SelectColor";
import ButtonColor from "@/app/(NextClient)/_components/ui/button/ButtonColor";
import ButtonEditTextSize from "@/app/(NextClient)/_components/ui/button/ButtonEditTextSize";
import ButtonEditTextStyle from "@/app/(NextClient)/_components/ui/button/ButtonEditTextStyle";
import React, { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";

const FormDesignCustom = () => {
	const { isDesignForm, setOpenFormDesign, setIsDesginForm } = useContext(FormDesignContext);

	const onCloseFormDesign = () => {
		if (isDesignForm) {
			alert("Bạn chưa lưu mà");
		}
		setOpenFormDesign(false);
		// setIsDesginForm(false);
	};

	return (
		<div className="absolute  top-0 pt-[7rem] bottom-0 right-0 z-[100] w-[30rem]  bg-[#ffffff]  ">
			<div className="relative min-h-full h-max border-t-[.1rem] border-l-[.1rem] border-slate-200 ">
				<div className="relative w-full min-h-full h-max  py-[2rem] flex flex-col gap-[2rem]  ">
					<p className="text-center">Tùy biến Form</p>
					<div className="flex flex-col gap-[2rem] p-[1rem] border-t-[.1rem] border-slate-200">
						<p>Tiêu đề Form</p>
						<ButtonColor />
						<ButtonEditTextSize />
						<ButtonEditTextStyle />
					</div>
					<button className="absolute top-[1rem] right-[1rem]" onClick={onCloseFormDesign}>
						Đóng
					</button>
				</div>

				<button className="absolute bottom-[2rem]">Lưu</button>
			</div>
		</div>
	);
};

export default FormDesignCustom;
