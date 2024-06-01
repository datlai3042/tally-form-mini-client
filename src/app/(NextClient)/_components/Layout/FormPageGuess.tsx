import { FormCore, InputCore } from "@/type";
import Image from "next/image";
import React, { useMemo } from "react";
import DivNative from "../ui/NativeHtml/DivNative";
import InputEmailAnswer from "../../form/[id]/edit/components/InputAnswer/InputEmailAnswer";
import ButtonNative from "../ui/NativeHtml/ButtonNative";
import InputTextAnswer from "../../form/[id]/edit/components/InputAnswer/InputTextAnswer";
import { renderStyleTitleCore } from "@/app/_lib/utils";

type TProps = {
	FormCore: FormCore.Form;
};

const generateInputAnswer = (Inputs: InputCore.InputForm[], formCore: FormCore.Form): React.ReactNode => {
	return Inputs.map((ip) => {
		switch (ip.type) {
			case "EMAIL":
				return <InputEmailAnswer inputItem={ip} />;
			case "TEXT":
				return <InputTextAnswer inputItem={ip} formCore={formCore} />;
		}
	});
};

const FormPageGuess = (props: TProps) => {
	const { FormCore } = props;

	const renderInputAnswer = useMemo(() => generateInputAnswer(FormCore.form_inputs, FormCore), [FormCore]);
	const formBackgroundImageUrl =
		FormCore.form_background?.form_background_iamge_url ||
		FormCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition =
		FormCore.form_background?.form_background_position ||
		FormCore.form_setting_default.form_background_position_default;

	const modeAvatar = FormCore.form_avatar?.mode || FormCore.form_setting_default.form_avatar_default_mode;
	const positionAvatar = FormCore.form_avatar?.position || FormCore.form_setting_default.form_avatar_default_postion;

	const styleEffect = {
		formMarginTop: (check: boolean) => {
			if (check) return "mt-[6rem]";
			return "mt-0";
		},
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
		<div className="w-full min-h-screen h-max flex justify-center  p-[2rem] bg-formCoreBgColor ">
			<DivNative className="w-[66.8rem] flex flex-col gap-[4rem] ">
				<DivNative className="relative w-full min-h-[20rem] aspect-[3.01/1]">
					<Image
						style={{
							objectFit: "cover",
							objectPosition: ` ${formBackgroundPosition?.y || 0}px ${formBackgroundPosition?.x || 0}px`,
						}}
						src={
							FormCore.form_background?.form_background_iamge_url ||
							FormCore.form_setting_default.form_background_default_url
						}
						width={800}
						height={160}
						quality={100}
						alt="form background"
						className="w-[66.8rem] aspect-[3/1]   rounded-lg"
					/>

					{FormCore.form_avatar_state && (
						// <DivNative className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%]  border-[.3rem] border-blue-800 rounded-full">
						<Image
							src={
								FormCore.form_avatar?.form_avatar_url ||
								FormCore.form_setting_default.form_avatar_default_url
							}
							width={800}
							height={160}
							quality={100}
							alt="form background"
							className={`${styleEffect.onCheckModeAvatar(
								modeAvatar
							)} ${styleEffect.onCheckPositionAvatar(
								positionAvatar
							)} absolute bottom-0 z-[3] object-center translate-y-[50%] w-[16rem] h-[16rem]  `}
							// className="w-[16rem] h-[16rem] object-cover object-center rounded-full"
						/>
						// </DivNative>
					)}
				</DivNative>
				<DivNative
					className={`${styleEffect.formMarginTop(
						FormCore.form_avatar_state
					)} w-full flex flex-col gap-[3rem] rounded-lg`}
				>
					<header className="w-full min-h-[16rem] h-max p-[2rem_3rem] flex flex-col  justify-between border-[.4rem] border-indigo-50 break-words	 border-t-[1.6rem] border-t-blue-400 bg-[#ffffff] rounded-lg">
						<h1 style={renderStyleTitleCore(FormCore)} className="text-[4rem]">
							{FormCore.form_title}
						</h1>
						<span className="text-red-600 text-[1.4rem]">* Biểu thị câu hỏi bắt buộc</span>
					</header>
					<DivNative className="flex flex-col gap-[3rem]">{renderInputAnswer}</DivNative>
				</DivNative>
				<ButtonNative
					textContent="Gửi"
					className="w-[25%] h-[5rem] ml-auto bg-slate-900 text-white rounded-md "
					// onClick={onGetDataDemo}
				/>
			</DivNative>
		</div>
	);
};

export default FormPageGuess;
