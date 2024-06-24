import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FormDataFilter = {
	[key: string]: { _id: string; title: string; value: string | string[]; time: Date; form_answer_id: string }[];
};

type InitialState = {
	dataFormShowChart: FormDataFilter;

	dataFormShowExcel: FormDataFilter;

	dataExcel: { [key: string]: string }[];

	form_id: string;
};

const initialState: InitialState = {
	dataExcel: [],
	dataFormShowChart: {},
	dataFormShowExcel: {},
	form_id: "",
};

const dataFormSlice = createSlice({
	name: "data-form",
	initialState,
	reducers: {
		onCalculationData: (
			state,
			data: PayloadAction<{
				dataFormShowExcel: FormDataFilter;
				dataFormShowChart: FormDataFilter;
				dataExcel: { [key: string]: string }[];
				form_id: string;
			}>
		) => {
			const { dataExcel, dataFormShowChart, dataFormShowExcel, form_id } = data.payload;
			(state.dataExcel = dataExcel),
				(state.dataFormShowChart = dataFormShowChart),
				(state.dataFormShowExcel = dataFormShowExcel);
			state.form_id = form_id;
		},
	},
});

export const { onCalculationData } = dataFormSlice.actions;
export default dataFormSlice.reducer;
