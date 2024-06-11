import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { FormCore, InputCore } from "@/type";
import { X } from "lucide-react";
import Link from "next/link";
import React, { SetStateAction, useContext } from "react";

type TProps = {
	inputFormErrors: InputCore.Commom.CatchError[];
	formCore: FormCore.Form;
	setPage: React.Dispatch<SetStateAction<number>>;
	numberInputAPage: number;
};

const ListErrorInput = (props: TProps) => {
	const { inputFormErrors, formCore, numberInputAPage, setPage } = props;

	const { setOpenModelError } = useContext(FormAnswerContext);

	return (
		<div className="fixed z-[1000] top-[10rem] xl:top-[50%] xl:translate-y-[-50%] right-0 xl:right-[4rem] w-[30rem] h-[40rem] max-h-[40rem]  border-[.1rem] border-gray-200 text-[1.2rem]">
			<div className="scroll-error-input  w-full min-h-full max-h-full py-[3rem] flex flex-col gap-[2rem] bg-[#ffffff] overflow-y-scroll">
				<span className="text-[2rem] px-[3rem]">Danh sách lỗi</span>
				{inputFormErrors.map((ir) => {
					const indexError = formCore.form_inputs.findIndex((ip) => ip._id === ir._id);

					const pageError = Math.ceil((indexError + 1) / numberInputAPage);

					console.log({ pageError, indexError, numberInputAPage });

					const title = formCore.form_inputs[indexError].input_heading || "";

					return (
						<Link
							className="w-full p-[1rem_3rem] flex flex-col hover:bg-red-50 hover:text-red-600"
							href={`/form/${formCore._id}#${ir._id}`}
							key={ir._id}
							onClick={() => setPage(pageError)}
						>
							<p className="w-full flex justify-between">
								<span>Tiêu đề: {title}</span>
							</p>
							<p className="w-full flex flex-col justify-between">
								<span>Mã lỗi: {`[${ir.type}]`}</span>
								<span>Mô tả: {ir.message}</span>
							</p>
						</Link>
					);
				})}
			</div>
			<button
				onClick={() => setOpenModelError(false)}
				className="absolute right-[-2rem] top-[-2rem] w-[4rem] h-[4rem]  flex items-center justify-center rounded-full border-[.1rem] border-slate-300 bg-[#ffffff] "
			>
				<X size={16} />
			</button>
		</div>
	);
};

export default ListErrorInput;
