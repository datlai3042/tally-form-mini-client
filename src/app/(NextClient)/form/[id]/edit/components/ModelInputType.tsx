import Portal from "@/app/(NextClient)/_components/Portal";
import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import ButtonNativeIcon from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNativeIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { InputCore, ReactCustom } from "@/type";
import { AtSign } from "lucide-react";
import React, { SetStateAction, useCallback, useContext, useEffect, useRef } from "react";

type TProps = {
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;

	indexItem: number;
};

const buttons = [{ type: "EMAIL", Icon: <AtSign className="text-textMain" size={18} />, content: "Email" }] as {
	type: InputCore.InputForm["type"];
	Icon: React.ReactNode;
	content: string;
}[];

const ModelInputType = (props: TProps) => {
	const { indexItem, setOpenModel } = props;
	const {
		formInitial: { form_inputs },
		setFormInitial,
	} = useContext(FormEditContext);

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

	const addInputItem = (type: InputCore.InputForm["type"]) => {
		console.log({ type, indexItem });
		if (typeof indexItem === "number") {
			setFormInitial((prev) => {
				const newArray = [...prev.form_inputs];
				console.log({ prev });
				newArray[indexItem] = { type: "EMAIL" };

				return {
					...prev,
					form_inputs: newArray,
				};
			});
		}
	};

	useEffect(() => {
		document.addEventListener("click", checkDocumentClick);

		return () => {
			document.removeEventListener("click", checkDocumentClick);
		};
	}, [checkDocumentClick]);

	return (
		<Portal>
			<DivNative className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[3] flex justify-center items-center">
				<DivNativeRef
					className="w-[30rem] h-[30rem] xl:w-[80rem] xl:h-[60rem] flex flex-col bg-[#ffffff] rounded-lg"
					ref={modelRef}
				>
					<DivNative className="w-full h-[6rem] bg-red-800"></DivNative>
					<DivNative className="flex-1 w-full h-full flex p-[1.4rem] bg-purple-200">
						<DivNative className="w-full xl:w-[40%] h-full flex flex-col gap-[1rem]">
							<ParagraphNative
								className="text-textGray text-[1.2rem] font-bold opacity-80"
								textContent="Input blocks"
							/>
							<DivNative className="flex flex-col  ">
								{buttons.map((btn) => (
									<ButtonNativeIcon
										key={btn.content + btn.type}
										className="w-[70%] flex items-center justify-start gap-[.8rem] text-[1.6rem]"
										onClick={() => addInputItem(btn.type)}
										textContent={btn.content}
										icon={btn.Icon}
									/>
								))}
							</DivNative>
						</DivNative>
						<DivNative className="hidden xl:flex w-[60%] h-full bg-green-300 "></DivNative>
					</DivNative>
				</DivNativeRef>
			</DivNative>
		</Portal>
	);
};

export default ModelInputType;
