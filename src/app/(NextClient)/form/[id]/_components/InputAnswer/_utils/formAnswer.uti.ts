import { FormCore, InputCore } from "@/type";
import { SetStateAction } from "react";
import { superTextValidate } from "../_validate/inputText.validate";
import { superEmailValidate } from "../_validate/inputEmail.validate";

//thêm lỗi của input vào global

export const setErrorGlobal = (
	cb: React.Dispatch<SetStateAction<InputCore.Commom.CatchError[]>>,
	input_id: string,
	title: string,
	type: InputCore.Commom.ErrorText,
	message: string
) => {
	cb((prev) => {
		let newArray = [];
		if (prev.some((ip) => ip._id === input_id)) {
			newArray = prev.map((ipr) => {
				if (ipr._id === input_id) {
					ipr.title = title as string;
					ipr.type = type as InputCore.Commom.ErrorText;
					return ipr;
				}
				return ipr;
			});
			console.log({ newArray });

			return newArray;
		}
		newArray = [...prev];
		let inputErrorInfo: InputCore.Commom.CatchError = {
			_id: input_id,
			title: title as string,
			type: type as InputCore.Commom.ErrorText,
			message,
		};
		newArray.push(inputErrorInfo);
		return newArray;
	});
};

//xóa lỗi của input_id ra khỏi lỗi global
export const deleteErrorGlobal = (
	cb: React.Dispatch<SetStateAction<InputCore.Commom.CatchError[]>>,
	input_id: string
) => {
	cb((prev) => {
		let newArray = structuredClone(prev);
		newArray = newArray.filter((ip) => {
			if (ip._id !== input_id) return ip;
			return null;
		});
		return newArray;
	});
};

//đặt lại cờ require của input trong mảng global
export const setInputRequireGlobal = (
	cb: React.Dispatch<SetStateAction<FormCore.FormAnswer.InputFormRequire[]>>,
	input_id: string,
	newRuleRequire: boolean
) => {
	cb((prev) => {
		let newArray = [];
		newArray = prev.map((ip) => {
			if (ip._id === input_id) {
				ip.checkRequire = newRuleRequire;
				return ip;
			}
			return ip;
		});
		return newArray;
	});
};

//đặt data của input trong mảng global
export const setDataInputGlobal = (
	cb: React.Dispatch<SetStateAction<FormCore.FormAnswer.InputFormData[]>>,
	input_id: string,
	input_value: string
) => {
	cb((prev) => {
		let newArray = [];
		newArray = prev.map((ip) => {
			if (ip._id === input_id) {
				ip.value = input_value || "";
				return ip;
			}
			return ip;
		});

		return newArray;
	});
};

export const checkErrorFinal = (
	newArrayErrorGlobal: InputCore.Commom.CatchError[] = [],
	inputFormErrors: InputCore.Commom.CatchError[],
	inputFormData: FormCore.FormAnswer.InputFormData[]
) => {
	inputFormData.map((ip) => {
		const ipError = inputFormErrors.filter((ipr) => ipr._id === ip._id)[0];
		if (ipError) {
			newArrayErrorGlobal.push(ipError);
		}

		if (!ipError && ip.type === "TEXT") {
			const { _next, message, type } = superTextValidate(ip.value, ip.setting!);
			if (_next) return;
			const inputErrorInfo: InputCore.Commom.CatchError = {
				_id: ip._id,
				title: ip.title,
				type: type as InputCore.Commom.ErrorText,
				message,
			};

			newArrayErrorGlobal.push(inputErrorInfo);
		}
		if (!ipError && ip.type === "EMAIL") {
			const { _next, message, type } = superEmailValidate(ip.value, ip.setting!);
			if (_next) return;
			const inputErrorInfo: InputCore.Commom.CatchError = {
				_id: ip._id,
				title: ip.title,
				type: type as InputCore.Commom.ErrorText,
				message,
			};

			newArrayErrorGlobal.push(inputErrorInfo);
		}
	});

	return newArrayErrorGlobal;
};
