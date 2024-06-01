import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { onFetchForm } from "@/app/_lib/redux/features/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormService from "@/app/_services/form.service";
import { FormCore, InputCore, ReactCustom } from "@/type";
import { useMutation } from "@tanstack/react-query";
import { ArrowBigRight, AtSign } from "lucide-react";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

type TProps = {
	inputItem: InputCore.InputForm;
	setOpenModel: ReactCustom.SetStateBoolean;
};

const InputEmailIntroduce = (props: TProps) => {
	const { inputItem, setOpenModel } = props;

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const dispatch = useDispatch();

	const updateTypeInputMutation = useMutation({
		mutationKey: ["choose type input"],
		mutationFn: (form: FormCore.Form) => FormService.updateForm(form),
		onSuccess: (res) => {
			const { form } = res.metadata;
			dispatch(onFetchForm({ form }));
		},
	});

	const handleChooseInputType = () => {
		const newForm = structuredClone(formCore);

		newForm.form_inputs = newForm.form_inputs.filter((ip) => {
			if (ip._id !== inputItem._id) return ip;
			ip.type = "EMAIL";
			return ip;
		});

		updateTypeInputMutation.mutate(newForm);
	};

	return (
		<DivNative className="w-full h-full flex flex-col py-[1rem] ">
			<DivNative className="w-full h-[50%] flex flex-col gap-[3rem] border-b-[.2rem] border-gray-100  ">
				<DivNative className="min-h-[5rem] flex items-center justify-between  px-[2rem]">
					<DivNative className="text-[2.2rem] font-semibold ">Email</DivNative>
					<ButtonIcon
						textContent="Thêm input này"
						className="h-[50%] flex items-center p-[.8rem] xl:p-[2rem] bg-blue-600 rounded-lg text-[1.2rem] xl:text-[1.4rem] text-[#ffffff]"
						Icon={<ArrowBigRight />}
						onClick={handleChooseInputType}
					/>
				</DivNative>
				<DivNative className="flex-1 px-[2rem] text-[1.6rem] opacity-60">
					Input type Email được dùng để thu thập các dữ liệu liên quan để email, cũng như có thể validate xác
					thực giá trị nhập vào theo dạng email.
				</DivNative>
			</DivNative>
			<DivNative className="h-[50%] flex flex-col gap-[2.6rem] p-[3rem_2rem]">
				<DivNative className=" w-max p-[.2rem_1.6rem] flex items-center justify-center text-[1.2rem] bg-gray-200  text-gray-400">
					Ví dụ
				</DivNative>
				<DivNative className="flex flex-col gap-[1rem]">
					<SpanNative textContent="Email" className="text-[1.6rem] font-bold" />
					<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
						<input
							className="w-full h-full p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent"
							placeholder="Nhập email của bạn"
						/>
						<AtSign className="absolute z-[2] right-[1rem] text-textMain opacity-50" size={18} />
					</DivNative>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default InputEmailIntroduce;
