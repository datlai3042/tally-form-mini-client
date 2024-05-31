import { onEditForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { Bold, Italic, RemoveFormatting } from "lucide-react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormDesignContext } from "../../provider/FormDesignProvider";

const ButtonEditTextStyle = () => {
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const FormCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const dispatch = useDispatch();

	const styleEffect = {
		onCheckStyleActive: (active: boolean) => {
			if (active) return "border-gray-600";
			return "border-gray-300";
		},
	};

	const onChangeStyleText = (style: FormCore.Form["form_title_style"]) => {
		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		const newForm = structuredClone(FormCore);
		newForm.form_title_style = style;
		dispatch(onEditForm({ form: newForm }));
	};

	return (
		<div className=" px-[3rem] flex items-center justify-between">
			<span>Kiểu chủ</span>
			<div className="flex gap-[.5rem]">
				<button
					onClick={() => onChangeStyleText("normal")}
					className={`${styleEffect.onCheckStyleActive(
						FormCore.form_title_style === "normal"
					)} p-[.2rem_.8rem] border-[.1rem]  rounded-lg`}
				>
					<RemoveFormatting />
				</button>

				<button
					onClick={() => onChangeStyleText("italic")}
					className={`${styleEffect.onCheckStyleActive(
						FormCore.form_title_style === "italic"
					)} p-[.2rem_.8rem] border-[.1rem]  rounded-lg`}
				>
					<Italic />
				</button>
			</div>
		</div>
	);
};

export default ButtonEditTextStyle;
