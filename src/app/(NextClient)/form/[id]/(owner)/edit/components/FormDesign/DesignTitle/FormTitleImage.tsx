"use client";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";

import { RootState } from "@/app/_lib/redux/store";
import FormService, { UploadFileTitle } from "@/app/_services/form.service";
import UserService from "@/app/_services/user.service";
import { FormCore, User } from "@/type";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSelectedLayoutSegment } from "next/navigation";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { FormText } from "@/app/_constant/formUi.constant";
import useUpdateForm from "@/app/hooks/useUpdateForm";

type TProps = {
	subTitleItem: FormCore.Title.FormTitleSub;
	className?: string;
	page: "Edit" | "Answer";
	mode: "Slider" | "Normal";
};

const FormTitleImage = (props: TProps) => {
	const { subTitleItem, className, page, mode } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const inputAvatar = useRef<HTMLInputElement | null>(null);
	const dispatch = useDispatch();

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: subTitleItem._id as UniqueIdentifier,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	const onClickButton = () => {
		if (inputAvatar.current) {
			inputAvatar.current.value = "";
			inputAvatar.current.click();
		}
	};

	const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target && e.target.files) {
			const formData: UploadFileTitle = new FormData();
			formData.append("file", e.target.files[0]);
			formData.append("titleSubId", subTitleItem._id);
			formData.append("form_id", formCore._id);

			uploadAvatar.mutate(formData);
		}
	};

	const uploadAvatar = useMutation({
		mutationKey: ["upload-title-image", subTitleItem._id],
		mutationFn: (formData: UploadFileTitle) => FormService.uploadTitleImage(formData),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	const updateFormAPI = useUpdateForm();

	const handleDelete = () => {
		const newForm = structuredClone(formCore);
		newForm.form_title.form_title_sub = newForm.form_title.form_title_sub.filter(
			(ft) => ft._id !== subTitleItem._id
		);
		updateFormAPI.mutate(newForm);
	};

	const widthPage = page === "Edit" ? "w-[35rem] sm:w-[50rem] xl:w-[80rem] " : "w-[62rem] h-max items-center";

	const heightWithModeNormal =
		mode === "Normal" ? (page === "Edit" ? "h-[50rem] w-full" : "max-h-[30rem]  w-[70%]") : "";
	const heightWithModeSlider = mode === "Slider" ? (page === "Edit" ? "h-[46rem] w-[70%]" : "h-[46rem] w-[90%]") : "";

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	if (!subTitleItem.value && !subTitleItem.write && page === "Edit")
		return (
			<div className="flex flex-col	 gap-[1rem]">
				<button
					className="flex items-center gap-[.5rem] text-[1.4rem] font-bold text-textHeader hover:text-slate-800"
					onClick={handleDelete}
					disabled={updateFormAPI.isPending}
				>
					<Trash2 size={16} />
					{FormText.title.optionImage.remove}
				</button>
				<div className="flex items-center gap-[2rem]">
					<button
						onClick={onClickButton}
						className="min-w-[7rem] w-max h-[4rem] text-[1.4rem] flex justify-center items-center gap-[1rem] p-[.1rem_.7rem] bg-gray-200 rounded-lg"
					>
						{FormText.title.optionImage.complete}
					</button>

					{uploadAvatar.isPending && <LoadingSpinner color={colorMain} />}
				</div>

				<input type="file" hidden ref={inputAvatar} onChange={onChangeFile} />
			</div>
		);

	return (
		<div
			className={`${widthPage}  h-max flex flex-col   gap-[.5rem]   outline-none rounded-lg my-[2rem]`}
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
		>
			{page === "Edit" && mode === "Normal" && (
				<button
					className="flex items-center gap-[.5rem] text-[1.4rem] font-bold text-textHeader hover:text-slate-800 "
					onClick={handleDelete}
					disabled={updateFormAPI.isPending}
				>
					<Trash2 size={16} />
					{FormText.title.optionImage.remove}
				</button>
			)}
			{subTitleItem.value && (
				<div className={` flex justify-center  w-full `}>
					<Image
						// style={{ backgroundColor: colorMain }}
						width={100}
						height={100}
						quality={100}
						unoptimized
						alt="avatar title"
						src={subTitleItem.value}
						className={`${className} ${heightWithModeNormal}  ${heightWithModeSlider} bg-gray-200 object-center rounded-lg`}
					/>
				</div>
			)}
		</div>
	);
};

export default FormTitleImage;
