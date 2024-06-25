import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import React, { useContext, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useDispatch, useSelector } from "react-redux";

const ButtonBackgroundColor = () => {
	const dispatch = useDispatch();

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const [openModelColor, setOpenModelColor] = useState<boolean>(false);

	const onChangeColor = (color: string) => {
		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		const newFormEdit = structuredClone(formCore);
		newFormEdit.form_background!.backgroundColor = color;

		dispatch(onFetchForm({ form: newFormEdit }));
	};

	return (
		<div className="flex flex-col gap-[1rem]">
			<button
				onClick={() => setOpenModelColor((prev) => !prev)}
				className="relative flex items-center gap-[2rem] h-[4rem]"
			>
				<p>Màu nền </p>
				<div className="w-[6rem] h-[3rem] flex items-center justify-center border-[.1rem] border-slate-300 rounded-md">
					<div className="w-[4rem] h-[1.5rem] border-[.1rem] border-slate-300"></div>
				</div>
				{openModelColor && (
					<ClickOutSide setOpenModel={setOpenModelColor}>
						<div
							className="absolute top-[100%] z-[2]  left-0"
							// onBlur={() => setOpenColorModel(false)}
							onClick={(e) => e.stopPropagation()}
						>
							<HexColorPicker
								color={formCore.form_background?.backgroundColor}
								onChange={onChangeColor}
							/>
						</div>
					</ClickOutSide>
				)}
			</button>

			<span className="text-[1.2rem] opacity-55">
				Khi hình ảnh quá nhỏ thì màu nền sẽ phủ tiếp cho bức ảnh, còn bức ảnh vừa thì màu nền sẽ không hiển thị
			</span>
		</div>
	);
};

export default ButtonBackgroundColor;
