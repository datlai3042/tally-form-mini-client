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
		input_error?: string;
	};

	namespace InputEmail {
		export interface InputTypeEmail extends InputCore.InputCommon {
			type: "EMAIL";
			placeholder?: string;
			input_value?: string;
		}
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
		export type InputText = "TEXT";
		export type InputTypeText = InputCore.InputCommon & { type: InputText; placeholder?: string };
	}

	namespace InputOption {
		export type InputTypeOption = InputCore.InputCommon & { type: "Option"; option: string[] };
	}

	namespace InputImage {
		export type InputTypeImage = {
			type: "IMAGE";
			caption: string;
			alt: string;
			url: string;
			secure_url: string;
			public_id: string;
		};
	}

	export type InputForm =
		| InputEmail.InputTypeEmail
		| InputText.InputTypeText
		| InputOption.InputTypeOption
		| InputDate.InputTypeDate
		| InputImage.InputTypeImage;
}

namespace FormCore {
	namespace Func {
		export type RemoveInputItemFirst = (cb: ReactCustom.Form) => void;
		export type RemoveInputItemWithIndex = (cb: ReactCustom.Form, index: number) => void;
	}

	export type InputType = "EMAIL" | "NUMBER" | "TEXT" | "DATE" | "UNTYPE";

	export type FormBackground = { form_background_iamge_url: string };

	export type FormSettingDefault = {
		form_background_default_url: string;
		form_avatar_default_url: string;
	};

	export type FormState = "isDraff" | "isPrivate" | "isPublic";

	export type FormAvatarMode = "DEFAULT" | "CUSTOM";
	export type FormAvatar = {
		form_avatar_url: string;
	};

	export type FormTitle = string;
	export type FormLabel = string;

	export type Form = {
		_id: string;
		form_title: FormCore.FormTitle;

		form_background?: FormCore.FormBackground;
		form_setting_default: FormCore.FormSettingDefault;
		form_state: FormCore.FormState;
		form_button_label: FormCore.FormLabel;
		form_avatar?: FormCore.FormAvatar;
		form_inputs: InputCore.InputForm[];
	};
}

namespace ReactCustom {
	export type SetStateBoolean = React.Dispatch<SetStateAction<boolean>>;
	export type Form = React.Dispatch<SetStateAction<FormCore.Form>>;
}
