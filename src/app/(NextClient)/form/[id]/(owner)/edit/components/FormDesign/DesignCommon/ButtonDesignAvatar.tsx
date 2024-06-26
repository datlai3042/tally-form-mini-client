import { AlignCenter, AlignLeft, AlignRight, Circle, Square } from "lucide-react";
import React, { useContext, useState } from "react";
import { TypeEdit } from "./ButtonColor";
import { FormCore, InputCore } from "@/type";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onEditForm } from "@/app/_lib/redux/features/formEdit.slice";

type TProps = {};

const ButtonDesignAvatar = (props: TProps) => {
	const { isDesignForm, setIsDesginForm } = useContext(FormDesignContext);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const formAvatar = !!formCore.form_avatar?.form_avatar_url || false;
	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const dispatch = useDispatch();
	const [modeCurrent, setModeCurrent] = useState<FormCore.FormAvatarMode>(
		formCore.form_avatar?.mode_shape || formCore.form_setting_default.form_avatar_default_mode
	);

	const [positionAvatar, setPositionAvatar] = useState<FormCore.FormAvatarPosition>(
		formCore.form_avatar?.position || formCore.form_setting_default.form_avatar_default_postion
	);
	const styleEffect = {
		onCheckStyleActive: (active: boolean) => {
			if (active) return " border-[#fff] border-[.1rem]";
			return "border-transparent border-[.1rem]";
		},
	};

	const onChangeAvatarMode = (value: FormCore.FormAvatarMode) => {
		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		const formClone = structuredClone(formCore);
		const newForm = {
			...formClone,
			form_avatar: {
				...formClone.form_avatar,
				mode_shape: value,
			},
		} as FormCore.Form;

		dispatch(onEditForm({ form: newForm }));
	};

	const onChangeAvatarPosition = (value: FormCore.FormAvatarPosition) => {
		if (!isDesignForm) {
			setIsDesginForm(true);
		}
		const formClone = structuredClone(formCore);
		const newForm = {
			...formClone,
			form_avatar: {
				...formClone.form_avatar,

				position: value,
			},
		} as FormCore.Form;

		dispatch(onEditForm({ form: newForm }));
	};

	return (
		<div className="px-[2rem] flex flex-col  gap-[4rem]">
			<div className="flex gap-[4rem] ">
				<button
					disabled={!formAvatar}
					onClick={() => {
						onChangeAvatarPosition("left");
						setPositionAvatar("left");
					}}
					className={`${styleEffect.onCheckStyleActive(
						positionAvatar === "left"
					)} w-[3rem] h-[3rem] disabled:cursor-not-allowed flex items-center justify-center   border-[.1rem] border-slate-300   rounded-full  bg-[#ffffff]`}
				>
					<AlignLeft size={18} style={{ color: colorMain }} />
				</button>

				<button
					disabled={!formAvatar}
					onClick={() => {
						onChangeAvatarPosition("center");
						setPositionAvatar("center");
					}}
					className={`${styleEffect.onCheckStyleActive(
						positionAvatar === "center"
					)} w-[3rem] h-[3rem] disabled:cursor-not-allowed flex items-center justify-center   border-[.1rem] border-slate-300   rounded-full  bg-[#ffffff]`}
				>
					<AlignCenter size={18} style={{ color: colorMain }} />
				</button>
				<button
					disabled={!formAvatar}
					onClick={() => {
						onChangeAvatarPosition("right");
						setPositionAvatar("right");
					}}
					className={`${styleEffect.onCheckStyleActive(
						positionAvatar === "right"
					)} w-[3rem] h-[3rem] disabled:cursor-not-allowed flex items-center justify-center   border-[.1rem] border-slate-300  rounded-full  bg-[#ffffff]`}
				>
					<AlignRight size={18} style={{ color: colorMain }} />
				</button>
			</div>

			<div className="flex  gap-[4rem] ">
				<button
					disabled={!formAvatar}
					onClick={() => {
						onChangeAvatarMode("circle");
						setModeCurrent("circle");
					}}
					className={`${styleEffect.onCheckStyleActive(
						modeCurrent === "circle"
					)} w-[3rem] h-[3rem] disabled:cursor-not-allowed flex items-center justify-center   border-[.1rem] border-slate-300   rounded-full  bg-[#ffffff]`}
				>
					<Circle size={18} style={{ color: colorMain }} />
				</button>
				<button
					disabled={!formAvatar}
					onClick={() => {
						onChangeAvatarMode("square");
						setModeCurrent("square");
					}}
					className={`${styleEffect.onCheckStyleActive(
						modeCurrent === "square"
					)} w-[3rem] h-[3rem] disabled:cursor-not-allowed flex items-center justify-center   border-[.1rem] border-slate-300   rounded-full  bg-[#ffffff]`}
				>
					<Square size={18} style={{ color: colorMain }} />
				</button>
			</div>
		</div>
	);
};

export default ButtonDesignAvatar;
