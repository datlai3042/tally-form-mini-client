import Portal from "@/app/(NextClient)/_components/Portal";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import ButtonNativeIcon from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNativeIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { InputCore, ReactCustom } from "@/type";
import { ALargeSmall, AtSign, CircleHelp } from "lucide-react";
import React, { SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import InputGuideIntroduce from "./InputIntroduce/InputGuideIntroduce";
import InputTextIntroduce from "./InputIntroduce/InputTextIntroduce";
import InputEmailIntroduce from "./InputIntroduce/InputEmailIntroduce";

type TProps = {
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;

	inputItem: InputCore.InputForm;
};

type ButtonInputType = { type: InputCore.InputForm["type"] | "Guide"; Icon: React.ReactNode; content: string };
type TInputIntroduce = ButtonInputType["type"] | "Guide";
const buttons: ButtonInputType[] = [
	{ type: "Guide", Icon: <CircleHelp className="text-textMain" size={18} />, content: "Guide" },
	{ type: "EMAIL", Icon: <AtSign className="text-textMain" size={18} />, content: "Email" },
	{ type: "TEXT", Icon: <ALargeSmall className="text-textMain" size={18} />, content: "Text" },
];

const chooseInputIntroduce = (
	type: ButtonInputType["type"],
	inputItem: InputCore.InputForm,
	setOpenModel: ReactCustom.SetStateBoolean
) => {
	switch (type) {
		case "Guide":
			return <InputGuideIntroduce />;
		case "TEXT":
			return <InputTextIntroduce inputItem={inputItem} setOpenModel={setOpenModel} />;
		case "EMAIL":
			return <InputEmailIntroduce inputItem={inputItem} setOpenModel={setOpenModel} />;
		default:
			return <InputGuideIntroduce />;
	}
};

const ModelInputType = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const [inputIntroduce, setInputIntroduce] = useState<ButtonInputType["type"]>("Guide");

	const {
		formInitial: { form_inputs },
		setFormInitial,
	} = useContext(FormEditContext);

	const renderInputIntroduce = useMemo(
		() => chooseInputIntroduce(inputIntroduce, inputItem, setOpenModel),
		[inputIntroduce, inputItem, setOpenModel]
	);

	const modelRef = useRef<HTMLDivElement | null>(null);
	const checkDocumentClick = useCallback(
		(e: MouseEvent) => {
			if (modelRef.current && !modelRef.current.contains(e.target as Node)) {
				console.log("check");
				setOpenModel(false);
			}
		},
		[setOpenModel]
	);

	useEffect(() => {
		document.addEventListener("click", checkDocumentClick);

		return () => {
			document.removeEventListener("click", checkDocumentClick);
		};
	}, [checkDocumentClick]);

	return (
		<Portal>
			<DivNative className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[3] px-[1rem] flex justify-center items-center">
				<DivNativeRef
					className="w-[80rem] min-h-[40rem] h-max xl:w-[80rem] xl:h-[60rem]  flex flex-col bg-[#ffffff] rounded-lg"
					ref={modelRef}
				>
					<DivNative className="w-full h-[6rem] flex justify-center items-center text-[2rem] bg-blue-50">
						Khu vực Search
					</DivNative>
					<DivNative className="flex-1 w-full h-full flex  ">
						<DivNative className=" w-[35%] xl:w-[30%] h-full p-[1rem_1.4rem] flex flex-col gap-[1rem]">
							<ParagraphNative
								className="text-textGray text-[1.2rem] font-bold opacity-80"
								textContent="Input blocks"
							/>
							<DivNative className="flex flex-col gap-[1rem] ">
								{buttons.map((btn) => (
									<ButtonNativeIcon
										key={btn.content + btn.type}
										className="w-[70%] flex items-center justify-start gap-[.8rem] text-[1.6rem]"
										onClick={() => setInputIntroduce(btn.type)}
										textContent={btn.content}
										icon={btn.Icon}
									/>
								))}
							</DivNative>
						</DivNative>
						<DivNative className="flex w-[65%] xl:w-[70%] h-full border-l-[.2rem] border-gray-100 ">
							{renderInputIntroduce}
						</DivNative>
					</DivNative>
				</DivNativeRef>
			</DivNative>
		</Portal>
	);
};

export default ModelInputType;
