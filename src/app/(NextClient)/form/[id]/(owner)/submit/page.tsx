"use client";
import { RootState } from "@/app/_lib/redux/store";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import * as XLSX from "xlsx";

import "moment/locale/vi"; // without this line it didn't work
import { FormCore } from "@/type";
import AnswerDetailModel from "../summary/_components/AnswerDetailModel";
import { checkValueHref, stringToSlug } from "@/app/_lib/utils";
moment.locale("vi");

const SubmitFormPage = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
	const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);

	const dataExcel = useRef<{ [key: string]: string }[]>([]);

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
				let dataXlsx = {};
				rp.answers.map((ans) => {
					dataXlsx = { ...dataXlsx, [ans.title]: ans.value };
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

				dataExcel.current = dataExcel.current.concat(dataXlsx);
			});

			setDataForm(filterForm);
		}
	}, [getFormAnswer.isSuccess, getFormAnswer.data]);

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	const handleDownloadExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(dataExcel.current);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		const namefile = stringToSlug(formCore.form_title.form_title_value);
		XLSX.writeFile(workbook, `${namefile}.xlsx`);
	};

	return (
		<>
			{getFormAnswer.data?.metadata.formAnswer && (
				<div className=" flex flex-col gap-[2rem] ">
					<button
						onClick={handleDownloadExcel}
						style={{ backgroundColor: color }}
						className="w-[16rem] h-[4rem] ml-auto flex items-center justify-center text-[#ffffff] rounded-lg "
					>
						Download File Excel
					</button>
					<div
						style={{ "--scorll-form-answer-detail": color } as React.CSSProperties}
						className="scroll-form-answer-detail h-[40rem] overflow-y-scroll overflow-x-scroll "
					>
						<table
							className="w-max min-h-full h-max border-collapse border-[.2rem] "
							style={{ borderColor: color }}
						>
							<thead>
								<tr>
									<th
										className="w-[25rem] p-[1.6rem] font-extrabold text-left border-[.2rem] "
										style={{ borderColor: color }}
									>
										Thời gian
									</th>
									{Object.keys(dataForm).map((fans, i) => {
										return (
											<th
												key={i}
												className="w-[25rem]  p-[1.6rem] font-extrabold text-left border-[.2rem] "
												style={{ borderColor: color }}
											>
												{dataForm[fans][0].title}
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody>
								{getFormAnswer.data?.metadata.formAnswer.reports.map((rp, i) => (
									<tr key={rp._id + i} className="hover:cursor-pointer">
										<th
											onClick={() => {
												setFormAnswerDetail(rp);
												setOpenDetailAnswer(true);
											}}
											key={rp._id + i}
											className="w-[25rem] p-[1.4rem] text-left max-w-[25rem] break-words border-[.2rem]  opacity-70 "
											style={{ borderColor: color }}
										>
											{moment(new Date(rp.createdAt)).format("hh:mm Do MMMM YYYY")}
										</th>
										{rp.answers.map((ans, i) => {
											return checkValueHref(ans.value) ? (
												<th
													onClick={() => {
														setFormAnswerDetail(rp);
														setOpenDetailAnswer(true);
													}}
													key={ans._id + i}
													className="w-[25rem] p-[1.4rem] text-left max-w-[25rem] break-words border-[.2rem]  opacity-70 "
													style={{ borderColor: color }}
												>
													<a
														href={ans.value}
														target="_blank"
														onClick={(e) => e.stopPropagation()}
													>
														{ans.value}
													</a>
												</th>
											) : (
												<th
													onClick={() => {
														setFormAnswerDetail(rp);
														setOpenDetailAnswer(true);
													}}
													key={ans._id + i}
													className="w-[25rem] p-[1.4rem] text-left max-w-[25rem] break-words border-[.2rem]  opacity-70 "
													style={{ borderColor: color }}
												>
													<span>{ans.value}</span>
												</th>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{getFormAnswer.data?.metadata.formAnswer && openDetailAnswer && formAnswerDetail && (
						<AnswerDetailModel setOpenModel={setOpenDetailAnswer} formAnswer={formAnswerDetail} />
					)}
				</div>
			)}
		</>
	);
};

export default SubmitFormPage;
