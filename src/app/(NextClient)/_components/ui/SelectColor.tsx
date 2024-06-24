import { FormCore, InputCore, ReactCustom } from "@/type";
import React, { SetStateAction, useCallback, useContext, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import DivNativeRef from "./NativeHtml/DivNativeRef";
import { useDispatch, useSelector } from "react-redux";
import { onEditForm, onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormDesignContext } from "../provider/FormDesignProvider";
import { TypeEdit } from "../../form/[id]/(owner)/edit/components/FormDesign/DesignCommon/ButtonColor";

type TProps = {
	setOpenColorModel: ReactCustom.SetStateBoolean;

	typeEdit: TypeEdit;
	inputItem?: InputCore.InputForm;
};

const SelectColor = (props: TProps) => {
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const { inputItem, typeEdit, setOpenColorModel } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const divColorRef = useRef<HTMLDivElement | null>(null);

	const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);
	const dispatch = useDispatch();

	const globalClick = useCallback(
		(e: MouseEvent) => {
			if (divColorRef.current && !divColorRef.current.contains(e.target as Node)) {
				setOpenColorModel(false);
			}
		},
		[setOpenColorModel]
	);

	const onChangeColor = (color: string) => {
		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		const newFormEdit = structuredClone(formCore);
		if (typeEdit === "Form") {
			newFormEdit.form_title.form_title_color = color;
		}

		if (typeEdit === "Common") {
			newFormEdit.form_setting_default.input_color = color;
			newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
				ip.core.setting.input_color = color;
				return ip;
			});
		}

		if (typeEdit === "Input") {
			newFormEdit.form_inputs = newFormEdit.form_inputs.map((ip) => {
				if (ip._id === inputItem?._id) {
					ip.core.setting = {
						...(ip.core.setting as InputCore.Setting.InputSettingTextCommon),
						input_color: color,
					};
					return ip;
				}
				return ip;
			});
		}
		dispatch(onEditForm({ form: newFormEdit }));
	};

	useEffect(() => {
		document.addEventListener("click", globalClick);

		return () => {
			document.removeEventListener("click", globalClick);
		};
	}, [globalClick]);

	return (
		<DivNativeRef
			ref={divColorRef}
			className="custom-color-title absolute z-[2] top-[0rem] left-0"
			onBlur={() => setOpenColorModel(false)}
			onClick={(e) => e.stopPropagation()}
		>
			<HexColorPicker color={formCore.form_title.form_title_color} onChange={onChangeColor} />
		</DivNativeRef>
	);
};

export default SelectColor;
