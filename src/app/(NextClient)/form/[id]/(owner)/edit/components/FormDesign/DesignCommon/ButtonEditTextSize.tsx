import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TypeEdit } from "./ButtonColor";
import { inputSettingText } from "@/app/_constant/input.constant";
import { ArrowDown, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import { useDebouncedCallback } from "@mantine/hooks";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";

type TProps = {
	typeEdit: TypeEdit;
	inputItem?: InputCore.InputForm;
};

const ButtonEditTextSize = (props: TProps) => {
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const { typeEdit, inputItem } = props;

	const [openModelSize, setOpenModelSize] = useState<boolean>(false);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const fontSizeForm = formCore.form_title.form_title_size || formCore.form_setting_default.form_title_size_default;
	const fontSizeInput = formCore.form_setting_default.input_size;

	const [fontSize, setFontSize] = useState<number>(typeEdit === "Form" ? fontSizeForm : fontSizeInput);
	const dispatch = useDispatch();

	const ulRef = useRef<HTMLUListElement | null>(null);

	const liRef = useRef<HTMLLIElement | null>(null);

	useEffect(() => {
		if (openModelSize) {
			if (liRef.current && ulRef.current) {
				ulRef.current.scrollTop = liRef.current.offsetTop - 50;
			}
		}
	}, [openModelSize]);

	const divColorRef = useRef<HTMLDivElement | null>(null);

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (divColorRef.current && !divColorRef.current.contains(e.target as Node) && openModelSize) {
				setOpenModelSize(false);
			}
		},
		[setOpenModelSize, openModelSize]
	);

	useEffect(() => {
		document.addEventListener("click", globalClick);

		return () => {
			document.removeEventListener("click", globalClick);
		};
	}, [globalClick]);

	const onChangeTextSize = (size: number, type: "Input" | "Decrease" | "Increase") => {
		const MAX = typeEdit === "Form" ? 60 : 40;
		const MIN = 1;

		if (!size) {
			size = 1;
		}

		if (type === "Increase") {
			size = size === MAX ? MAX : (size += 1);
		}

		if (type === "Decrease") {
			size = size === MIN ? MIN : (size -= 1);
		}

		if (size > MAX && type === "Input") {
			size = MAX;
		}

		setFontSize(size);
		if (!isDesignForm) {
			setIsDesginForm(true);
		}

		const newFormEdit = structuredClone(formCore);
		if (typeEdit === "Form") {
			newFormEdit.form_title.form_title_size = size;
		}

		if (typeEdit === "Common") {
			newFormEdit.form_setting_default.input_size = size;
			newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
				ip.core.setting.input_size = size;
				return ip;
			});
		}
		if (typeEdit === "Input") {
			newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
				if (ip._id === inputItem?._id) {
					ip.core.setting = { ...ip.core.setting, input_size: size };
					return ip;
				}

				return ip;
			});
		}
		setOpenModelSize(false);
		dispatch(onFetchForm({ form: newFormEdit }));
	};

	const debounced = useDebouncedCallback(
		(value: number, type: "Input" | "Decrease" | "Increase") => onChangeTextSize(value, type),
		100
	);

	const titleCoreSize =
		typeEdit === "Form"
			? formCore.form_title.form_title_size || formCore.form_setting_default.form_title_size_default
			: formCore.form_setting_default.input_size;

	return (
		<div
			ref={divColorRef}
			className="relative w-max  max-h-[8rem] xl:h-[4rem] py-[.3rem] flex items-center justify-between gap-[1rem] bg-transparent "
		>
			<button
				className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full   border-[.1rem] border-slate-300"
				onClick={() => debounced(titleCoreSize, "Decrease")}
			>
				<ChevronDown size={18} style={{ color: colorMain }} />
			</button>

			<div className="w-[6rem] flex items-center justify-center">
				<input
					style={{ color: colorMain }}
					onClick={(e) => {
						e.stopPropagation();
						e.preventDefault();
						setOpenModelSize(true);
					}}
					type="number"
					onChange={(e) => debounced(+e.target.value, "Input")}
					value={titleCoreSize}
					className="w-[5rem] h-[3.6rem] text-center  bg-[#ffffff]  border-[.1rem] border-slate-300  rounded-lg outline-none"
				/>
			</div>
			<button
				className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full   border-[.1rem] border-slate-300"
				onClick={() => debounced(titleCoreSize, "Increase")}
			>
				<ChevronUp size={18} style={{ color: colorMain }} />
			</button>

			{openModelSize && (
				<ul
					ref={ulRef}
					className="scroll-text-size absolute z-[3] top-[4rem] right-[0rem] w-[6rem] max-h-[16rem]  overflow-y-scroll bg-[#ffffff] border-[.1rem] border-gray-200 outline-none"
				>
					{Array(typeEdit === "Form" ? 100 : 30)
						.fill(0)
						.map((_, i) => {
							if (i + 1 === titleCoreSize) {
								return (
									<li key={i} ref={liRef} className="bg-blue-400 p-[.2rem_2rem] hover:cursor-pointer">
										{i + 1}
									</li>
								);
							}
							return (
								<li
									onClick={() => onChangeTextSize(i + 1, "Decrease")}
									key={i}
									className="p-[.2rem_2rem] hover:bg-blue-200 hover:cursor-pointer"
								>
									{i + 1}
								</li>
							);
						})}
				</ul>
			)}
		</div>
	);
};

export default ButtonEditTextSize;
