import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore, ReactCustom } from "@/type";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormDesignContext } from "../../provider/FormDesignProvider";

const ButtonEditTextSize = () => {
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const [openModelSize, setOpenModelSize] = useState<boolean>(false);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
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

	const onChangeTextSize = (size: number) => {
		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		setOpenModelSize(false);
		const newForm = structuredClone(formCore);
		newForm.form_title_size = size;
		dispatch(onFetchForm({ form: newForm }));
	};

	const titleCoreSize = formCore.form_title_size || formCore.form_setting_default.form_title_size_default;

	return (
		<div ref={divColorRef} className="relative h-[4rem] px-[3rem] flex items-center justify-between ">
			<p className="flex items-center gap-[1rem]">
				<span>Cở chữ {titleCoreSize} </span>
			</p>
			<button
				onClick={(e) => {
					e.stopPropagation();
					e.preventDefault();
					setOpenModelSize(true);
				}}
				className=" p-[.2rem_2.2rem] border-[.1rem] border-gray-200 rounded-lg"
			>
				{titleCoreSize}
			</button>
			{openModelSize && (
				<ul
					ref={ulRef}
					className="scroll-text-size absolute z-[3] top-[4rem] right-[3rem] w-[6rem] max-h-[16rem]  overflow-y-scroll bg-[#ffffff] border-[.1rem] border-gray-200 outline-none"
				>
					{Array(100)
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
									onClick={() => onChangeTextSize(i + 1)}
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
