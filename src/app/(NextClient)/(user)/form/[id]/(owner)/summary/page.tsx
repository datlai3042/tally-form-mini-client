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

moment.locale("vi");

const SummaryFormPage = ({ params }: { params: { id: string } }) => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;

	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[params.id]);
	const dispatch = useDispatch();
	const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
	const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);
	console.log(!!formAnswer);
	const [newCount, setNewCount] = useState({
		old_count: formAnswer?.formAnswer.reports.length || 0,
		newCount: formAnswer?.formAnswer.reports.length || 0,
	});

	const [dataForm, setDataForm] = useState<{
		[key: string]: { _id: string; title: string; value: string | string[]; time: Date; form_answer_id: string }[];
	}>({});

	const getFormAnswer = useQuery({
		queryKey: ["get-form-answer", params.id],
		queryFn: () => FormAnswerService.getFormAnswer(params.id),
		enabled: !formAnswer,
	});

	const filterDataRender = (reports: FormCore.FormAnswer.FormAnswerCore["reports"]) => {
		let filterForm: {
			[key: string]: {
				_id: string;
				title: string;
				value: string | string[];
				time: Date;
				form_answer_id: string;
			}[];
		} = {};
		reports.map((rp) => {
			rp.answers.map((ans) => {
				if (!filterForm[ans._id + "_#_" + ans.type]) {
					filterForm[ans._id + "_#_" + ans.type] = [];

					const answerItem = {
						_id: ans._id,
						title: ans.title,
						value: ans.value as string,
						time: rp.createdAt,
						form_answer_id: rp._id,
					};

					filterForm[ans._id + "_#_" + ans.type].push(answerItem);
				} else {
					filterForm[ans._id + "_#_" + ans.type] = filterForm[ans._id + "_#_" + ans.type].concat({
						_id: ans._id,
						title: ans.title,
						value: ans.value,
						time: rp.createdAt,
						form_answer_id: rp._id,
					});
				}
			});
		});
		console.log({ "Lọc dữ liệu": filterForm });

		setDataForm(filterForm);
	};

	console.log({ newCount });

	useEffect(() => {
		if (!formAnswer && getFormAnswer.isSuccess && getFormAnswer.data.metadata.formAnswer) {
			const { formAnswer } = getFormAnswer.data.metadata;
			dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));
			setNewCount({ newCount: formAnswer.reports.length, old_count: formAnswer.reports.length });
			const arrayReserver = [...formAnswer.reports];
			filterDataRender(arrayReserver.reverse());
			console.log("OK");
		}
	}, [getFormAnswer.isSuccess, getFormAnswer.data]);

	useEffect(() => {
		if (formAnswer) {
			const arrayReserver = [...formAnswer.formAnswer.reports];

			filterDataRender(arrayReserver.reverse());
			setNewCount((prev) => {
				return {
					old_count: prev.old_count,
					newCount: formAnswer.formAnswer.reports.length,
				};
			});
		}
	}, [formAnswer]);

	return (
		<div className="flex flex-col gap-[6rem] min-h-[30rem] pb-[8rem]">
			{formAnswer &&
				Object.keys(dataForm).map((dt, i) => {
					const type = dt.split("_#_")[1] as InputCore.InputForm["type"];
					return (
						<div key={dt + i} className="flex flex-col gap-[3rem]  ">
							<h3 className="text-[2.4rem] font-medium">{dataForm[dt][0]?.title}</h3>
							{type === "OPTION" && <AnalysisAnswer data={dataForm[dt]} />}
							{type === "OPTION_MULTIPLE" && <AnalysisAnswer data={dataForm[dt]} />}

							<div
								style={{ "--scorll-form-answer-detail": colorMain } as React.CSSProperties}
								className="scroll-form-answer-detail flex flex-col gap-[.8rem] max-h-[30rem] overflow-y-scroll px-[2rem] pb-[.8rem]"
							>
								{dataForm[dt].map((info, i) => {
									const checkNewReportRealTime = newCount.newCount - newCount.old_count - 1 === i;
									return (
										<div
											key={info._id + i}
											onClick={() => {
												setFormAnswerDetail(() => {
													return formAnswer.formAnswer.reports.filter(
														(fans) => fans._id === info.form_answer_id
													)[0];
												});
												setOpenDetailAnswer(true);
											}}
											className="pb-[.3rem] flex items-center justify-between border-b-[.1rem] border-gray-200 hover:cursor-pointer"
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

			{!formAnswer && (
				<StatusCodeResponse
					statusCode={404}
					statusCodeText="Không tìm thấy câu trả lời"
					statusCodeReason="Hãy gửi Link chia sẽ để nhận thêm câu trả lời thêm "
				/>
			)}
		</div>
	);
};

export default SummaryFormPage;
