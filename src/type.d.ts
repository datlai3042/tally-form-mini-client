import { SetStateAction } from "react";
import { UserType } from "./app/_schema/user/user.type";

type InputType = "email" | "number" | "text" | "password" | "file" | "files";
type AuthType = {
	access_token: string;
	refresh_token: string;
	_id: string;
};

type HeaderToken = {
	"x-client-id": string;
	Authorization: string;
	refresh_token: string;
};

type JwtPayload = {
	_id: string;
	user_email: string;
	user_roles: string;
	iat: number;
	exp: number;
};

type TokenNextSync = {
	access_token: string;
	refresh_token: string;
	client_id: string;
	expireToken: string;
	code_verify_token: string;
};

type UserProp = {
	Children: React.ComponentType<{ user: UserType | null }>;
};

type Method = "GET" | "POST" | "PUT" | "DELETE";
type CustomRequest = Omit<RequestInit, "method"> & {
	baseUrl?: string;
	pathName?: string;
};

type MessageResponse = { message: string };

namespace InputCore {
	namespace Setting {
		export type InputSettingCommon = {
			require: boolean;
			input_error?: string;
			input_color: string;
			input_size: number;
			input_style: FormCore.FormTextStyle;
			_id: string;
		};

		type InputSettingTextCommon = {
			placeholder?: string;
			minLength: number;
			maxLength: number;
		} & InputCore.Setting.InputSettingCommon;

		type InputSettingOptionCommon = InputCore.Setting.InputSettingCommon;
		type InputSettingDate = InputCore.Setting.InputSettingCommon;
	}

	namespace Commom {
		type InputCommon = {
			input_title?: string;
			core: {
				setting:
					| InputCore.Setting.InputSettingTextCommon
					| InputCore.Setting.InputSettingOptionCommon
					| InputCore.Setting.InputSettingDate;
			};
		};

		type InputCommonText = { core: { setting: InputCore.Setting.InputSettingTextCommon }; _id?: string };
		type InputCommonOption = { core: { setting: InputCore.Setting.InputSettingOptionCommon }; _id?: string };
		type InputCommonDate = { core: { setting: InputCore.Setting.InputSettingDate }; _id?: string };

		type ErrorText = "REQUIRE" | "MIN" | "MAX" | "INVAILD";
	}

	namespace InputEmail {
		export type InputSettingEmail = InputCore.Setting.InputSettingTextCommon;
		export type InputTypeEmail = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonText & {
				type: "EMAIL";
				core: {
					setting: InputCore.Setting.InputSettingTextCommon;
				};
			};
	}

	namespace InputDate {
		export type InputSettingDate = InputCore.Setting.InputSettingDate;

		export type InputTypeDate = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonDate & {
				type: "DATE";
			};
	}

	namespace InputText {
		export type InputText = "TEXT";
		export type InputSettingText = InputCore.Setting.InputSettingTextCommon;

		export type InputTypeText = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonText & {
				type: InputText;
				core: {
					setting: InputCore.Setting.InputSettingTextCommon;
				};
			};
	}

	namespace InputOption {
		type InputSettingOption = InputCore.Setting.InputSettingOptionCommon;
		type Options = { option_id: string; option_value: string };
		type InputTypeOption = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonOption & {
				type: "OPTION";
				core: { options: Options[] };
			};
	}

	namespace InputOptionMultiple {
		type InputSettingOptionMultiple = InputCore.Setting.InputSettingOptionCommon;
		type Options = { option_id: string; option_value: string };

		type InputTypeOptionMultiple = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonOption & { type: "OPTION_MULTIPLE"; core: { options: Options[] } };
	}

	namespace InputImage {
		export type InputTypeImage = InputCore.Commom.InputCommon & {
			type: "IMAGE";
			_id?: string;
			caption: string;
			alt: string;
			url: string;
			secure_url: string;
			public_id: string;
			setting: { a: number };
		};
	}

