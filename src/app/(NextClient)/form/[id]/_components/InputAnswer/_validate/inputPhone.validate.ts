export const regexPhoneVietNam = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

import {
	INVAILD_ERROR,
	MAX_LENGTH_ERROR,
	MIN_LENGTH_ERROR,
	REQUIRE_ERROR,
	regexEmail,
} from "@/app/_constant/input.constant";
import { InputCore } from "@/type";

export const superPhoneValidate = (inputValue: string, inputPhoneSetting: InputCore.InputPhone.InputSettingPhone) => {
	let _next = true;
	let message = "";

	const regex = regexPhoneVietNam;
	const checkPhone = inputValue.match(regex);

	let type: InputCore.Commom.ErrorText | null = null;

	const { require } = inputPhoneSetting;

	if (!require && !inputValue) return { _next: true, message: "Đây là trường không bắt buộc", type: null };

	if (require && inputValue.length === 0) {
		_next = false;
		message = REQUIRE_ERROR;
		type = "REQUIRE";
		return { _next, message, type };
	}

	if (!checkPhone) {
		_next = false;
		message = INVAILD_ERROR("Số điện thoại không hợp lệ");
		type = "INVAILD";
		return { _next, message, type };
	}

	return { _next, message, type };
};
