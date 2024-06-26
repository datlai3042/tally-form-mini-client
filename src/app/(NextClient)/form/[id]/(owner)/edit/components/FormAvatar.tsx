import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { FormCore } from "@/type";
import { RootState } from "@/app/_lib/redux/store";

import { generateStyleAvatarForm } from "@/app/utils/form.utils";

import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const FormAvatar = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	const { position, shape } = generateStyleAvatarForm({
		formCore,
	});

	return (
		<React.Fragment>
			<Image
				width={150}
				height={150}
				src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
				quality={100}
				onClick={onControllModel}
				alt="avatar"
				className={`${position} ${shape} absolute bottom-0 z-[3] object-center translate-y-[50%] w-[14rem] h-[14rem] xl:w-[20rem] xl:h-[20rem] hover:cursor-pointer `}
			/>
			{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
		</React.Fragment>
	);
};

export default FormAvatar;
