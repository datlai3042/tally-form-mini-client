import ModelFormImage from "@/app/(NextClient)/_components/Model/ModelFormImage";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import ButtonRemoveBackgroudForm from "@/app/(NextClient)/_components/ui/button/ButtonRemoveBackgroudForm";
import ButtonSave from "@/app/(NextClient)/_components/ui/button/ButtonSave";
import React, { useContext, useState } from "react";

const FormBackground = () => {
	const { formInitial } = useContext(FormEditContext);
	const { modeScreen, setModeScreen } = useContext(FormModeScreenContext);

	const [openModel, setOpenModel] = useState<boolean>(false);

	const onControllModel = () => {
		setOpenModel((prev) => !prev);
	};

	const onSetScreen = () => {
		if (modeScreen === "FULL") return setModeScreen("NORMAL");
		return setModeScreen("FULL");
	};

	return (
		<React.Fragment>
			<DivNative
				style={{
					backgroundImage: `url("${
						formInitial.form_background?.form_background_iamge_url ||
						formInitial.form_setting_default.form_background_default_url
					}")`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
					backgroundAttachment: "fixed",
					backgroundPosition: "center center ",
				}}
				className="absolute inset-0 z-[2] "
			></DivNative>
			{modeScreen === "NORMAL" && (
				<React.Fragment>
					<DivNative className="flex xl:hidden absolute right-[1rem] top-[1rem]  gap-[1rem]">
						<DivNative className=" flex items-center justify-center " title="Review">
							<ButtonNative
								textContent={`Review ${modeScreen}`}
								className="p-[.8rem] rounded-md bg-blue-500 text-white"
								onClick={onSetScreen}
							/>
						</DivNative>

						<ButtonSave />

						<DivNative className=" flex items-center justify-center " title="Publish">
							<ButtonNative
								textContent="Publish"
								className="p-[.8rem] rounded-md bg-blue-500 text-white"
							/>
						</DivNative>
					</DivNative>
					<DivNative className="hidden group-hover:block absolute right-[2rem] xl:right-[6rem] bottom-[2rem] z-[3]">
						<ButtonNative
							onClick={() => setOpenModel(true)}
							textContent="Thay đổi ảnh bìa"
							className="w-[15rem] h-[4rem] px-[1rem] border-[.1rem] border-slate-150 bg-[#ffffff] rounded-lg"
						/>
						<DivNative className=" flex sm:hidden mt-[2rem]  items-center justify-center " title="Review">
							<ButtonNative
								textContent={`Review ${modeScreen}`}
								className="w-[15rem] p-[.8rem] rounded-md bg-blue-500 text-white"
								onClick={onSetScreen}
							/>
						</DivNative>
					</DivNative>
				</React.Fragment>
			)}
			{openModel && <ModelFormImage setOpenModel={setOpenModel} MODE="COVER" />}
		</React.Fragment>
	);
};

export default FormBackground;
