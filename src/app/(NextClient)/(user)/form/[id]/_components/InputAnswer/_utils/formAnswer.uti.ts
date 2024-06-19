import { FormCore, InputCore } from "@/type";
import { SetStateAction } from "react";
import { superTextValidate } from "../_validate/inputText.validate";
import { superEmailValidate } from "../_validate/inputEmail.validate";
import { FormAnswerControl } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import { InputError } from "../_email/InputEmailAnswer";
import { REQUIRE_ERROR } from "@/app/_constant/input.constant";

//thêm lỗi của input vào global

export const setErrorGlobal = (
	cb: React.Dispatch<SetStateAction<FormAnswerControl>>,
	input_id: string,
	title: string,
	type: InputCore.Commom.ErrorText,
	message: string
) => {
	cb((prev) => {
		let newArray = [];
		let newObj: FormAnswerControl = structuredClone(prev);
		if (prev.inputFormErrors.some((ip) => ip._id === input_id)) {
			newArray = prev.inputFormErrors.map((ipr) => {
				if (ipr._id === input_id) {
					ipr.title = title as string;
					ipr.type = type as InputCore.Commom.ErrorText;
					ipr.message = message;
					return ipr;
				}
				return ipr;
			});
			console.log({ newArray });

			return { ...newObj, inputFormErrors: newArray };
		}
		newArray = [...newObj.inputFormErrors];
		let inputErrorInfo: FormCore.FormAnswer.InputFormError = {
			_id: input_id,
			title: title as string,
			type: type as InputCore.Commom.ErrorText,
			message,
		};
		newArray.push(inputErrorInfo);
		newObj.inputFormErrors = newArray;

		return newObj;
	});
};

//xóa lỗi của input_id ra khỏi lỗi global
export const deleteErrorGlobal = (cb: React.Dispatch<SetStateAction<FormAnswerControl>>, input_id: string) => {
	cb((prev) => {
		let newArray = structuredClone(prev);
		newArray.inputFormErrors = newArray.inputFormErrors.filter((ip) => {
			if (ip._id !== input_id) return ip;
			return null;
		});
		return newArray;
	});
};

//đặt lại cờ require của input trong mảng global
export const setInputRequireGlobal = (
	cb: React.Dispatch<SetStateAction<FormAnswerControl>>,
	input_id: string,
	newRuleRequire: boolean
) => {
	cb((prev) => {
		let newArray = structuredClone(prev);
		newArray.inputFormRequire = prev.inputFormRequire.map((ip) => {
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
	cb: React.Dispatch<SetStateAction<FormAnswerControl>>,
	input_id: string,
	input_value: string | string[]
) => {
	cb((prev) => {
		let newArray = structuredClone(prev);
		newArray.inputFormData = prev.inputFormData.map((ip) => {
			if (ip._id === input_id && ip.type === "OPTION_MULTIPLE") {
				ip.value = input_value as string[];
				return ip;
			}
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
	newArrayErrorGlobal: FormCore.FormAnswer.InputFormError[] = [],
	inputFormErrors: FormCore.FormAnswer.InputFormError[],
	inputFormData: FormCore.FormAnswer.InputFormData[]
) => {
	inputFormData.map((ip) => {
		const ipError = inputFormErrors.filter((ipr) => ipr._id === ip._id && ip.setting?.require)[0];
		if (ipError) {
			newArrayErrorGlobal.push(ipError);
		}

		if (!ipError && ip.type === "TEXT") {
			const { _next, message, type } = superTextValidate(
				ip.value as string,
				ip.setting as InputCore.Setting.InputSettingTextCommon
			);
			if (_next) return;
			const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
				_id: ip._id,
				title: ip.title,
				type: type as InputCore.Commom.ErrorText,
				message,
			};

			newArrayErrorGlobal.push(inputErrorInfo);
		}
		if (!ipError && ip.type === "EMAIL") {
			const { _next, message, type } = superEmailValidate(
				ip.value as string,
				ip.setting as InputCore.Setting.InputSettingTextCommon
			);
			if (_next) return;
			const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
				_id: ip._id,
				title: ip.title,
				type: type as InputCore.Commom.ErrorText,
				message,
			};

			newArrayErrorGlobal.push(inputErrorInfo);
		}

		if (!ipError && ip.type === "OPTION" && ip.value) {
			return;
		}

		if (!ipError && ip.type === "OPTION" && !ip.value && ip.setting?.require) {
			const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
				_id: ip._id,
				title: ip.title,
				type: "REQUIRE",
				message: REQUIRE_ERROR,
			};
			newArrayErrorGlobal.push(inputErrorInfo);
		}

		if (!ipError && ip.type === "OPTION_MULTIPLE" && ip.value.length > 0) {
			return;
		}

		if (!ipError && ip.type === "OPTION_MULTIPLE" && ip.value.length === 0 && ip.setting?.require) {
			const inputErrorInfo: FormCore.FormAnswer.InputFormError = {
				_id: ip._id,
				title: ip.title,
				type: "REQUIRE",
				message: REQUIRE_ERROR,
			};
			newArrayErrorGlobal.push(inputErrorInfo);
		}
	});

	return newArrayErrorGlobal;
};

export const setErrorInputFromGlobal = (input_id: string, inputFormErrors: FormCore.FormAnswer.InputFormError[]) => {
	let instanceError: InputError = {} as InputError;
	const temp = inputFormErrors.filter((dataError) => {
		if (dataError._id === input_id) {
			return dataError;
		}
	})[0];

	instanceError = {
		error: !!temp,
		message: temp?.message,
		type: temp?.type,
	};
	return instanceError;
};
