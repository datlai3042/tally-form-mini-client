import { onEditForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { useDebouncedCallback } from "@mantine/hooks";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonPositionBackground = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const dispatch = useDispatch();
	const debounced = useDebouncedCallback((position: number, type: "x" | "y") => onChangePosition(position, type), 0);

	const formBackground =
		!!formCore.form_background?.form_background_iamge_url || formCore.form_background_state || false;

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

		console.log({ newForm });

		dispatch(onEditForm({ form: newForm }));
	};

	return (
		<div className=" flex flex-col gap-[2rem]">
			<div className="flex items-center gap-[2rem] ">
				<span className="">Trục X</span>

				<input
					style={{ color: colorMain }}
					disabled={!formBackground}
					defaultValue={directionY}
					type="number"
					className={`${styleEffect.onCheckHasBackground(
						formBackground
					)} w-[7rem] p-[.2rem_1.6rem]    border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
					onChange={(e) => debounced(+e.target.value, "y")}
				/>
			</div>
			<div className="flex items-center gap-[2rem] ">
				<span className="">Trục Y</span>
				<input
					style={{ color: colorMain }}
					disabled={!formBackground}
					defaultValue={directionX}
					type="number"
					className={`${styleEffect.onCheckHasBackground(
						formBackground
					)} w-[7rem] p-[.2rem_1.6rem]    border-[.1rem] border-slate-300  rounded-lg bg-[#ffffff]`}
					onChange={(e) => debounced(+e.target.value, "x")}
				/>
			</div>
		</div>
	);
};

export default ButtonPositionBackground;
