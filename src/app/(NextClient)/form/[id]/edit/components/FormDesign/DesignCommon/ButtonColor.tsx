import React, { useMemo, useState } from "react";
import SelectColor from "../../../../../../_components/ui/SelectColor";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";

export type TypeEdit = "Form" | "Common" | "Input";
type TProps = {
	typeEdit: TypeEdit;
};

const selectColorWithMode = (type: TypeEdit, formCore: FormCore.Form) => {
	let color = "";
	switch (type) {
		case "Form":
			color = formCore.form_title_color
				? formCore.form_title_color
				: (formCore.form_setting_default.form_title_color_default as string);
			return color;

		case "Common":
			color = formCore.form_setting_default.input_color;
			return color;

		case "Input":
			color = formCore.form_setting_default.input_color;
			return color;

		default:
			break;
	}
};

const ButtonColor = (props: TProps) => {
	const { typeEdit } = props;

	const [openColorModel, setOpenColorModel] = useState<boolean>(false);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	let color = useMemo(() => selectColorWithMode(typeEdit, formCore), [formCore, typeEdit]);

	return (
		<div className="relative max-h-[8rem] xl:h-[4rem] px-[2.5rem] flex  flex-col xl:flex-row  xl:items-center justify-between gap-[.5rem] xl:gap-[1rem]">
			{<SelectColor setOpenColorModel={setOpenColorModel} typeEdit={typeEdit} />}
		</div>
	);
};

export default ButtonColor;
