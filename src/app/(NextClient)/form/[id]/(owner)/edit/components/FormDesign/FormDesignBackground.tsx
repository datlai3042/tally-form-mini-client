import React from "react";
import ButtonColor from "./DesignCommon/ButtonColor";
import ButtonEditTextSize from "./DesignCommon/ButtonEditTextSize";
import ButtonEditTextStyle from "./DesignCommon/ButtonEditTextStyle";
import ButtonPositionBackground from "./DesignCommon/ButtonPositionBackground";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

const FormDesignBackground = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);

	const formBackground =
		!!formCore.form_background?.form_background_iamge_url || formCore.form_background_state || false;

	const styleEffect = {
		onCheckHasBackground: (check: boolean) => {
			if (check) return "bg-transparent";
			return "opacity-40 cursor-not-allowed";
		},
	};

	return (
		<div
			className={`${styleEffect.onCheckHasBackground(
				formBackground
			)} flex flex-col gap-[2rem] p-[1rem] border-t-[.1rem] border-slate-200 `}
		>
			<p className="font-medium">Tùy chỉnh ảnh bìa {!formBackground ? "(Chưa upload ảnh)" : ""}</p>
			<ButtonPositionBackground />
		</div>
	);
};

export default FormDesignBackground;
