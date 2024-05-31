import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import Image from "next/image";
import React, { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const FormAvatar = () => {
	const dispatch = useDispatch();
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	return (
		<React.Fragment>
			<Image
				width={150}
				height={150}
				src={formCore.form_avatar?.form_avatar_url || formCore.form_setting_default.form_avatar_default_url}
				quality={100}
				onClick={onControllModel}
				alt="avatar"
				className="absolute left-[calc(25%-6.4rem)] bottom-0 z-[3] object-center translate-y-[50%] w-[20rem] h-[20rem] rounded-full"
			/>
			{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="AVATAR" />}
		</React.Fragment>
	);
};

export default FormAvatar;
