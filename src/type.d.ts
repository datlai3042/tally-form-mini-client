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
		type InputSettingVoteCommon = InputCore.Setting.InputSettingCommon;
		type InputSettingPhoneCommon = InputCore.Setting.InputSettingCommon;
		type InputSettingDate = InputCore.Setting.InputSettingCommon;
		type SettingAll = InputSettingTextCommon & InputSettingOptionCommon & InputSettingDate;
	}

	namespace Commom {
		type InputCommon = {
			input_title?: string;
			core: {
				setting:
					| InputCore.Setting.InputSettingTextCommon
					| InputCore.Setting.InputSettingOptionCommon
					| InputCore.Setting.InputSettingDate
					| InputCore.Setting.InputSettingVoteCommon
					| InputCore.Setting.InputSettingPhoneCommon;
			};
		};

		type InputCommonText = { core: { setting: InputCore.Setting.InputSettingTextCommon }; _id?: string };
		type InputCommonVote = { core: { setting: InputCore.Setting.InputSettingVoteCommon }; _id?: string };
		type InputCommonPhone = { core: { setting: InputCore.Setting.InputSettingPhoneCommon }; _id?: string };

		type InputCommonOption = { core: { setting: InputCore.Setting.InputSettingOptionCommon }; _id?: string };
		type InputCommonDate = { core: { setting: InputCore.Setting.InputSettingDate }; _id?: string };

		type ErrorText = "REQUIRE" | "MIN" | "MAX" | "INVAILD";
	}

	namespace InputEmail {
		export type InputSettingEmail = InputCore.Setting.InputSettingTextCommon;
		export type InputTypeEmail = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonText & {
				type: "EMAIL";
				// core: {
				// 	setting: InputCore.Setting.InputSettingTextCommon;
				// };
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
				// core: {
				// 	setting: InputCore.Setting.InputSettingTextCommon;
				// };
			};
	}

	namespace InputPhone {
		export type InputSettingPhone = InputCore.Setting.InputSettingPhoneCommon;
		export type InputTypePhone = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonPhone & {
				type: "PHONE";
				// core: {
				// 	setting: InputCore.Setting.InputSettingPhoneCommon;
				// };
			};
	}

	namespace InputVote {
		export type InputSettingVote = InputCore.Setting.InputSettingVoteCommon;
		export type InputTypeVote = InputCore.Commom.InputCommon &
			InputCore.Commom.InputCommonVote & {
				type: "VOTE";
				core: {
					setting: InputCore.Setting.InputSettingVoteCommon;
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
		| InputVote.InputTypeVote
		| InputPhone.InputTypePhone
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

	namespace FormTitleSub {
		namespace Common {
			type Type = "Text" | "Image" | "FullDescription";
			type FormTilteCommon = {
				_id: string;
				type: Type;
				form_id: string;
			};
		}

		namespace Text {
			type Core = Common.FormTilteCommon & {
				type: "Text";
				core: {
					value: string;
				};
			};
		}

		namespace Image {
			type Core = Common.FormTilteCommon & {
				type: "Image";
				core: {
					url: string;
				};
			};
		}

		namespace FullDescription {
			type Core = Common.FormTilteCommon & {
				type: "FullDescription";
				core: {
					header_value: string;
					value: string;
				};
			};
		}

		type FormTitleBase = Text.Core | Image.Core | FullDescription.Core;
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
		backgroundColor?: string;
		mode_show: "cover" | "contain";
		padding: {
			x: number;
			y: number;
		};
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

	export type FormState = "isPrivate" | "isPublic" | "isDelete";
	type FormModeDisplay = "basic" | "custom";

	type FormAvatarMode = "DEFAULT" | "CUSTOM";
	type FormAvatar = {
		form_avatar_url: string;
		mode_shape: FormAvatarMode;
		position: FormAvatarPosition;
	};

	type FormTitle = {
		form_title_style?: FormTextStyle;
		form_title_value: string;
		form_title_color?: string;
		form_title_size?: number;
		form_title_sub: FormCore.FormTitleSub.FormTitleBase[];
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
		form_mode_display: FormCore.FormModeDisplay;
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

namespace Notification {
	namespace Type {
		type System = "System";
		type FormAnswers = "Form_Answers";
		type Account = "Account";

		type Common = System | FormAnswers | Account;
	}

	namespace Core {
		type System = {
			message: string;
		};

		type FormAnswers = {
			message: string;
			form_id: string;
			form_answer_id: string;
			create_time: string;
		};

		type Account = {
			message: string;
		};

		type Common = System | FormAnswers | Account;
	}

	namespace System {
		type NotificationSystem = Notification.Commom.TCommon & {
			type: Type.System;
			core: Core.System;
		};
	}

	namespace Account {
		type NotificationAccount = Notification.Commom.TCommon & {
			type: Type.Account;
			core: Core.Account;
		};
	}

	namespace FormAnswers {
		type NotificationFormAnswers = Notification.Commom.TCommon & {
			type: Type.FormAnswers;
			core: Core.FormAnswers;
		};
	}

	namespace Commom {
		type TCommon = {
			create_time: Date;
			_id: string;
		};
	}

	type NotifcationCore =
		| System.NotificationSystem
		| Account.NotificationAccount
		| FormAnswers.NotificationFormAnswers;

	type NotificationUser = {
		notification_user_id: string;
		notifications: NotifcationCore[];
	};
}

namespace Toast {
	namespace ToastCommon {
		type Common = {
			_id: string;
			toast_title: string;
		};
	}

	namespace ToastSuccess {
		type ToastSuccessCore = Toast.ToastCommon.Common & {
			type: "SUCCESS";
			core: {
				message: string;
			};
		};
	}

	namespace ToastFormAnswer {
		type ToastFormAnswerCore = Toast.ToastCommon.Common & {
			type: "FormAnswer";
			core: {
				message: string;
				url: string;
			};
		};
	}

	namespace ToastWarning {
		type ToastWarningCore = Toast.ToastCommon.Common & {
			type: "WARNING";
			core: {
				message: string;
			};
		};
	}

	namespace ToastError {
		type ToastErrorCore = Toast.ToastCommon.Common & {
			type: "ERROR";
			core: {
				message: string;
			};
		};
	}

	type ToastCore =
		| ToastSuccess.ToastSuccessCore
		| ToastWarning.ToastWarningCore
		| ToastError.ToastErrorCore
		| ToastFormAnswer.ToastFormAnswerCore;
}
