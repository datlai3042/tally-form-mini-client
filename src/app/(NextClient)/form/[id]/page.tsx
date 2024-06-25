// "use client";
import FormService from "@/app/_services/form.service";
import React, { cache } from "react";
import Image from "next/image";
import { FormCore } from "@/type";
import RenderInputAnswers from "./_components/RenderInputAnswers";
import { Metadata } from "next";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import FormAnswerProvider from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";
import NotFoundPage from "../../_components/_StatusCodeComponent/NotFoundPage";
import FormAnswerHeader from "./_components/FormAnswerHeader";

const getFormCache = cache(FormService.getFormGuess);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
	const form_id = params.id;

	const res = await getFormCache({ form_id, options: { cache: "no-cache" } });
	const { form } = res.metadata;

	const iconForm = form?.form_avatar?.form_avatar_url || form?.form_setting_default.form_avatar_default_url;

	return {
		title: form?.form_title.form_title_value || "Không tìm thấy thông tin",
		icons: {
			icon: iconForm,
		},
		alternates: {
			canonical: "/",
		},
		openGraph: {
			type: "website",
			locale: "vi",
			title: form.form_title.form_title_value,
			siteName: "Một cách để tạo Form nhanh chóng",
			url: process.env.NEXT_PUBLIC_BACK_END_URL + "/form/" + form._id,
			images: [{ url: iconForm }],
		},
	};
}

const FormPage = async ({ params }: { params: { id: string } }) => {
	const getFormQuery = await getFormCache({ form_id: params.id, options: { cache: "no-store" } });
	const formCore = getFormQuery.metadata.form;

	if (!formCore)
		return (
			<div className="w-screen h-screen flex items-center justify-center">
				<NotFoundPage />
			</div>
		);

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
		<div className="px-[2rem] xl:px-0 w-full  min-h-screen h-max flex justify-center  p-[2rem] bg-formCoreBgColor ">
			<DivNative className="w-full sm:w-[64rem] flex flex-col gap-[1.5rem] ">
				<DivNative className="relative w-full ">
					<FormAnswerHeader formCore={formCore} />
				</DivNative>
				<DivNative
					className={`${
						formCore.form_background?.form_background_iamge_url ? "mt-[6rem]" : ""
					} w-full rounded-lg`}
				>
					<DivNative className="flex flex-col gap-[3rem]">
						<FormAnswerProvider formCore={formCore}>
							<RenderInputAnswers formCore={formCore} />
						</FormAnswerProvider>
					</DivNative>
				</DivNative>
			</DivNative>
		</div>
	);
};

export default FormPage;
