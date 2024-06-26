import { FormCore } from "@/type";

export const generateStyleBackgroundImageForm = ({ formCore }: { formCore: FormCore.Form }) => {
	const formBackgroundImageUrl =
		formCore.form_background?.form_background_iamge_url ||
		formCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition =
		formCore.form_background?.form_background_position ||
		formCore.form_setting_default.form_background_position_default;

	const formBackgroundSize = formCore.form_background?.mode_show;

	const positionAvatar = formCore.form_avatar?.position;

	return {
		style_background: {
			// backgroundImage: `url("${formBackgroundImageUrl}")`,
			// backgroundRepeat: "no-repeat",
			objectFit: formBackgroundSize,
			objectPosition: ` ${formBackgroundPosition?.y || 0}% ${formBackgroundPosition?.x || 0}%`,
		},

		position_buttn: positionAvatar === "left" ? "right-[2rem] xl:right-[6rem]" : "left-[2rem] xl:left-[6rem]",
	};
};

export const generateStyleAvatarForm = ({ formCore }: { formCore: FormCore.Form }) => {
	const modeAPI = formCore.form_avatar?.mode_shape;
	const positionAPI = formCore.form_avatar?.position;
	let shape = "rounded-0";
	let position = "right-[calc(25%-6.4rem)]";

	if (modeAPI === "circle") shape = "rounded-full";
	if (positionAPI === "left") position = "left-[calc(25%-6.4rem)] ";
	if (positionAPI === "center") position = "left-[50%] translate-x-[-50%]";

	return { shape, position };
};
