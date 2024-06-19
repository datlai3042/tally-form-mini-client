/* eslint-disable jsx-a11y/alt-text */
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { Image, List, Type } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTitleModeImage from "../DesignTitle/FormTitleModeImage";
import { FormText } from "@/app/_constant/formUi.constant";

const iconSize = 16;

const DesignTitleForm = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const dispatch = useDispatch();

	const updateTitleSub = useMutation({
		mutationKey: ["update-title-sub"],
		mutationFn: ({
			form_title_sub,
			form_id,
		}: {
			form_title_sub: FormCore.FormTitle["form_title_sub"];
			form_id: string;
		}) => FormService.updateSubTitle({ form_title_sub, form_id }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	const onAddTitleSub = (type: FormCore.Title.TitleSub) => {
		const data = {
			type,
			write: false,
			value: "",
		} as FormCore.Title.FormTitleSub;
		const newForm = structuredClone(formCore);
		newForm.form_title.form_title_sub = newForm.form_title.form_title_sub.concat(data);
		updateTitleSub.mutate({ form_title_sub: newForm.form_title.form_title_sub, form_id: formCore._id });
	};

	return (
		<div className=" w-full min-h-[4rem] h-max p-[2rem_1rem] flex flex-wrap gap-[3rem]">
			<button
				onClick={() => onAddTitleSub("Text")}
				className="min-w-[12rem] h-[4rem] flex items-center gap-[1rem] p-[.1rem_.7rem] bg-gray-200 rounded-lg"
			>
				<Type size={iconSize} />
				<span>{FormText.title.optionText.message}</span>
			</button>

			<button
				onClick={() => onAddTitleSub("Image")}
				className="min-w-[12rem] h-[4rem] flex items-center gap-[1rem] p-[.1rem_.7rem] bg-gray-200 rounded-lg"
			>
				{/* // eslint-disable-next-line jsx-a11y/alt-text */}
				<Image size={iconSize} />
				<span>{FormText.title.optionImage.message}</span>
			</button>
			<FormTitleModeImage />
		</div>
	);
};

export default DesignTitleForm;
