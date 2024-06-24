import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { FormCore } from "@/type";
import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	subTitleItem: FormCore.Title.FormTitleSub;
};

const FormTitleText = (props: TProps) => {
	const { subTitleItem } = props;

	const [value, setValue] = useState<string>(subTitleItem.value || "");
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const [isWritten, setIsWritten] = useState<boolean>(false);

	const dispatch = useDispatch();

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: subTitleItem._id as UniqueIdentifier,
	});

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};

	const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
		}
	};

	const onSetValue = (e: React.ChangeEvent<HTMLDivElement>) => {
		const content = e.currentTarget.textContent;

		const newForm = structuredClone(formCore);
		const findIndex = newForm.form_title.form_title_sub.findIndex((ft) => ft._id === subTitleItem._id);
		if (content && content !== newForm.form_title.form_title_sub[findIndex].value) {
			setValue(content);

			updateTitleSub.mutate({
				form_title_sub_id: subTitleItem._id,
				form_id: formCore._id,
				form_title_sub_content: content,
			});
		}
	};

	const updateTitleSub = useMutation({
		mutationKey: ["update-title-sub-text"],
		mutationFn: ({
			form_title_sub_content,
			form_title_sub_id,

			form_id,
		}: {
			form_title_sub_content: string;
			form_title_sub_id: string;
			form_id: string;
		}) => FormService.updateSubTitle({ form_title_sub_content, form_id, form_title_sub_id }),
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
		console.log({ newForm, subTitleItem });
		updateFormAPI.mutate(newForm);
	};

	return (
		<div className="flex flex-col gap-[.5rem]  " ref={setNodeRef} {...attributes} {...listeners} style={style}>
			<button
				className="flex items-center gap-[.5rem] text-[1.4rem] font-bold text-textHeader hover:text-slate-800"
				onClick={handleDelete}
				disabled={updateFormAPI.isPending}
			>
				<Trash2 size={16} />
				Xóa
			</button>
			<div
				className="border-none py-[1rem] outline-none xl:max-w-[80rem] break-all leading-10"
				contentEditable={true}
				onKeyDown={onKeyEnter}
				onBlur={onSetValue}
				data-text={value || "Mô tả tiêu đề"}
				tabIndex={0}
				spellCheck={false}
				suppressContentEditableWarning={true}
			>
				{value}
			</div>
		</div>
	);
};

export default FormTitleText;
