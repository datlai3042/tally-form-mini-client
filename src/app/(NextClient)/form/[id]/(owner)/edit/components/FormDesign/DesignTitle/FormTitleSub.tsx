import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormTitleText from "./FormTitleText";
import FormTitleImage from "./FormTitleImage";
import FormTitleList from "./FormTitleList";
import FormTitleModeImage from "./FormTitleModeImage";
import {
	DndContext,
	DragEndEvent,
	MouseSensor,
	UniqueIdentifier,
	closestCorners,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import SliderImage from "@/app/(NextClient)/_components/Model/SliderImage";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import FormTitleFullDescription from "./FormTitleFullDescription";

const generateSubTitle = (formCore: FormCore.Form) => {
	const checkMode: FormCore.FormTitle["form_title_mode_image"] = "Slider";
	const mode = formCore.form_title.form_title_mode_image === checkMode;

	let flag = false;

	return formCore.form_title.form_title_sub.map((ft) => {
		switch (ft.type) {
			case "Text":
				return <FormTitleText subTitleItem={ft} key={ft._id} />;

			case "FullDescription":
				return <FormTitleFullDescription subTitleItem={ft} key={ft._id} />;

			case "Image":
				if (formCore.form_title.form_title_mode_image !== checkMode) {
					return <FormTitleImage mode="Normal" page="Edit" subTitleItem={ft} key={ft._id} />;
				}

				if (formCore.form_title.form_title_mode_image === "Slider" && !flag) {
					flag = true;
					const images = formCore.form_title.form_title_sub.filter(
						(image) => image.type === "Image" && image?.core?.url
					) as FormCore.FormTitleSub.Image.Core[];
					return (
						<SliderImage
							colorMain={
								formCore.form_title.form_title_color ||
								formCore.form_setting_default.form_title_color_default
							}
							page="Edit"
							type="Components"
							images={images}
							key={ft._id}
						/>
					);
				}

				if (formCore.form_title.form_title_mode_image === "Slider" && !ft?.core?.url) {
					return <FormTitleImage mode="Normal" page="Edit" subTitleItem={ft} key={ft._id} />;
				}
				return null;
			default:
				return <FormTitleText subTitleItem={ft} />;
		}
	});
};

const FormTitleSub = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const updateFormAPI = useUpdateForm();

	const dispatch = useDispatch();

	const renderSubTitle = useMemo(() => {
		return generateSubTitle(formCore);
	}, [formCore]) as React.ReactNode;

	const getPos = (id: UniqueIdentifier) => formCore.form_title.form_title_sub.findIndex((ip) => ip._id === id);

	const onDrapEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id === over?.id) return;

		const posActive = getPos(active.id as unknown as UniqueIdentifier);
		const postOver = getPos(over?.id as unknown as UniqueIdentifier);

		const newArray = arrayMove(formCore.form_title.form_title_sub, posActive, postOver);
		const newForm = structuredClone(formCore);
		newForm.form_title.form_title_sub = newArray;
		console.log({ newForm });
		updateFormAPI.mutate(newForm);
		return newArray;
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	return (
		<div className="w-full  h-max  flex flex-col   gap-[4rem] outline-none" tabIndex={0}>
			<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDrapEnd}>
				<SortableContext
					items={formCore.form_title.form_title_sub.map((ip) => ip._id) as unknown as UniqueIdentifier[]}
					strategy={verticalListSortingStrategy}
				>
					{renderSubTitle}
				</SortableContext>
			</DndContext>
		</div>
	);
};

export default FormTitleSub;
