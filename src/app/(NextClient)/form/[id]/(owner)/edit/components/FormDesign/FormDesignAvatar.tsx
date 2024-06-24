import { RootState } from "@/app/_lib/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import ButtonDesignAvatar from "./DesignCommon/ButtonDesignAvatar";

const FormDesignAvatar = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreBackUp);

	const formAvatar = !!formCore.form_avatar?.form_avatar_url || formCore.form_avatar_state || false;

	const styleEffect = {
		onCheckHasBackground: (check: boolean) => {
			if (check) return "bg-transparent";
			return "opacity-40 cursor-not-allowed";
		},
	};

	return (
		<div
			className={`${styleEffect.onCheckHasBackground(
				formAvatar
			)} flex flex-col gap-[4rem] p-[1rem] border-t-[.1rem] border-slate-200 `}
		>
			<p className="font-medium">Tùy chỉnh hình đại diện {!formAvatar ? "(Chưa upload ảnh)" : ""}</p>
			<ButtonDesignAvatar />
		</div>
	);
};

export default FormDesignAvatar;
