import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormText } from "@/app/_constant/formUi.constant";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore } from "@/type";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormTitleModeImage = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const dispatch = useDispatch();

	const [openModel, setOpenModel] = useState<boolean>(false);

	const titleModeImageMutation = useMutation({
		mutationKey: ["change-mode-image-title"],
		mutationFn: ({ form_id, mode }: { form_id: string; mode: FormCore.Title.FormTitleImageMode }) =>
			FormService.setModeImageForm({ form_id, mode }),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
			setOpenModel(false);
		},
	});

	const onChangeMode = (mode: FormCore.Title.FormTitleImageMode) => {
		titleModeImageMutation.mutate({ form_id: formCore._id, mode });
	};

	const styleEffect = {
		onActive: (check: boolean) => {
			if (check) return "bg-blue-500 text-white";
			return "hover:bg-blue-300 hover:text-white";
		},
	};

	const modeImage = formCore.form_title.form_title_mode_image;

	return (
		<ClickOutSide setOpenModel={setOpenModel}>
			<div
				className="cursor-pointer relative w-[30rem] min-h-[4rem]  px-[2rem] flex items-center bg-gray-200 rounded-lg"
				onClick={() => setOpenModel((prev) => !prev)}
			>
				<span>{FormText.title.optionImageMode.label}</span>
				{openModel && (
					<ul
						className="absolute bottom-[-1rem] w-full rounded-lg translate-y-[100%] left-0 z-[50] flex flex-col  bg-[#ffffff] border-[.1rem] border-slate-300"
						onClick={(e) => e.stopPropagation()}
					>
						<li
							onClick={() => onChangeMode("Normal")}
							className={`${styleEffect.onActive(modeImage === "Normal")} p-[1rem]  cursor-pointer`}
						>
							{FormText.title.optionImageMode.mode_1}
						</li>
						<li
							onClick={() => onChangeMode("Slider")}
							className={`${styleEffect.onActive(modeImage === "Slider")} p-[1rem]  cursor-pointer`}
						>
							<span>{FormText.title.optionImageMode.mode_2}</span>
						</li>
					</ul>
				)}
			</div>
		</ClickOutSide>
	);
};

export default FormTitleModeImage;
