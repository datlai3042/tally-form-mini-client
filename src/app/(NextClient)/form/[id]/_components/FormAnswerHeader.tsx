import { FormCore } from "@/type";
import Image from "next/image";
import React from "react";

type TProps = {
	formCore: FormCore.Form;
};

const FormAnswerHeader = (props: TProps) => {
	const { formCore } = props;

	const colorMain = formCore?.form_title?.form_title_color || formCore.form_setting_default.form_title_color_default;

	const formBackgroundImageUrl =
		formCore.form_background?.form_background_iamge_url ||
		formCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition =
		formCore.form_background?.form_background_position ||
		formCore.form_setting_default.form_background_position_default;

	const formBackgroundSize = formCore.form_background?.mode_show;

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

		onCheckPostionShowAvatar: (check: boolean) => {
			if (!check) return "top-[50%] translate-x-[-50%] translate-y-[-50%] left-[50%]";
			return "bottom-0 translate-y-[50%] left-[20%]";
		},
	};

	return (
		<div
			style={{ backgroundColor: formCore.form_background?.backgroundColor || "" }}
			className="relative w-full min-h-[17rem] rounded-xl "
		>
			{formCore.form_background?.form_background_iamge_url && (
				// <div className="absolute top-[50%] translate-x-[-50%] mx-auto">
				<Image
					style={{
						marginLeft: (formBackgroundPosition.y as number) * -1,
						objectFit: formBackgroundSize,
						objectPosition: ` ${formBackgroundPosition?.y || 0}% ${formBackgroundPosition?.x || 0}%`,
					}}
					src={formBackgroundImageUrl}
					width={800}
					height={160}
					quality={100}
					alt="form background"
					className="w-full aspect-[3/1]   rounded-lg"
				/>
				// </div>
			)}

			{!formCore.form_background?.form_background_iamge_url && (
				<div
					style={{ backgroundColor: colorMain }}
					className="w-full  aspect-[3/1] rounded-lg opacity-90"
				></div>
			)}

			{formCore.form_avatar?.form_avatar_url && (
				<div
					className={`${styleEffect.onCheckPositionAvatar(
						formCore.form_avatar.position
					)} absolute bottom-0 translate-y-[50%]  w-[20%] aspect-square`}
				>
					<Image
						src={
							formCore.form_avatar?.form_avatar_url ||
							formCore.form_setting_default.form_avatar_default_url
						}
						style={{ borderRadius: formCore.form_avatar.mode_shape === "circle" ? "999px" : "" }}
						width={800}
						height={160}
						quality={100}
						alt="form background"
						className={` w-full h-full  `}
					/>
				</div>
			)}
		</div>
	);
};

export default FormAnswerHeader;
