"use client";
import { FormCore, InputCore } from "@/type";
import React, { useContext, useEffect, useMemo, useState } from "react";
import InputEmailAnswer from "./InputAnswer/_email/InputEmailAnswer";
import FormAnswerProvider, { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import ButtonSubmitForm from "./ButtonSubmitForm";
import InputTextAnswer from "./InputAnswer/_text/InputTextAnswer";
import HeaderFormAnswer from "./HeaderFormAnswer";
import { number } from "zod";
import Link from "next/link";
import ListErrorInput from "./ListErrorInput";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";

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
		}
	});
};

const RenderInputAnswers = (props: TProps) => {
	const { formCore } = props;
	const [page, setPage] = useState<number>(1);

	const [client, setClient] = useState<boolean>(false);

	const { inputFormData, inputFormErrors, openModelError, setOpenModelError } = useContext(FormAnswerContext);

	const numberInputAPage = 3;
	const allInputAnswer = useMemo(() => generateInputAnswer(formCore.form_inputs, formCore), [formCore]);
	const totalPage = Math.ceil(allInputAnswer.length / numberInputAPage);

	const generateInputWithPage = { start: numberInputAPage * (page - 1), end: numberInputAPage * page };
	console.log({ length: allInputAnswer.length });
	console.log({ input: allInputAnswer.slice(numberInputAPage * (page - 1), numberInputAPage * page) });

	useEffect(() => {
		setClient(true);
	}, []);

	useEffect(() => {
		console.log({ inputFormErrors });
	}, [inputFormErrors]);

	return (
		<>
			{page === 1 && <HeaderFormAnswer formCore={formCore} />}
			{!client && allInputAnswer}
			{client && allInputAnswer.slice(generateInputWithPage.start, generateInputWithPage.end)}
			<div className="flex  gap-[2rem] justify-end text-[1.3rem]">
				{page === totalPage && totalPage > 1 && (
					<button
						className="pb-[.1rem] border-b-[.3rem] border-red-900"
						onClick={() => setPage((prev) => (prev -= 1))}
					>
						Xem trang trước
					</button>
				)}
				{page > 1 && page !== totalPage && (
					<button
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
						className="pb-[.1rem] border-b-[.3rem] border-red-900"
						onClick={() => setPage((prev) => (prev += 1))}
					>
						Xem trang tiếp theo
					</button>
				)}

				{page === 1 && totalPage > 1 && (
					<button
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
	);
};

export default RenderInputAnswers;
