import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
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
import ButtonDesgin from "./DesignCommon/ButtonDesgin";
import FormDesignFormMode from "./FormDesignFormMode";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { X } from "lucide-react";

const FormDesignCustom = () => {
	const { isDesignForm, setOpenModelNotSave, setIsDesginForm, setOpenFormDesign } = useContext(FormDesignContext);

	const FormBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);
	const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const dispatch = useDispatch();

	const onCloseFormDesign = () => {
		if (isDesignForm) {
			return setOpenModelNotSave(true);
		}

		dispatch(onFetchForm({ form: FormBackUp }));
		setOpenFormDesign(false);
		setIsDesginForm(false);
	};

	const updateFormAPI = useUpdateForm();

	const onSaveDesign = () => {
		updateFormAPI.mutate(formOriginal);
		setOpenFormDesign(false);
		setIsDesginForm(false);
		setOpenModelNotSave(false);
	};

	return (
		<div
			style={{ backgroundColor: "#fff", color: "#000" }}
			className="scroll-desgin-custom fixed z-[104] top-0 right-[0rem] h-screen overflow-y-scroll w-[28rem]  shadow-2xl"
		>
			<div className="relative min-h-full h-max pb-[8rem]  border-y-[.2rem] border-l-[.2rem] border-gray-200 rounded-lg ">
				<div className="relative w-full min-h-full h-max  py-[2rem] px-[1rem] flex flex-col  gap-[2rem]  ">
					<p className="mt-[1rem] text-[1.6rem]  font-medium text-center pb-[2rem] border-b-[.1rem] border-[#ccc]">
						Tùy biến giao diện
					</p>
					<FormDesignFormMode />
					<FormDesignText title={"Tùy chỉnh tiêu đề chính"} type="Form" />

					<FormDesignBackground />
					<FormDesignAvatar />
					<FormDesignText title={"Tùy chỉnh tiêu đề phụ"} type="Common" />

					<button
						style={{ backgroundColor: colorMain }}
						className="absolute top-[.6rem] right-[.6rem] p-[.6rem] text-[1.3rem] rounded-lg  text-[#fff]"
						onClick={onCloseFormDesign}
					>
						Đóng
					</button>
				</div>
				<ButtonNative
					style={{ backgroundColor: colorMain }}
					textContent="Lưu"
					className="absolute right-[10%]  w-[25%] h-[4rem] text-[#fff] rounded-lg "
					onClick={onSaveDesign}
				/>
			</div>
		</div>
	);
};

export default FormDesignCustom;
