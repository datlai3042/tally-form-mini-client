"use client";

import { RootState } from "@/app/_lib/redux/store";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/vi"; // without this line it didn't work

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnswerDetailModel from "./_components/AnswerDetailModel";

moment.locale("vi");

const SummaryFormPage = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
	const [formAnswerDetail, setFormAnswerDetail] = useState<string>("");

	const [dataForm, setDataForm] = useState<{
		[key: string]: { _id: string; title: string; value: string; time: Date; form_answer_id: string }[];
	}>({});

	const getFormAnswer = useQuery({
		queryKey: ["get-form-answer", formCore._id],
		queryFn: () => FormAnswerService.getFormAnswer(formCore._id),
		enabled: !!formCore._id,
	});

	useEffect(() => {
		if (getFormAnswer.isSuccess && getFormAnswer.data.metadata.formAnswer) {
			let filterForm: {
				[key: string]: { _id: string; title: string; value: string; time: Date; form_answer_id: string }[];
			} = {};
			const { reports } = getFormAnswer.data.metadata.formAnswer;
			reports.map((rp) => {
				console.log({ rp });
				rp.answers.map((ans) => {
					if (!filterForm[ans._id]) {
						filterForm[ans._id] = [];
						filterForm[ans._id].push({
							_id: ans._id,
							title: ans.title,
							value: ans.value,
							time: rp.createdAt,
							form_answer_id: rp._id,
						});
					} else {
						filterForm[ans._id] = filterForm[ans._id].concat({
							_id: ans._id,
							title: ans.title,
							value: ans.value,
							time: rp.createdAt,
							form_answer_id: rp._id,
						});
					}
				});
			});
			console.log({ filterForm });

			setDataForm(filterForm);
		}
	}, [getFormAnswer.isSuccess, getFormAnswer.data]);

	return (
		<div className="flex flex-col gap-[3rem]">
			{getFormAnswer.data?.metadata.formAnswer &&
				Object.keys(dataForm).map((dt, i) => {
					return (
						<div key={dt + i} className="flex flex-col gap-[1.4rem] ">
							<h3 className="text-[2.4rem] font-medium">{dataForm[dt][0]?.title}</h3>
							<div className="flex flex-col gap-[.8rem] ">
								{dataForm[dt].map((info, i) => (
									<div
										key={info._id + i}
										onClick={() => {
											setFormAnswerDetail(info.form_answer_id);
											setOpenDetailAnswer(true);
										}}
										className="pb-[.3rem] flex justify-between border-b-[.1rem] border-gray-200 hover:cursor-pointer"
									>
										<span className="max-w-[50%] break-words leading-10">{info.value}</span>
										<p className="flex gap-[2rem] opacity-60">
											<span>{moment(new Date(info.time)).format("h:mm")}</span>
											<span>{moment(new Date(info.time)).format(" Do MMMM YYYY")} </span>
										</p>
									</div>
								))}
							</div>
						</div>
					);
				})}
			{getFormAnswer.data?.metadata.formAnswer && openDetailAnswer && formAnswerDetail && (
				<AnswerDetailModel
					setOpenModel={setOpenDetailAnswer}
					formAnswer={
						getFormAnswer.data.metadata.formAnswer.reports.filter(
							(fans) => fans._id === formAnswerDetail
						)[0]
					}
				/>
			)}
		</div>
	);
};

export default SummaryFormPage;
