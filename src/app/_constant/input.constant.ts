import { InputCore, UI } from "@/type";

const inputSettingCommon = {
      require: false,
      input_error: "Nội dung không hợp lệ",
      input_error_state: false,
      input_color: "#000000",
      input_size: 16,
      input_style: "normal",
} as InputCore.Setting.InputSettingCommon;

export const inputSettingText: InputCore.InputText.InputSettingText = {
      maxLength: 100,
      placeholder: "Nhập nội dung của bạn",
      minLength: 8,
      ...inputSettingCommon,
};

export const inputSettingOption: InputCore.InputOption.InputSettingOption = {
      ...inputSettingCommon,
};

export const inputSettingOptionMultiple: InputCore.InputOptionMultiple.InputSettingOptionMultiple = {
      ...inputSettingCommon,
};
export const inputSettingDate: InputCore.InputDate.InputSettingDate = {
      ...inputSettingCommon,
};

export const inputSettingImage: InputCore.InputImage.InputSettingImage = {
      ...inputSettingCommon,
};

export const inititalValueInputAddress: UI.Address.AddressValidate = [
      { type: "province", code: "", name_with_type: "", path_with_type: "" },

      { type: "district", code: "", name_with_type: "", path_with_type: "" },

      { type: "ward", code: "", name_with_type: "", path_with_type: "" },
      { type: "street", code: "", name_with_type: "", path_with_type: "" },
];

export const regexEmail = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;

export const REQUIRE_ERROR = "Đây là một câu trả lời bắt buộc";
export const MIN_LENGTH_ERROR = (min: number) => `Độ dài tối thiếu: ${min}`;
export const MAX_LENGTH_ERROR = (min: number) => `Độ dài tối đa: ${min}`;
export const INVAILD_ERROR = (message: string) => message;
