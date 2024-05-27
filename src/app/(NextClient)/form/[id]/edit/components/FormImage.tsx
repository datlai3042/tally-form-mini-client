import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import React, { useContext } from "react";
import FormBackground from "./FormBackground";
import FormAvatar from "./FormAvatar";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";

const FormImage = () => {
	const { formInitial } = useContext(FormEditContext);

	return (
		<DivNative className="group relative w-full min-h-[45rem]">
			{formInitial.form_background && <FormBackground />}

			{formInitial.form_avatar && <FormAvatar />}
		</DivNative>
	);
};

export default FormImage;
