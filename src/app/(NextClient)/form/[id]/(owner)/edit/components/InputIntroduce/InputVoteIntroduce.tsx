import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputIntroduceVote } from "@/app/_constant/inputIntroduceUI.constant";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";
import { InputCore, ReactCustom } from "@/type";
import { Rate } from "antd";
import { ArrowBigRight, AtSign } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	inputItem: InputCore.InputVote.InputTypeVote;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputVoteIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const changeTypeInput = useChangeTypeInput();

	const [start, setStart] = useState<number>(2.5);

	const handleChooseInputType = () => {
		const newForm = structuredClone(formCore);
		newForm.form_inputs = newForm.form_inputs.map((ip) => {
			if (ip._id === inputItem._id) {
				const newIp = structuredClone(ip);
				newIp.type = "VOTE";
				if (newIp.type === "VOTE") {
					changeTypeInput.mutate({ form: formCore, inputItem, type: "VOTE" });
					return newIp;
				}
			}
			return ip;
		});
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<DivNative className="w-full h-[50%] flex flex-col gap-[3rem] border-b-[.2rem] border-gray-100  ">
				<DivNative className="min-h-[2rem] flex items-center justify-between  px-[2rem]">
					<DivNative className="text-[2.2rem] font-semibold ">{inputIntroduceVote.title}</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[50%] flex items-center p-[.8rem] xl:p-[1rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					{inputIntroduceVote.description}
				</DivNative>
			</DivNative>
			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className="flex flex-col gap-[1rem]">
					<SpanNative textContent="Đánh giá" className="text-[1.6rem] font-bold" />
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<Rate allowHalf value={start} onChange={(e) => setStart(e)} />
					</DivNative>
					<span className="text-[1.4rem]">Số đánh giá bạn chọn là: {start}</span>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputVoteIntroduce;
