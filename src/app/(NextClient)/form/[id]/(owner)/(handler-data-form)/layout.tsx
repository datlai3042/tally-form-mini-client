"use client";

import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { onCalculationData } from "@/app/_lib/redux/features/dataForm.slice";
import { addFormAnswer } from "@/app/_lib/redux/features/formAnswer.slice";
import { RootState } from "@/app/_lib/redux/store";
import FormAnswerService from "@/app/_services/formAnswer.service";
import { FormCore } from "@/type";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const HanderlDataFormLayout = ({ params, children }: { params: { id: string }; children: React.ReactNode }) => {
	const dispatch = useDispatch();

	const formAnswer = useSelector((state: RootState) => state.formAsnwer.formAnswerStore[params.id]);

	const dataExcel = useRef<{ [key: string]: string }[]>([]);

	const [ready, setReady] = useState<boolean>(false);

	const getFormAnswer = useQuery({
		queryKey: ["get-form-answer", params.id],
		queryFn: () => FormAnswerService.getFormAnswer(params.id),
		enabled: !formAnswer,
	});

	const filterDataRender = useCallback((reports: FormCore.FormAnswer.FormAnswerCore["reports"]) => {
		let filterFormShowChart: {
			[key: string]: {
				_id: string;
				title: string;
				value: string | string[];
				time: Date;
				form_answer_id: string;
			}[];
		} = {};

		let filterFormShowExcel: {
			[key: string]: {
				_id: string;
				title: string;
				value: string | string[];
				time: Date;
				form_answer_id: string;
			}[];
		} = {};
		reports.map((rp) => {
			let dataXlsx = {};
			rp.answers.map((ans) => {
				const convertArrayValueToString = typeof ans.value === "string" ? ans.value : ans.value.join(", ");
				dataXlsx = {
					...dataXlsx,
					"Thời gian gửi": moment(new Date(rp.createdAt)).format("hh:mm Do MMMM YYYY"),
					[ans.title]: convertArrayValueToString,
				};
				if (!filterFormShowChart[ans._id]) {
					filterFormShowChart[ans._id] = [];
					filterFormShowChart[ans._id].push({
						_id: ans._id,
						title: ans.title,
						value: convertArrayValueToString,
						time: rp.createdAt,
						form_answer_id: rp._id,
					});
				} else {
					filterFormShowChart[ans._id] = filterFormShowChart[ans._id].concat({
						_id: ans._id,
						title: ans.title,
						value: convertArrayValueToString,
						time: rp.createdAt,
						form_answer_id: rp._id,
					});
				}

				if (!filterFormShowExcel[ans._id + "_#_" + ans.type]) {
					filterFormShowExcel[ans._id + "_#_" + ans.type] = [];

					const answerItem = {
						_id: ans._id,
						title: ans.title,
						value: ans.value as string,
						time: rp.createdAt,
						form_answer_id: rp._id,
					};

					filterFormShowExcel[ans._id + "_#_" + ans.type].push(answerItem);
				} else {
					filterFormShowExcel[ans._id + "_#_" + ans.type] = filterFormShowExcel[
						ans._id + "_#_" + ans.type
					].concat({
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
		dispatch(
			onCalculationData({
				dataFormShowChart: filterFormShowChart,
				dataFormShowExcel: filterFormShowExcel,
				dataExcel: dataExcel.current,
				form_id: params.id,
			})
		);
		return true;
	}, []);

	useEffect(() => {
		if (!formAnswer && getFormAnswer.isSuccess && getFormAnswer.data.metadata.formAnswer) {
			const { formAnswer } = getFormAnswer.data.metadata;
			dispatch(addFormAnswer({ form_id: formAnswer.form_id, reports: formAnswer }));
			let filterForm: {
				[key: string]: {
					_id: string;
					title: string;
					value: string | string[];
					time: Date;
					form_answer_id: string;
				}[];
			} = {};
			const { reports } = getFormAnswer.data.metadata.formAnswer;
			const arrayReserver = [...reports];

			const OK = filterDataRender(arrayReserver.reverse());
			setReady(OK);
		}
	}, [getFormAnswer.isSuccess, getFormAnswer.data]);

	useEffect(() => {
		if (formAnswer) {
			const arrayReserver = [...formAnswer.formAnswer.reports];

			filterDataRender(arrayReserver.reverse());
		}
	}, [formAnswer]);

	useEffect(() => {
		if (!getFormAnswer.data?.metadata.formAnswer) {
			return setReady(true);
		}
	}, [formAnswer, getFormAnswer.data]);

	console.log("ready", ready);

	return <>{ready ? children : <LoadingSpinner color="#000" />}</>;
};

export default HanderlDataFormLayout;
