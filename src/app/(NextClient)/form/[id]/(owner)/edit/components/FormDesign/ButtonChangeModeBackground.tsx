import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ButtonChangeModeBackground = () => {
	const dispatch = useDispatch();

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const styleEffect = {
		onCheckModeSelect: (check: boolean) => {
			if (check) return "bg-slate-900 text-[#fff]";
			return "bg-gray-100 text-[#000] hover:bg-gray-200";
		},
	};

	const onChangeModeBackground = (mode: "cover" | "contain") => {
		if (isDesignForm) {
			setIsDesginForm(true);
		}

		const newFormEdit = structuredClone(formCore);
		newFormEdit.form_background!.mode_show = mode;

		dispatch(onFetchForm({ form: newFormEdit }));
	};

	return (
		<div className="w-full h-[4rem] flex items-center gap-[2rem]">
			<button
				onClick={() => onChangeModeBackground("contain")}
				className={`${styleEffect.onCheckModeSelect(
					formCore.form_background?.mode_show === "contain"
				)} min-w-[10rem] h-full rounded-lg `}
			>
				contain
			</button>
			<button
				onClick={() => onChangeModeBackground("cover")}
				className={`${styleEffect.onCheckModeSelect(
					formCore.form_background?.mode_show === "cover"
				)} min-w-[10rem] h-full rounded-lg `}
			>
				cover
			</button>
		</div>
	);
};

export default ButtonChangeModeBackground;
