import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { FormCore, InputCore } from "@/type";
import { X } from "lucide-react";
import Link from "next/link";
import React, { SetStateAction, useContext } from "react";

type TProps = {
	inputFormErrors: FormCore.FormAnswer.InputFormError[];
	formCore: FormCore.Form;
	setPage: React.Dispatch<SetStateAction<number>>;
	numberInputAPage: number;
};

const ListErrorInput = (props: TProps) => {
	const { inputFormErrors, formCore, numberInputAPage, setPage } = props;

	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const { setFormAnswer } = useContext(FormAnswerContext);

	console.log({ inputFormErrors });

	return (
		<div className="fixed z-[1000] top-[10rem] xl:top-[50%] xl:translate-y-[-50%] right-[2rem] sm:right-0 xl:right-[4rem] w-[30rem] h-[24rem] max-h-[24rem] sm:h-[40rem] sm:max-h-[40rem]  border-[.1rem] border-gray-200 text-[1.2rem]">
			<div className="  w-full min-h-full max-h-full py-[3rem] flex flex-col gap-[2rem] bg-[#ffffff] shadow-lg">
				<span className="text-[1.6rem] px-[1rem] text-center uppercase">Một số dữ liệu không hợp lệ</span>

				<div className="scroll-error-input overflow-y-scroll flex flex-col gap-[2rem] bg-[#ffffff] ">
					{inputFormErrors.map((ir) => {
						const indexError = formCore.form_inputs.findIndex((ip) => ip._id === ir._id);
						const pageError = Math.ceil((indexError + 1) / numberInputAPage);

						const title = formCore.form_inputs[indexError].input_title || "";

						return (
							<Link
								className="group w-full p-[1rem_3rem] flex flex-col gap-[1rem] border-l-[.4rem] border-red-600 hover:bg-red-50 hover:text-red-600"
								href={`/form/${formCore._id}#_inputid_${ir._id}`}
								key={ir._id}
								onClick={() => setPage(pageError)}
							>
								<p className="w-max flex gap-[.6rem]">
									<span>Tiêu đề: </span>
									<span style={{ color: colorMain }} className="font-bold">
										{title}
									</span>
								</p>
								<div className="w-full flex flex-col justify-between">
									<p className="flex gap-[.4rem]">
										<span>Mã lỗi:</span>
										<span className="text-red-600 group-hover:text-red-700 font-semibold">{`[${ir.type}]`}</span>
									</p>

									<p className="flex gap-[.6rem]">
										<span>Mô tả:</span>
										<span className="underline underline-offset-4">{ir.message}</span>
									</p>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
			<button
				onClick={() => setFormAnswer((prev) => ({ ...prev, openModelError: false }))}
				className="absolute right-[-2rem] top-[-2rem] w-[4rem] h-[4rem]  flex items-center justify-center rounded-full  bg-red-600 "
			>
				<X size={14} color="white" />
			</button>
		</div>
	);
};

export default ListErrorInput;
