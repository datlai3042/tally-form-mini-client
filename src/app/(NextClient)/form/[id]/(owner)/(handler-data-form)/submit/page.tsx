"use client";
import { RootState } from "@/app/_lib/redux/store";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as XLSX from "xlsx";

import "moment/locale/vi"; // without this line it didn't work
import { FormCore } from "@/type";
import { checkValueHref, stringToSlug } from "@/app/_lib/utils";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";
import NotFoundPage from "@/app/(NextClient)/_components/_StatusCodeComponent/NotFoundPage";
import AnswerDetailModel from "../summary/_components/AnswerDetailModel";
moment.locale("vi");

const SubmitFormPage = () => {
	const { dataExcel, dataFormShowExcel, form_id } = useSelector((state: RootState) => state.dataFormHandler);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[form_id]);
	const dispatch = useDispatch();

	const [openDetailAnswer, setOpenDetailAnswer] = useState<boolean>(false);
	const [formAnswerDetail, setFormAnswerDetail] = useState<FormCore.FormAnswer.OneReport | null>(null);

	const color = formCore.form_title.form_title_color
		? formCore.form_title.form_title_color
		: formCore.form_setting_default.form_title_color_default;

	const handleDownloadExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(dataExcel);
		const workbook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		const namefile = stringToSlug(formCore.form_title.form_title_value);
		XLSX.writeFile(workbook, `${namefile}.xlsx`);
	};

	return (
		<>
			{formAnswer && (
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
						className="scroll-form-answer-detail mb-[8rem] min-h-[12rem] overflow-y-scroll overflow-x-scroll "
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
									{Object.keys(dataFormShowExcel).map((fans, i) => {
										return (
											<th
												key={i}
												className="w-[25rem]  p-[1.6rem] font-extrabold text-left border-[.2rem] "
												style={{ borderColor: color }}
											>
												{dataFormShowExcel[fans][0].title}
											</th>
										);
									})}
								</tr>
							</thead>
							<tbody>
								{formAnswer.formAnswer.reports.map((rp, i) => (
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
											const convertArrayValueToString =
												typeof ans.value === "string" ? ans.value : ans.value.join(", ");
											return checkValueHref(convertArrayValueToString) ? (
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
														href={convertArrayValueToString}
														target="_blank"
														onClick={(e) => e.stopPropagation()}
													>
														{convertArrayValueToString}
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
													<span>
														{convertArrayValueToString || "Người dùng không nhập dữ liệu"}
													</span>
												</th>
											);
										})}
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{openDetailAnswer && formAnswerDetail && (
						<AnswerDetailModel
							setOpenModel={setOpenDetailAnswer}
							formAnswer={formAnswerDetail}
							time={formAnswerDetail.createdAt}
						/>
					)}
				</div>
			)}

			{!formAnswer && (
				<div className="py-[3rem]">
					<NotFoundPage gap="2rem" />
				</div>
			)}
		</>
	);
};

export default SubmitFormPage;
