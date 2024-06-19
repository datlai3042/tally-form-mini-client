"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import InputEmailAnswer from "./InputAnswer/_email/InputEmailAnswer";
import FormAnswerProvider, { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import ButtonSubmitForm from "./ButtonSubmitForm";
import InputTextAnswer from "./InputAnswer/_text/InputTextAnswer";
import HeaderFormAnswer from "./HeaderFormAnswer";
import { number } from "zod";
import Link from "next/link";
import ListErrorInput from "./ListErrorInput";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import SubmitSuccess from "./InputAnswer/submit/SubmitSuccess";
import InputOptionAnswer from "./InputAnswer/_option/InputOptionAnswer";
import InputOptionMultipleAnswer from "./InputAnswer/_options/InputOptionMultipleAnswer";

type TProps = {
	formCore: FormCore.Form;
};

const generateInputAnswer = (Inputs: InputCore.InputForm[], formCore: FormCore.Form): React.ReactNode[] => {
	return Inputs.map((ip) => {
		switch (ip.type) {
			case "EMAIL":
				return <InputEmailAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
			case "TEXT":
				return <InputTextAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

			case "OPTION":
				return <InputOptionAnswer inputItem={ip} formCore={formCore} key={ip._id} />;

			case "OPTION_MULTIPLE":
				return <InputOptionMultipleAnswer inputItem={ip} formCore={formCore} key={ip._id} />;
		}
	});
};

const RenderInputAnswers = (props: TProps) => {
	const { formCore } = props;
	const [page, setPage] = useState<number>(1);

	const {
		formAnswer: { inputFormErrors, openModelError, submitState },
	} = useContext(FormAnswerContext);
	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const count = useRef(1);

	console.log("");
	console.log({ message: "Quản lí và validate dữ liệu" });

	console.log({ "Số lần render": count.current });
	console.log({ "Trang hiện tại": page });
	if (submitState === "success")
		console.log("%cThông tin đã được gửi thành công, cảm ơn bạn nha", `color:${colorMain};font-size:16px;`);

	count.current += 1;

	const [client, setClient] = useState<boolean>(false);

	const numberInputAPage = 3;
	const allInputAnswer = useMemo(() => generateInputAnswer(formCore.form_inputs, formCore), [formCore]);
	const totalPage = Math.ceil(allInputAnswer.length / numberInputAPage);

	const generateInputWithPage = { start: numberInputAPage * (page - 1), end: numberInputAPage * page };

	useEffect(() => {
		console.log({ formOriginal: formCore });

		setClient(true);
	}, []);

	return (
		<>
			{submitState !== "success" && (
				<>
					{page === 1 && <HeaderFormAnswer formCore={formCore} />}
					{!client && allInputAnswer}
					{client && allInputAnswer.slice(generateInputWithPage.start, generateInputWithPage.end)}
					<div className="flex  gap-[2rem] justify-end text-[1.3rem]">
						{page === totalPage && totalPage > 1 && (
							<button
								tabIndex={0}
								className="pb-[.1rem] border-b-[.3rem] border-red-900"
								onClick={() => setPage((prev) => (prev -= 1))}
							>
								Xem trang trước
							</button>
						)}
						{page > 1 && page !== totalPage && (
							<button
								tabIndex={0}
								className="pb-[.1rem] border-b-[.3rem] border-red-900"
								onClick={() => setPage((prev) => (prev -= 1))}
							>
								Xem trang trước
							</button>
						)}

						<p>
							Số trang:{page} / {totalPage}
						</p>
						{page < totalPage && page !== 1 && (
							<button
								tabIndex={0}
								className="pb-[.1rem] border-b-[.3rem] border-red-900"
								onClick={() => setPage((prev) => (prev += 1))}
							>
								Xem trang tiếp theo
							</button>
						)}

						{page === 1 && totalPage > 1 && (
							<button
								tabIndex={0}
								className="pb-[.1rem] border-b-[.3rem] border-red-900"
								onClick={() => setPage((prev) => (prev += 1))}
							>
								Xem trang tiếp theo
							</button>
						)}
					</div>

					{inputFormErrors.length > 0 && openModelError && (
						<ListErrorInput
							formCore={formCore}
							setPage={setPage}
							inputFormErrors={inputFormErrors}
							numberInputAPage={numberInputAPage}
						/>
					)}

					<ButtonSubmitForm formCore={formCore} />
				</>
			)}

			{submitState === "success" && (
				<div className="mt-[2rem]">
					<SubmitSuccess color={colorMain} />
				</div>
			)}
		</>
	);
};

export default RenderInputAnswers;
