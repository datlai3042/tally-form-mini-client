import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import Portal from "@/app/(NextClient)/_components/Portal";
import { RootState } from "@/app/_lib/redux/store";
import { FormCore } from "@/type";
import { X } from "lucide-react";
import React, { SetStateAction } from "react";
import { useSelector } from "react-redux";

type TProps = {
	formAnswer: FormCore.FormAnswer.OneReport;
	setOpenModel: React.Dispatch<SetStateAction<boolean>>;
};

const AnswerDetailModel = (props: TProps) => {
	const { formAnswer, setOpenModel } = props;
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	return (
		<Portal>
			<div className="fixed z-[200] inset-0 max-w-full overflow-hidden  flex items-center justify-center bg-[rgba(0,0,0,.6)] hover:cursor-pointer">
				<ClickOutSide setOpenModel={setOpenModel}>
					<div className="relative w-[45rem] min-h-[40rem] h-max">
						<div
							style={{ "--scorll-form-answer-detail": color } as React.CSSProperties}
							className="scroll-form-answer-detail w-full max-h-[50rem] pb-[8rem]  overflow-y-scroll p-[3rem] flex flex-col gap-[5rem]  bg-[#ffffff] rounded-lg"
						>
							<h3 style={{ color }} className="text-center font-medium text-[2.4rem]">
								{formCore.form_title.form_title_value}
							</h3>
							{formAnswer.answers.map((fans) => (
								<div
									key={fans._id}
									className="flex flex-col gap-[1rem] pb-[1rem] border-b-[.1rem] border-gray-200"
								>
									<h4 className="text-[1.7rem] font-medium">{fans.title}</h4>
									<p className="max-w-[90%] break-words text-[1.4rem] opacity-75">
										{fans.value || "Trường này không có dữ liệu"}
									</p>
								</div>
							))}
						</div>
						<button
							style={{ backgroundColor: color }}
							onClick={() => setOpenModel(false)}
							className="absolute right-[-2rem] top-[-2rem] w-[4rem] h-[4rem]  flex items-center justify-center rounded-full  "
						>
							<X size={16} color="white" />
						</button>
					</div>
				</ClickOutSide>
			</div>
		</Portal>
	);
};

export default AnswerDetailModel;
