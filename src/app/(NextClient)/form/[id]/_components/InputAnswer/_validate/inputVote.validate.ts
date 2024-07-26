export const regexPhoneVietNam = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;

import {
	INVAILD_ERROR,
	MAX_LENGTH_ERROR,
	MIN_LENGTH_ERROR,
	REQUIRE_ERROR,
	regexEmail,
} from "@/app/_constant/input.constant";
import { InputCore } from "@/type";

export const superVoteValidate = ({
	inputValue,
	inputSetting,
}: {
	inputValue: string;
	inputSetting: InputCore.InputVote.InputSettingVote;
}) => {
	let _next = true;
	let message = "";

	let type: InputCore.Commom.ErrorText | null = null;

	const { require } = inputSetting;

	if (!require && !inputValue) return { _next: true, message: "Đây là trường không bắt buộc", type: null };

	if (require && +inputValue === 0) {
		_next = false;
		message = REQUIRE_ERROR;
		type = "REQUIRE";
		return { _next, message, type };
	}

	return { _next, message, type };
};
