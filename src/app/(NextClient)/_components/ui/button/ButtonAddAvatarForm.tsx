"use client";

import { Hexagon } from "lucide-react";
import React, { useContext } from "react";
import { FormEditContext } from "../../provider/FormEditProvider";

export interface ButtonAddAvatarFormProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	textContent?: string;
}

const ButtonAddAvatarForm = (props: ButtonAddAvatarFormProps) => {
	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const { textContent = "Thêm Avatar", ...buttonProps } = props;

	const onAddAvatar = () => {
		const avatarUrlDefault = formInitial.form_setting_default.form_avatar_default_url;
		setFormInitial((prev) => ({ ...prev, form_avatar: { form_avatar_url: avatarUrlDefault } }));
	};

	return (
		<button
			{...buttonProps}
			className={` ${buttonProps.className} w-[14rem] flex items-center justify-center gap-[.5rem] text-textHeader  rounded-md text-[1.5rem] font-bold hover:bg-gray-200 hover:text-slate-700`}
			onClick={onAddAvatar}
		>
			<Hexagon />
			{textContent}
		</button>
	);
};

export default ButtonAddAvatarForm;
