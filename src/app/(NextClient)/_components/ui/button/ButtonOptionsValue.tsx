import useUpdateForm from "@/app/hooks/useUpdateForm";
import { RootState } from "@/app/_lib/redux/store";
import { InputCore } from "@/type";
import { Circle, Plus, Trash2 } from "lucide-react";
import React, { SetStateAction, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import useAddOptionClient from "@/app/hooks/useAddOptionClient";
import useAddOptionServer from "@/app/hooks/useAddOptionServer";
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useAddInputToEnter } from "@/app/hooks/useAddInputToEnter";
import useDeleteOptionId from "@/app/hooks/useDeleteOptionId";

type TProps = {
	index: number;
	option: InputCore.InputOptionMultiple.Options;
	inputItem: InputCore.InputOptionMultiple.InputTypeOptionMultiple;
	controllSelect: {
		selectValue: string[];
		setSelectValue: React.Dispatch<SetStateAction<string[]>>;
	};
};

const ButtonOptionsValue = (props: TProps) => {
	const {
		option,
		inputItem,
		controllSelect: { selectValue, setSelectValue },
	} = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const checkModeDisplay = formCore.form_mode_display === "custom" ? true : false;

	const divContentRef = useRef<HTMLDivElement | null>(null);
	const content = divContentRef.current?.textContent;

	const addOptionServer = useAddOptionServer();
	const addInputToEnter = useAddInputToEnter(inputItem, formCore);
	const { deleteOptionIdMutation } = useDeleteOptionId();

	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
		id: option.option_id as UniqueIdentifier,
	});

	const handleSetValueOption = async (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter") {
			e.preventDefault();
			e.stopPropagation();
		}

		const content = divContentRef.current?.textContent;
		if (e.key === "Enter" && !addOptionServer.isPending) {
			(await addInputToEnter).mutate();
		}
	};

	const handleBlur = () => {
		const content = divContentRef.current?.textContent;
		if (!content) return;
		if (!addOptionServer.isPending && content && content !== option.option_value && option.option_id) {
			addOptionServer.mutate({
				form: formCore,
				option_id: option.option_id || "",
				option_value: content,
				inputItem,
			});
		}
	};

	const onSelectValue = (value: string) => {
		console.log({ value });
		if (selectValue.includes(value)) {
			return setSelectValue((prev) => prev.filter((prev) => prev !== value));
		}
		setSelectValue((prev) => prev.concat(value));
	};

	const onDeleteOptionId = () => {
		deleteOptionIdMutation.mutate({
			form_id: formCore._id,
			inputItem_id: inputItem._id,
			option_id: option.option_id,
		});
		if (selectValue.includes(option.option_id)) {
			setSelectValue([]);
		}
	};

	useEffect(() => {
		if (divContentRef.current) {
			divContentRef.current.textContent = option.option_value;
		}
	}, []);

	const style = {
		transition,
		transform: CSS.Transform.toString(transform),
	};
	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	return (
		<div
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
			className="reset-border-outline flex min-h-[5rem] max-w-full h-max items-center gap-[2rem] text-[1.4rem]"
			onClick={() => onSelectValue(option.option_id)}
		>
			<div className="w-[2rem] aspect-square rounded-full border-[.1rem] border-slate-400 flex items-center justify-center">
				{selectValue.includes(option.option_id) && (
					<div
						style={{ backgroundColor: checkModeDisplay ? colorMain : "#000" }}
						className={`${
							checkModeDisplay ? "group-hover:!bg-[#ffffff]" : "bg-blue-300"
						} min-w-[60%] min-h-[60%] rounded-full `}
					></div>
				)}
			</div>

			<div
				onKeyDown={handleSetValueOption}
				onBlur={handleBlur}
				// onClick={(e) => e.stopPropagation()}
				ref={divContentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				spellCheck={false}
				tabIndex={0}
				className="reset-border-outline h-full min-w-[60%] xl:min-w-[24%] max-w-[70rem] break-words "
				data-text={option.option_value || "Nhập thông tin tùy chọn"}
			>
				{content}
			</div>

			<button
				style={{ color: checkModeDisplay ? colorMain : "#000" }}
				disabled={deleteOptionIdMutation.isPending}
				onClick={(e) => {
					e.preventDefault();

					onDeleteOptionId();
				}}
				className={`${
					checkModeDisplay ? "group-hover:!bg-[#ffffff] hover:bg-gray-200" : "bg-gray-200 hover:bg-gray-300"
				} mr-auto flex items-center gap-[1rem] p-[.5rem_.7rem]  rounded-lg disabled:cursor-not-allowed`}
			>
				<Trash2 size={16} />
			</button>
		</div>
	);
};

export default ButtonOptionsValue;
