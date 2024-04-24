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
};

type UserProp = {
	Children: React.ComponentType<{ user: UserType | null }>;
};
