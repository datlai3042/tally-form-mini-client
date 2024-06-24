import React, { useContext } from "react";
import { motion } from "framer-motion";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { useMutation } from "@tanstack/react-query";
import { FormCore } from "@/type";
import FormService from "@/app/_services/form.service";
import ModelOneOption from "@/app/(NextClient)/_components/Model/ModelOneOption";
import useUpdateForm from "@/app/hooks/useUpdateForm";

const ModelNotSave = () => {
	const { isDesignForm, setOpenFormDesign, setIsDesginForm, setOpenModelNotSave } = useContext(FormDesignContext);

	const FormBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);
	const formOriginal = useSelector((state: RootState) => state.form.formCoreOriginal);

	const dispatch = useDispatch();

	const onCancelDesign = () => {
		dispatch(onFetchForm({ form: FormBackUp }));
		setOpenFormDesign(false);
		setIsDesginForm(false);
		setOpenModelNotSave(false);
	};

	const updateFormAPI = useUpdateForm();

	const onSaveDesign = () => {
		updateFormAPI.mutate(formOriginal);
		setOpenFormDesign(false);
		setIsDesginForm(false);
		setOpenModelNotSave(false);
	};

	return (
		// <div className="showModelNotSave fixed top-[4rem] left-[50%] z-[105]  translate-x-[-50%] w-[30rem] xl:w-[40rem] h-[13rem] p-[2rem] flex flex-col justify-between text-[1.7rem] bg-[#ffffff] transition-all duration-700 border-[.1rem] border-slate-200 shadow-md  rounded-lg">
		// 	<p>Bạn chưa lưu thông tin chỉnh sửa</p>
		// 	<div className="w-full flex items-center justify-end gap-[1.4rem]">
		// 		<button
		// 			onClick={onCancelDesign}
		// 			className="border-[.1rem] border-red-600 text-red-600 min-w-[8rem] p-[.5rem] rounded-lg"
		// 		>
		// 			Hủy
		// 		</button>
		// 		<button
		// 			onClick={onSaveDesign}
		// 			className="border-[.1rem] border-blue-500 text-[#ffffff] bg-blue-500 min-w-[8rem] p-[.5rem] rounded-lg"
		// 		>
		// 			Lưu
		// 		</button>
		// 	</div>
		// </div>

		<ModelOneOption
			content="Bạn chưa lưu các thay đổi của mình"
			content_action="Lưu"
			content_cancel="Không lưu"
			callbackCancel={onCancelDesign}
			callbackAction={onSaveDesign}
		/>
	);
};

export default ModelNotSave;