	type InputForm =
		| InputEmail.InputTypeEmail
		| InputText.InputTypeText
		| InputOption.InputTypeOption
		| InputOptionMultiple.InputTypeOptionMultiple
		| InputDate.InputTypeDate;
	// | InputImage.InputTypeImage;
}

namespace FormCore {
	namespace Func {
		export type RemoveInputItemFirst = (cb: ReactCustom.Form) => void;
		export type RemoveInputItemWithIndex = (cb: ReactCustom.Form, index: number) => void;
	}

	namespace Title {
		type TitleSub = "Text" | "Image";

		type FormTitleSub = {
			type: TitleSub;
			value: string;
			write: boolean;
			_id: string;
		};

		type FormTitleImageMode = "Normal" | "Slider";
	}

	type FormAvatarPosition = "left" | "center" | "right";
	type FormAvatarMode = "circle" | "square";

	export interface uploadFile extends FormData {
		append(name: "file" | "form_id", value: string | Blob, fileName?: string): void;
	}

	export type InputType = "EMAIL" | "NUMBER" | "TEXT" | "DATE" | "UNTYPE";

	export type FormBackground = {
		form_background_iamge_url?: string;
		form_background_position?: { x?: number; y?: number };
	};

	export type FormSettingDefault = {
		input_color: string;
		input_size: number;
		input_style: FormTextStyle;
		form_background_default_url: string;
		form_avatar_default_url: string;
		form_avatar_default_postion: FormAvatarPosition;
		form_avatar_default_mode: FormAvatarMode;
		form_title_color_default: string;
		form_title_size_default: number;
		form_title_style_default: FormTextStyle;
		form_background_position_default: {
			x: number;
			y: number;
		};
	};

	export type FormState = "isDraff" | "isPrivate" | "isPublic";

	export type FormAvatarMode = "DEFAULT" | "CUSTOM";
	export type FormAvatar = {
		form_avatar_url: string;
		mode: FormAvatarMode;
		position: FormAvatarPosition;
	};

	export type FormTitle = {
		form_title_style?: FormTextStyle;
		form_title_value: string;
		form_title_color?: string;
		form_title_size?: number;
		form_title_sub: FormCore.Title.FormTitleSub[];
		form_title_mode_image: FormCore.Title.FormTitleImageMode;
	};
	export type FormLabel = string;
	type FormTextStyle = "normal" | "italic";

	export type Form = {
		_id: string;
		form_owner: string;
		form_title: FormCore.FormTitle;
		form_background_state: boolean;
		form_avatar_state: boolean;
		createdAt?: Date;
		updatedAt?: Date;
		form_background?: FormCore.FormBackground;
		form_setting_default: FormCore.FormSettingDefault;
		form_state: FormCore.FormState;
		form_button_label: FormCore.FormLabel;
		form_avatar?: FormCore.FormAvatar;
		form_inputs: InputCore.InputForm[];
	};

	namespace FormAnswer {
		type InputFormRequire = { _id?: string; title?: string; checkRequire: boolean };
		type InputFormData = {
			_id: string;
			title: string;
			mode: "Require" | "Optional";
			value: string | string[];
			type: InputCore.InputForm["type"];
			setting?: InputCore.InputForm["core"]["setting"];
		};

		type InputFormError = {
			_id: string;
			type: ErrorText;
			title: string;
			message: string;
		};

		type Answer = Omit<InputFormData, "setting">;

		type OneReport = {
			form_id: string;
			answers: Answer[];
			createdAt: Date;
			_id: string;
		};

		type FormAnswerCore = {
			form_id: string;
			owner_id: string;
			reports: OneReport[];
		};
	}
}

namespace User {
	export interface uploadFile extends FormData {
		append(name: "file", value: string | Blob, fileName?: string): void;
	}
}

namespace ReactCustom {
	export type SetStateBoolean = React.Dispatch<SetStateAction<boolean>>;
	export type Form = React.Dispatch<SetStateAction<FormCore.Form>>;
}
