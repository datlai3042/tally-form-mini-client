import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormAvatar = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	const modeAvatar = formCore.form_avatar?.mode_shape || formCore.form_setting_default.form_avatar_default_mode;
	const positionAvatar = formCore.form_avatar?.position || formCore.form_setting_default.form_avatar_default_postion;

	const styleEffect = {
		onCheckModeAvatar: (mode: FormCore.FormAvatarMode) => {
			if (mode === "circle") return "rounded-full";
			return "";
		},

		onCheckPositionAvatar: (position: FormCore.FormAvatarPosition) => {
			if (position === "left") return "left-[calc(25%-6.4rem)] ";
			if (position === "center") return "left-[50%] translate-x-[-50%]";
			return "right-[calc(25%-6.4rem)]";
		},
	};

	return (
		<React.Fragment>
			<Image
				width={150}
				height={150}
				src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
				quality={100}
				onClick={onControllModel}
				alt="avatar"
				className={`${styleEffect.onCheckModeAvatar(modeAvatar)} ${styleEffect.onCheckPositionAvatar(
					positionAvatar
				)} absolute bottom-0 z-[3] object-center translate-y-[50%] w-[14rem] h-[14rem] xl:w-[20rem] xl:h-[20rem] hover:cursor-pointer `}
			/>
			{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
		</React.Fragment>
	);
};

export default FormAvatar;
