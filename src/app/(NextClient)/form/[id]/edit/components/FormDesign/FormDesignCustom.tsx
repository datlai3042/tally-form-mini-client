import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import ButtonColor from "@/app/(NextClient)/form/[id]/edit/components/FormDesign/DesignCommon/ButtonColor";
import ButtonEditTextSize from "@/app/(NextClient)/form/[id]/edit/components/FormDesign/DesignCommon/ButtonEditTextSize";
import ButtonEditTextStyle from "@/app/(NextClient)/form/[id]/edit/components/FormDesign/DesignCommon/ButtonEditTextStyle";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormDesignTitle from "./FormDesignText";
import FormDesignBackground from "./FormDesignBackground";
import FormDesignText from "./FormDesignText";
import { toast } from "@/components/ui/use-toast";
import ModelNotSave from "./ModelNotSave";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import { useMutation } from "@tanstack/react-query";
import { FormCore } from "@/type";
import FormService from "@/app/_services/form.service";
import FormDesignAvatar from "./FormDesignAvatar";

const FormDesignCustom = () => {
	const { isDesignForm, setOpenModelNotSave, setIsDesginForm, setOpenFormDesign } = useContext(FormDesignContext);
	const { modeScreen } = useContext(FormModeScreenContext);

	const FormBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);
	const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);

	const dispatch = useDispatch();

	const onCloseFormDesign = () => {
		if (isDesignForm) {
			return setOpenModelNotSave(true);
		}

		dispatch(onFetchForm({ form: FormBackUp }));
		setOpenFormDesign(false);
		setIsDesginForm(false);
	};

	const updateTypeInputMutation = useMutation({
		mutationKey: ["choose type input"],
		mutationFn: (form: FormCore.Form) => FormService.updateForm(form),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	const onSaveDesign = () => {
		updateTypeInputMutation.mutate(formOriginal);
		setOpenFormDesign(false);
		setIsDesginForm(false);
		setOpenModelNotSave(false);
	};

	return (
		<div className="scroll-desgin-custom fixed  top-[7rem] right-[2rem] h-[65rem] overflow-y-scroll      z-[100] w-[34rem] xl:w-[28rem]  bg-[#222] shadow-lg">
			<div className="relative min-h-full h-max pb-[8rem]  border-y-[.1rem] border-l-[.1rem] border-[#464646] ">
				<div className="relative w-full min-h-full h-max  py-[2rem] flex flex-col  gap-[2rem]  ">
					<p className="text-center text-[#ffffff]">Tùy biến Form</p>
					<FormDesignText title={"Tùy chỉnh tiêu đề chính"} type="Form" />

					<FormDesignBackground />
					<FormDesignAvatar />
					<FormDesignText title={"Tùy chỉnh tiêu đề phụ"} type="Common" />

					<button className="absolute top-[1rem] right-[1rem]" onClick={onCloseFormDesign}>
						Đóng
					</button>
				</div>
				<ButtonNative
					textContent="Lưu"
					className="absolute right-[10%]  w-[25%] h-[4rem] bg-slate-900 text-white rounded-md "
					onClick={onSaveDesign}
				/>
			</div>
		</div>
	);
};

export default FormDesignCustom;
