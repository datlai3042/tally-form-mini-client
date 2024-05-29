import { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { inputSettingText } from "@/app/_constant/input.constant";
import FormService from "@/app/_services/form.service";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { ArrowBigRight, AtSign } from "lucide-react";

import React, { useContext } from "react";

type TProps = {
	inputItem: InputCore.InputForm;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputTextIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const { formInitial, setFormInitial } = useContext(FormEditContext);

	const updateTypeInputMutation = useMutation({
		mutationKey: ["choose type input"],
		mutationFn: (form: FormCore.Form) => FormService.updateForm(form),
		onSuccess: (res) => {
			const { form } = res.metadata;
			setFormInitial(form);
			setOpenModel(false);
		},
	});

	const handleChooseInputType = () => {
		const newForm = { ...formInitial };

		newForm.form_inputs = formInitial.form_inputs.filter((ip) => {
			if (ip._id !== inputItem._id) return ip;
			ip.type = "TEXT";
			ip.setting = inputSettingText;
			return ip;
		});

		updateTypeInputMutation.mutate(newForm);
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<DivNative className="w-full h-[50%] flex flex-col gap-[3rem] border-b-[.2rem] border-gray-100  ">
				<DivNative className="min-h-[2rem] flex items-center justify-between  px-[2rem]">
					<DivNative className="text-[2.2rem] font-semibold ">Email</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[30%] xl:h-[50%] flex items-center p-[.8rem] xl:p-[2rem] bg-blue-600 rounded-lg text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					Input type Text được dùng để thu thập dạng chữ, với những dữ liệu nào cần nhiều dòng thông tin thì
					Input Text là phù hợp nhất
				</DivNative>
			</DivNative>
			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className={`min-h-[5rem] h-max flex flex-col  gap-[1rem] `}>
					<SpanNative textContent="Nhập tiêu đề cho đoạn Text" className="text-[1.6rem] font-bold" />
					<DivNative
						className="group w-full min-h-[8rem] p-[1.6rem] text-[1.6rem] break-words whitespace-pre-wrap h-max border-[.1rem] border-gray-300 rounded-lg outline-none resize-none "
						spellCheck={false}
						contentEditable={true}
						data-text={`${"Nhập thông tin của bạn"}`}
						suppressContentEditableWarning={true}
						tabIndex={0}
					></DivNative>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputTextIntroduce;
