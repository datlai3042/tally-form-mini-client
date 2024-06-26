/* eslint-disable jsx-a11y/alt-text */
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { useMutation } from "@tanstack/react-query";
import { Image, List, Type } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTitleModeImage from "../DesignTitle/FormTitleModeImage";
import { FormText } from "@/app/_constant/formUi.constant";
import useAddInputSetTitle from "@/app/hooks/useAddInputSetTitle";
import { FormCore } from "@/type";
import useAddSectionSubTitle from "@/app/hooks/useAddSectionSubTitle";

const iconSize = 16;

const DesignTitleForm = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const addSubTitleItem = useAddSectionSubTitle();

	const onAddTitleSub = (type: FormCore.FormTitleSub.FormTitleBase["type"]) => {
		addSubTitleItem.mutate({ type, form_id: formCore._id });
	};

	return (
		<div className=" w-full min-h-[4rem] h-max p-[2rem_0rem] flex flex-wrap gap-[3rem]">
			<button
				onClick={() => onAddTitleSub("Text")}
				className="min-w-[12rem] h-[4rem] flex items-center gap-[1rem] p-[.1rem_.7rem] text-[#fff] bg-blue-400 hover:bg-color-main rounded-lg"
			>
				<Type size={iconSize} />
				<span>{FormText.title.optionText.message}</span>
			</button>

			<button
				onClick={() => onAddTitleSub("FullDescription")}
				className="min-w-[12rem] h-[4rem] flex items-center gap-[1rem] p-[.1rem_.7rem] text-[#fff] bg-blue-400 hover:bg-color-main rounded-lg"
			>
				<Type size={iconSize} />

				{/* // eslint-disable-next-line jsx-a11y/alt-text */}
				<span>{FormText.title.optionFullDescription.message}</span>
			</button>

			<button
				onClick={() => onAddTitleSub("Image")}
				className="min-w-[12rem] h-[4rem] flex items-center gap-[1rem] p-[.1rem_.7rem] text-[#fff] bg-blue-400 hover:bg-color-main rounded-lg"
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
