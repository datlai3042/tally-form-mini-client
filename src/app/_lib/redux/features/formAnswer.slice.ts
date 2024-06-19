import { FormCore } from "@/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
	formAnswerStore: {
		[key: string]: {
			type: "Answer";
			formAnswer: FormCore.FormAnswer.FormAnswerCore;
		};
	};
};

const initialState: InitialState = {
	formAnswerStore: {},
};

const formAnswerSlice = createSlice({
	name: "fornAnswer",
	initialState,
	reducers: {
		addFormAnswer: (
			state,
			data: PayloadAction<{ form_id: string; reports: FormCore.FormAnswer.FormAnswerCore }>
		) => {
			const { form_id, reports } = data.payload;
			state.formAnswerStore = { ...state.formAnswerStore };
			state.formAnswerStore[form_id] = { ...state.formAnswerStore[form_id], formAnswer: reports };
		},
	},
});

export const { addFormAnswer } = formAnswerSlice.actions;
export default formAnswerSlice.reducer;
