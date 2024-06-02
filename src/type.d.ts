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
	export type InputCommon = {
		input_heading?: string;
		input_heading_type?: "LABEL" | "TITLE";
	};

	type InputSettingTextCommon = {
		minLength: number;
		maxLength: number;
	} & InputCore.InputSettingCommon;

	type InputCommonText = { setting: InputSettingTextCommon; _id?: string };

	namespace InputEmail {
		export type InputTypeEmail = InputCore.InputCommon &
			InputCore.InputCommonText & {
				type: "EMAIL";
				setting: InputCore.InputSettingTextCommon;
			};

		export type InputSettingEmail = InputCore.InputSettingTextCommon;
	}

	namespace InputDate {
		export type InputDateTimeAny = { type: "Date"; date_type: "Any"; date_time: number };
		export type InputDateTimeBefore = { type: "Date"; date_type: "Before"; date_time: number };
		export type InputDateTimeAfter = { type: "Date"; date_type: "After"; date_time: number };
		export type InputDateTimeBetween = {
			type: "Date";
			date_type: "Between";
			date_time_1: number;
			date_time_2: number;
		};

		export type InputDateTime = InputDateTimeAny | InputDateTimeBefore | InputDateTimeAfter | InputDateTimeBetween;
		export type InputTypeDate = InputDateTime;
	}

	namespace InputText {
		export type InputSettingText = InputCore.InputSettingTextCommon;

		export const inputSettingText: InputCore.InputText.InputSettingText = {};
		export type InputText = "TEXT";
		export type InputTypeText = InputCore.InputCommon &
			InputCore.InputCommonText & {
				type: InputText;
				setting: InputCore.InputSettingCommon;
			};
	}

	namespace InputOption {
		export type InputTypeOption = InputCore.InputCommon & { type: "Option"; option: string[] };
	}

	namespace InputImage {
		export type InputTypeImage = InputCore.InputCommon & {
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
	export type InputSettingCommon = {
		require: boolean;
		placeholder?: string;
		input_error?: string;
		input_color: string;
		input_size: number;
		input_style: FormCore.FormTextStyle;
	};
	export type InputForm = InputEmail.InputTypeEmail | InputText.InputTypeText;
	// | InputOption.InputTypeOption
	// | InputDate.InputTypeDate
	// | InputImage.InputTypeImage;
}

namespace FormCore {
	namespace Func {
		export type RemoveInputItemFirst = (cb: ReactCustom.Form) => void;
		export type RemoveInputItemWithIndex = (cb: ReactCustom.Form, index: number) => void;
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
		form_title_color_default?: string;
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

	export type FormTitle = string;
	export type FormLabel = string;
	type FormTextStyle = "normal" | "italic";

	export type Form = {
		_id: string;
		form_title: FormCore.FormTitle;
		form_title_color?: string;
		form_title_size?: number;
		form_title_style?: FormCore.FormTextStyle;
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
			value: string;
		};
	}
}

namespace ReactCustom {
	export type SetStateBoolean = React.Dispatch<SetStateAction<boolean>>;
	export type Form = React.Dispatch<SetStateAction<FormCore.Form>>;
}
