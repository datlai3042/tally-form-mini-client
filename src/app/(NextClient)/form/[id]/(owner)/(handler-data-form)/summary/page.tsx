"use client";

import { RootState } from "@/app/_lib/redux/store";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnswerDetailModel from "./_components/AnswerDetailModel";
import { FormCore, InputCore } from "@/type";
import AnalysisAnswer from "./_components/AnalysisAnswer";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { set } from "date-fns";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";
import NotFoundPage from "@/app/(NextClient)/_components/_StatusCodeComponent/NotFoundPage";

moment.locale("vi");

const SummaryFormPage = () => {
	const { form_id_current } = useSelector((state: RootState) => state.dataFormHandler);

	const formCache = useSelector((state: RootState) => state.dataFormHandler.form_cache[form_id_current]);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
	const formAnswerId = window.location.hash.slice(1);
	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id_current]);

	const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
	const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);

	const [newCount, setNewCount] = useState({
		old_count: formAnswer?.formAnswer.reports.length || 0,
		newCount: formAnswer?.formAnswer.reports.length || 0,
	});
	if (!formCache) return <NotFoundPage />;

	const { dataFormShowChart } = formCache;

	return (
		<div className="flex flex-col gap-[6rem] min-h-[30rem] pb-[8rem] text-text-theme">
			{formAnswer &&
				Object.keys(dataFormShowChart).map((dt, i) => {
					const type = dt.split("_#_")[1] as InputCore.InputForm["type"];
					return (
						<div key={dt + i} className="flex flex-col gap-[3rem]  ">
							<h3 className="text-[2.4rem] font-medium">{dataFormShowChart[dt][0]?.title}</h3>
							{type === "OPTION" && <AnalysisAnswer data={dataFormShowChart[dt]} />}
							{type === "OPTION_MULTIPLE" && <AnalysisAnswer data={dataFormShowChart[dt]} />}

							<div
								style={{ "--scorll-form-answer-detail": colorMain } as React.CSSProperties}
								className="scroll-form-answer-detail flex flex-col gap-[.8rem] max-h-[30rem] overflow-y-scroll  pb-[.8rem]"
							>
								{dataFormShowChart[dt].map((info, i) => {
									const checkNewReportRealTime = newCount.newCount - newCount.old_count - 1 === i;
									return (
										<div
											id={info.form_answer_id}
											key={info._id + i}
											onClick={() => {
												setFormAnswerDetail(() => {
													return formAnswer.formAnswer.reports.filter(
														(fans) => fans._id === info.form_answer_id
													)[0];
												});
												setOpenDetailAnswer(true);
											}}
											className={`${
												formAnswerId === info.form_answer_id ? "bg-color-main text-[#fff]" : ""
											} pb-[.3rem] px-[1rem] min-h-[4rem] flex items-center justify-between border-b-[.1rem] border-gray-200 hover:cursor-pointer`}
										>
											<span className="max-w-[50%] break-words leading-10">
												{(typeof info.value === "string"
													? info.value
													: info.value.join(", ")) || "Người dùng không nhập dữ liệu"}
											</span>
											<p className="flex items-center gap-[2rem] opacity-60">
												{checkNewReportRealTime && (
													<span className="inline-block  p-[.6rem_.4rem] text-[1.3rem] bg-gray-200 border-[.1rem] border-gray-300 rounded shadow-sm">
														Ngay bây giờ
													</span>
												)}
												<span>{moment(new Date(info.time)).format("h:mm")}</span>
												<span>{moment(new Date(info.time)).format(" Do MMMM YYYY")} </span>
											</p>
										</div>
									);
								})}
							</div>
						</div>
					);
				})}
			{formAnswer && openDetailAnswer && formAnswerDetail && (
				<AnswerDetailModel
					setOpenModel={setOpenDetailAnswer}
					formAnswer={formAnswerDetail}
					time={formAnswerDetail.createdAt}
				/>
			)}

			{!formAnswer && <NotFoundPage gap="2rem" />}
		</div>
	);
};

export default SummaryFormPage;
