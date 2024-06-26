import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type FormDataFilter = {
	[key: string]: { _id: string; title: string; value: string | string[]; time: Date; form_answer_id: string }[];
};

type InitialState = {
	form_cache: {
		[key: string]: {
			dataFormShowChart: FormDataFilter;

			dataFormShowExcel: FormDataFilter;
			form_answer_total: number;
			dataExcel: { [key: string]: string }[];

			form_id: string;
		};
	};
	form_id_current: string;
};

const initialState: InitialState = { form_id_current: "", form_cache: {} };

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
				form_answer_total: number;
			}>
		) => {
			const { dataExcel, dataFormShowChart, dataFormShowExcel, form_id, form_answer_total } = data.payload;
			console.log({ dispatch: data.type });
			const dataObject = { dataExcel, dataFormShowChart, dataFormShowExcel, form_id, form_answer_total };
			state.form_cache[form_id] = { ...dataObject };
			state.form_id_current = form_id;
		},

		onChangeFormId: (state, payload: PayloadAction<{ form_id_current: string }>) => {
			state.form_id_current = payload.payload.form_id_current;
		},
	},
});

export const { onCalculationData, onChangeFormId } = dataFormSlice.actions;
export default dataFormSlice.reducer;
