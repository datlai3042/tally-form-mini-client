import React, { memo, useContext, useEffect, useRef, useState } from "react";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { InputCore as TInputCore } from "@/type";
import InputCore from "./InputCore";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ButtonAddOption from "@/app/(NextClient)/_components/ui/button/ButtonOptionValue";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import ButtonOptionValue from "@/app/(NextClient)/_components/ui/button/ButtonOptionValue";
import useAddOptionClient from "@/app/hooks/useAddOptionClient";
import useAddOptionServer from "@/app/hooks/useAddOptionServer";
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
import usePositionOption from "@/app/hooks/usePositionOption";
import ButtonOptionsValue from "@/app/(NextClient)/_components/ui/button/ButtonOptionsValue";

type TProps = {
	inputItem: TInputCore.InputOptionMultiple.InputTypeOptionMultiple;
};

const InputCoreOptionMultiple = (props: TProps) => {
	const [selectValue, setSelectValue] = useState<string[]>([]);

	const { inputItem } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
	const form_mode_display = formCore.form_mode_display === "custom";

	const title = inputItem.input_title ? inputItem.input_title : "";

	const addOptionServer = useAddOptionServer();

	const handleAddOption = () => {
		addOptionServer.mutate({
			form: formCore,
			option_id: "",
			option_value: "",
			inputItem,
		});
	};

	const sensors = useSensors(
		useSensor(MouseSensor, {
			activationConstraint: {
				distance: 10,
			},
		})
	);

	const getPos = (id: UniqueIdentifier) => inputItem.core.options.findIndex((ip) => ip.option_id === id);
	const updatePostionOption = usePositionOption();

	const onDrapEnd = (e: DragEndEvent) => {
		const { active, over } = e;
		if (active.id === over?.id) return;

		const posActive = getPos(active.id as unknown as UniqueIdentifier);
		const postOver = getPos(over?.id as unknown as UniqueIdentifier);

		const newArray = arrayMove(inputItem.core.options, posActive, postOver);
		const newForm = structuredClone(inputItem);
		newForm.core.options = newArray;
		updatePostionOption.mutate({ form: formCore, inputItem, coreOption: newForm.core.options });
		return newArray;
	};

	useEffect(() => {
		if (!selectValue && inputItem.core.options[0]) {
			setSelectValue((prev) => prev.concat(inputItem.core.options[0].option_id));
		}
	}, [inputItem.core.options, selectValue]);

	const InputOption = (
		<DivNative className={`mt-[.4rem] min-h-[5rem] max-w-full flex flex-col gap-[2rem] h-max  text-[1.4rem]`}>
			<SpanNative
				textContent="Chọn các lựa chọn bên dưới"
				className={`${
					form_mode_display ? "group-hover:!text-[#ffffff]" : "text-[#000]"
				} text-[1.6rem] font-semibold`}
			/>

			<DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDrapEnd}>
				<SortableContext
					items={inputItem.core.options.map((op) => op.option_id) as unknown as UniqueIdentifier[]}
					strategy={verticalListSortingStrategy}
				>
					{inputItem.core.options &&
						inputItem.core.options.map((op, i) => (
							<ButtonOptionsValue
								key={op.option_id || Math.random().toString()}
								option={op}
								index={i}
								inputItem={inputItem}
								controllSelect={{ selectValue, setSelectValue }}
							/>
						))}
				</SortableContext>
			</DndContext>

			<button
				onClick={handleAddOption}
				style={{ color: form_mode_display ? colorMain : "text-[#000]" }}
				className={`${
					form_mode_display ? "group-hover:!bg-[#ffffff]" : ""
				} min-h-[4rem] w-[20rem]  bg-gray-100 px-[2rem] flex items-center gap-[1rem]  rounded-lg`}
			>
				<Plus size={16} className="" />
				Thêm lựa chọn
			</button>
			<div
				className="flex flex-wrap items-center gap-[1rem] 
			"
			>
				<span>Kết quả: </span>
				<p
					className="flex flex-wrap gap-[1rem] font-medium text-[1.8rem]
			max-w-[20rem] break-words"
				>
					{inputItem.core.options
						.filter((op) => selectValue.includes(op.option_id))
						.map((text) => (
							<span key={text.option_id}>{text.option_value}</span>
						))}
				</p>
			</div>
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputOption}
			inputTitle={title}
			dataTextTitle="Nhập tiêu đề chính cho các tùy chọn"
			inputItem={inputItem}
		/>
	);
};

export default memo(InputCoreOptionMultiple);
