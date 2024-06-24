import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import ButtonSelect from "@/app/(NextClient)/_components/ui/button/ButtonSelect";
import { onEditForm, onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import useChangeModeDisplay from "@/app/hooks/useChangeModeDisplay";
import useChangeModeForm from "@/app/hooks/useChangeModeForm";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormDesignFormMode = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const changeModeDisplay = useChangeModeDisplay();

	const dispatch = useDispatch();

	const onChanegModeDisplay = () => {
		let mode = formCore.form_mode_display;
		if (mode === "basic") {
			mode = "custom";
		} else {
			mode = "basic";
		}

		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		const newForm = structuredClone(formCore);
		newForm.form_mode_display = mode;
		dispatch(onEditForm({ form: newForm }));
		// changeModeDisplay.mutate({ mode, form_id: formCore._id });
	};

	return (
		<div className="w-[70%] p-[1rem]">
			<ButtonSelect
				disabled={changeModeDisplay.isPending}
				onClick={onChanegModeDisplay}
				checked={formCore.form_mode_display === "basic"}
				color={colorMain}
				value="Chế độ tối giản"
			/>
		</div>
	);
};

export default FormDesignFormMode;
