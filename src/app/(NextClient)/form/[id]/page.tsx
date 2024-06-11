// "use client";
import FormService from "@/app/_services/form.service";
import { useQuery } from "@tanstack/react-query";
import React, { cache } from "react";
import FormPageNotFound from "../../_components/Layout/FormPageNotFound";
import FormPageGuess from "../../_components/Layout/FormPageGuess";
import FormAnswerProvider from "../../_components/provider/FormAnswerProvider";
import DivNative from "../../_components/ui/NativeHtml/DivNative";
import Image from "next/image";
import { FormCore } from "@/type";
import { renderStyleTitleCore } from "@/app/_lib/utils";
import FormTitleImage from "./(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";
import SliderImage from "../../_components/Model/SliderImage";
import ButtonNative from "../../_components/ui/NativeHtml/ButtonNative";
import RenderInputAnswers from "./_components/RenderInputAnswers";
import ButtonSubmitForm from "./_components/ButtonSubmitForm";
import HeaderFormAnswer from "./_components/HeaderFormAnswer";
import { Metadata } from "next";
import { ResponseApi } from "@/app/_schema/api/response.shema";

const getFormCache = cache(FormService.getFormGuess);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const form_id = params.id;

	const res = await getFormCache({ form_id, options: { cache: "no-cache" } });
	const { form } = res.metadata;

	const iconForm = form.form_avatar?.form_avatar_url || form.form_setting_default.form_avatar_default_url;

	console.log({ iconForm, form: form.form_avatar });

	return {
		title: form.form_title.form_title_value,
		icons: {
			icon: iconForm,
		},
	};
}

const FormPage = async ({ params }: { params: { id: string } }) => {
	const getFormQuery = await getFormCache({ form_id: params.id, options: { cache: "no-cache" } });
	const formCore = getFormQuery.metadata.form;

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const formBackgroundImageUrl =
		formCore.form_background?.form_background_iamge_url ||
		formCore.form_setting_default.form_background_default_url;
	const formBackgroundPosition =
		formCore.form_background?.form_background_position ||
		formCore.form_setting_default.form_background_position_default;

	const modeAvatar = formCore.form_avatar?.mode || formCore.form_setting_default.form_avatar_default_mode;
	const positionAvatar = formCore.form_avatar?.position || formCore.form_setting_default.form_avatar_default_postion;

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
		<>
			<div className="px-[2rem] xl:px-0 w-full min-h-screen h-max flex justify-center  p-[2rem] bg-formCoreBgColor ">
				<DivNative className="w-full sm:w-[66.8rem] flex flex-col gap-[4rem] ">
					<DivNative className="relative w-full min-h-[20rem] aspect-[3.01/1]">
						{formCore.form_background?.form_background_iamge_url && (
							<Image
								style={{
									marginLeft: (formBackgroundPosition.y as number) * -1,
									objectFit: "cover",
									objectPosition: ` ${formBackgroundPosition?.y || 0}px ${
										formBackgroundPosition?.x || 0
									}px`,
								}}
								src={formBackgroundImageUrl}
								width={800}
								height={160}
								quality={100}
								alt="form background"
								className="w-[66.8rem] aspect-[3/1]   rounded-lg"
							/>
						)}

						{!formCore.form_background?.form_background_iamge_url && (
							<div
								style={{ backgroundColor: colorMain }}
								className="w-[66.8rem] aspect-[3/1] rounded-lg opacity-90"
							></div>
						)}

						{(formCore.form_avatar_state || formCore.form_avatar?.form_avatar_url) && (
							// <DivNative className="absolute bottom-0 left-[50%] translate-x-[-50%] translate-y-[50%]  border-[.3rem] border-blue-800 rounded-full">
							<Image
								style={{
									border: `.4rem solid ${
										formCore.form_title.form_title_color ||
										formCore.form_setting_default.form_title_color_default
									}`,
								}}
								src={
									formCore.form_avatar?.form_avatar_url ||
									formCore.form_setting_default.form_avatar_default_url
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
							formCore.form_avatar_state
						)} w-full flex flex-col gap-[3rem] rounded-lg`}
					>
						<DivNative className="flex flex-col gap-[3rem]">
							<FormAnswerProvider formCore={formCore}>
								<RenderInputAnswers formCore={formCore} />
							</FormAnswerProvider>
						</DivNative>
					</DivNative>
				</DivNative>
			</div>
		</>
	);
};

export default FormPage;
