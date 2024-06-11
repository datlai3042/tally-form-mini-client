import { InputCore } from "@/type";

export const inputSettingText: InputCore.InputText.InputSettingText = {
	maxLength: 100,
	minLength: 8,
	require: false,
	input_error: "Nội dung không hợp lệ",
	placeholder: "Nhập nội dung của bạn",
	input_color: "#000000",
	input_size: 16,
	input_style: "normal",
};

export const regexEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;

export const REQUIRE_ERROR = "Đây là một câu trả lời bắt buộc";
export const MIN_LENGTH_ERROR = (min: number) => `Độ dài tối thiếu: ${min}`;
export const MAX_LENGTH_ERROR = (min: number) => `Độ dài tối đa: ${min}`;
export const INVAILD_ERROR = (message: string) => message;
