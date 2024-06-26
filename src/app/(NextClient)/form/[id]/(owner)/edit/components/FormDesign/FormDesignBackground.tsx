import React from "react";
import ButtonColor from "./DesignCommon/ButtonColor";
import ButtonEditTextSize from "./DesignCommon/ButtonEditTextSize";
import ButtonEditTextStyle from "./DesignCommon/ButtonEditTextStyle";
import ButtonPositionBackground from "./DesignCommon/ButtonBackgroundPosition";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import ButtonChangeModeBackground from "./ButtonChangeModeBackground";
import ButtonBackgroundColor from "./DesignCommon/ButtonBackgroundColor";
import ButtonBackgroundPostition from "./DesignCommon/ButtonBackgroundPosition";
import ButtonBackgroundPadding from "./DesignCommon/ButtonBackgroundPadding";

const FormDesignBackground = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);

	const formBackground = !!formCore.form_background?.form_background_iamge_url || false;

	const checkBackground = formCore.form_background?.form_background_iamge_url
		? "bg-transparent"
		: "opacity-40 cursor-not-allowed";

	return (
		<div className={`${checkBackground} flex flex-col gap-[2rem] p-[1rem] border-t-[.1rem] border-slate-200 `}>
			<p className="font-medium">Tùy chỉnh ảnh bìa {!formBackground ? "(Chưa upload ảnh)" : ""}</p>
			<ButtonBackgroundPostition />
			<ButtonChangeModeBackground />
			<ButtonBackgroundPadding />
			<ButtonBackgroundColor />
		</div>
	);
};

export default FormDesignBackground;
