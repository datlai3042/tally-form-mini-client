import { FormCore, ReactCustom } from "@/type";
import React, { SetStateAction, useCallback, useContext, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";
import DivNativeRef from "./NativeHtml/DivNativeRef";
import { useDispatch, useSelector } from "react-redux";
import { onEditForm, onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormDesignContext } from "../provider/FormDesignProvider";

type TProps = {
	setOpenColorModel: ReactCustom.SetStateBoolean;
};

const SelectColor = (props: TProps) => {
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const { setOpenColorModel } = props;
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
		const newFormEdit = { ...formOriginal };
		newFormEdit.form_title_color = color;
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
			className="custom-color-title absolute z-[2] top-[5rem]"
			onBlur={() => setOpenColorModel(false)}
		>
			<HexColorPicker color={formCore.form_title_color} onChange={onChangeColor} />
		</DivNativeRef>
	);
};

export default SelectColor;
