import { AlignCenter, AlignLeft, AlignRight, Circle, Square } from "lucide-react";
import React, { useContext, useState } from "react";
import { TypeEdit } from "./ButtonColor";
import { FormCore, InputCore } from "@/type";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
	inputItem?: InputCore.InputForm;
};

const ButtonDesignAvatar = (props: TProps) => {
	const { inputItem } = props;

	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const FormCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const dispatch = useDispatch();
	// const modeActive =FormCore.
	// const [modeCurrent, setModeCurrent] = useState<FormCore.FormAvatarMode>(modeActive);

	const styleEffect = {
		onCheckStyleActive: (active: boolean) => {
			if (active) return "border-[#fff]";
			return "border-transparent";
		},
	};

	// const onChangeStyleText = (style: FormCore.FormTextStyle) => {
	// 	if (!isDesignForm) {
	// 		setIsDesginForm(true);
	// 	}
	// 	const newForm = structuredClone(FormCore);
	// 	if (typeEdit === "Form") {
	// 		newForm.form_title_style = style;
	// 	}

	// 	if (typeEdit === "Common") {
	// 		newForm.form_setting_default.input_style = style as FormCore.FormTextStyle;
	// 		newForm.form_inputs = newForm.form_inputs.map((ip) => {
	// 			ip.setting.input_style = style;
	// 			return ip;
	// 		});
	// 	}
	// 	if (typeEdit === "Input") {
	// 		newForm.form_inputs = newForm.form_inputs.map((ip) => {
	// 			if (ip._id === inputItem?._id) {
	// 				ip.setting = { ...ip.setting, input_style: style as FormCore.FormTextStyle };
	// 				return ip;
	// 			}

	// 			return ip;
	// 		});
	// 	}
	// 	dispatch(onEditForm({ form: newForm }));
	// };

	// console.log({ styleCurrent, FormCore, typeEdit });

	return (
		<div className="px-[2rem] flex flex-col  gap-[4rem]">
			<div className="flex gap-[4rem] ">
				<button className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full  bg-[#464646]">
					<AlignLeft size={18} color="#ccc" />
				</button>

				<button className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full  bg-[#464646]">
					<AlignCenter size={18} color="#ccc" />
				</button>
				<button className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full  bg-[#464646]">
					<AlignRight size={18} color="#ccc" />
				</button>
			</div>

			<div className="flex  gap-[4rem] ">
				<button className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full  bg-[#464646]">
					<Circle size={18} color="#ccc" />
				</button>
				<button className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full  bg-[#464646]">
					<Square size={18} color="#ccc" />
				</button>
			</div>
		</div>
	);
};

export default ButtonDesignAvatar;
