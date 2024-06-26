import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onEditForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonBackgroundPostition = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = useSelector((state: RootState) => state.form.colorCore);
	const dispatch = useDispatch();

	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const debounced = useDebouncedCallback((position: number, type: "x" | "y") => onChangePosition(position, type), 0);

	const formBackground = !!formCore.form_background?.form_background_iamge_url || false;

	const styleEffect = {
		onCheckHasBackground: (check: boolean) => {
			if (check) return "hover:cursor-pointer";
			return "hover:cursor-not-allowed";
		},
	};

	const directionX =
		formCore.form_background?.form_background_position?.x ||
		formCore.form_setting_default.form_background_position_default.x;
	const directionY =
		formCore.form_background?.form_background_position?.y ||
		formCore.form_setting_default.form_background_position_default.y;

	const onChangePosition = (position: number, type: "x" | "y") => {
		const formClone = structuredClone(formCore);
		const newForm: FormCore.Form = {
			...formClone,
			form_background: {
				...formClone.form_background,
				form_background_position: { ...formClone.form_background?.form_background_position, [type]: position },
			} as FormCore.Form["form_background"],
		};

		if (!isDesignForm) {
			setIsDesginForm(true);
		}

		dispatch(onEditForm({ form: newForm }));
	};

	return (
		<div className=" flex flex-col gap-[2rem]">
			<div className="flex items-center gap-[2rem] ">
				<span className="">Trục X</span>
				<div
					className={`${styleEffect.onCheckHasBackground(
						formBackground
					)} w-[7rem] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
				>
					<input
						style={{ color: colorMain }}
						disabled={!formBackground}
						defaultValue={directionY}
						type="number"
						className={` w-[80%] disabled:cursor-not-allowed  `}
						onChange={(e) => debounced(+e.target.value, "y")}
					/>

					<span className="opacity-75">%</span>
				</div>
			</div>
			<div className="flex items-center gap-[2rem] ">
				<span className="">Trục Y</span>
				<div
					className={`${styleEffect.onCheckHasBackground(
						formBackground
					)} w-[7rem] flex items-center gap-[1rem] h-[3rem] p-[.2rem_1rem]
border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
				>
					<input
						style={{ color: colorMain }}
						disabled={!formBackground}
						defaultValue={directionX}
						type="number"
						className={` w-[80%] disabled:cursor-not-allowed  `}
						onChange={(e) => debounced(+e.target.value, "x")}
					/>
					<span className="opacity-75">%</span>
				</div>
			</div>
		</div>
	);
};

export default ButtonBackgroundPostition;
