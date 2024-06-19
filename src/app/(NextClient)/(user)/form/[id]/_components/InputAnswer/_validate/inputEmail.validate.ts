import {
	INVAILD_ERROR,
	MAX_LENGTH_ERROR,
	MIN_LENGTH_ERROR,
	REQUIRE_ERROR,
	regexEmail,
} from "@/app/_constant/input.constant";
import { InputCore } from "@/type";

export const superEmailValidate = (inputValue: string, inputTextSetting: InputCore.InputText.InputSettingText) => {
	let _next = true;
	let message = "";

	const regex = regexEmail;
	const checkEmail = inputValue.match(regex);

	let type: InputCore.Commom.ErrorText | null = null;

	const valueLength = inputValue.length;

	const { require, minLength, maxLength } = inputTextSetting;

	if (!require && !inputValue) return { _next: true, message: "Đây là trường không bắt buộc", type: null };

	if (require && (!inputValue || valueLength === 0)) {
		_next = false;
		message = REQUIRE_ERROR;
		type = "REQUIRE";
		return { _next, message, type };
	}

	if (!checkEmail) {
		_next = false;
		message = INVAILD_ERROR("Địa chỉ email không hợp lệ");
		type = "INVAILD";
		return { _next, message, type };
	}

	if (valueLength > maxLength) {
		_next = false;
		message = MAX_LENGTH_ERROR(maxLength);
		type = "MAX";
		return { _next, message, type };
	}

	if (valueLength < minLength) {
		_next = false;
		message = MIN_LENGTH_ERROR(minLength);
		type = "MIN";
	}

	return { _next, message, type };
};
