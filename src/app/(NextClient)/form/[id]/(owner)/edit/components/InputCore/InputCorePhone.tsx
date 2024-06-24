import { FormCore, InputCore as TInputCore } from "@/type";
import React, { useMemo, useState } from "react";
import InputCore from "./InputCore";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import { regexPhoneVietNam } from "../../../../_components/InputAnswer/_validate/inputPhone.validate";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

type TProps = {
	inputItem: TInputCore.InputPhone.InputTypePhone;
};

const InputCorePhone = (props: TProps) => {
	const { inputItem } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
	const form_mode_display = formCore.form_mode_display === "custom";

	const [phone, setPhone] = useState<number>(0);

	const InputPhone = (
		<DivNative className="flex flex-col gap-[1rem] text-[#000] ">
			<SpanNative
				textContent="Số điện thoại"
				className={`${
					form_mode_display ? "group-hover:!text-[#ffffff]" : "text-[#000]"
				} text-[1.6rem] font-semibold`}
			/>
			<DivNative className={` relative min-h-[5rem] h-max flex items-center gap-[.5rem] `}>
				<input
					value={phone}
					type="number"
					className="w-full h-full text-[#000] p-[1rem] rounded-lg text-[1.6rem]   border-[.1rem] border-gray-400  outline-none focus:outline-blue-200 focus:border-transparent"
					placeholder="Nhập số điện thoại của bạn"
					onChange={(e) => setPhone(+e.target.value)}
				/>
			</DivNative>
			{phone != 0 && !phone.toString().match(regexPhoneVietNam) && (
				<>
					<span className="text-[1.4rem]">Số điện thoại bạn nhập không hợp lệ</span>

					<span>Input này chỉ chấp nhập giá trị là số</span>
				</>
			)}

			{phone != 0 && phone.toString().match(regexPhoneVietNam) && (
				<>
					<span className="text-[1.4rem]">Số điện thoại bạn nhập hợp lệ</span>
				</>
			)}
		</DivNative>
	);

	return (
		<InputCore
			InputComponent={InputPhone}
			inputItem={inputItem}
			inputTitle={inputItem.input_title || ""}
			dataTextTitle="Thêm tiêu đề cho số điện thoại"
		/>
	);
};

export default InputCorePhone;
