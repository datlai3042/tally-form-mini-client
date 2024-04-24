// "use client";
// import React from "react";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { UserType } from "@/app/_schema/user/user.type";
// import { RegisterType, registerSchema } from "@/app/_schema/auth/register.schema";
// import { LoginType } from "@/app/_schema/auth/login.schema";
// import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";

// import Http, { clientToken } from "@/app/_lib/http";
// import { useMutation } from "@tanstack/react-query";

// import { useDispatch } from "react-redux";
// import { PlaneTakeoff } from "lucide-react";
// import Image from "next/image";
// import WrapperAuthLayout from "../Layout/WrapperAuthLayout";
// import Button from "./button/Button";
// import IconClose from "./input/IconClose";
// import Input from "./input/Input";
// import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
// type TProps = {
// 	onClose?: (state: boolean) => void;
// };

// const RegisterDemo = (props: TProps) => {
// 	const { onClose } = props;
// 	const dispatch = useDispatch();

// 	const registerForm = useForm<RegisterType>({
// 		defaultValues: {
// 			email: "",
// 			password: "",
// 			confirm_password: "",
// 		},
// 		resolver: zodResolver(registerSchema),
// 	});

// 	const registerMutation = useMutation({
// 		mutationKey: ["register"],
// 		mutationFn: (formRegister: Omit<LoginType, "confirm_password">) =>
// 			Http.post<ResponseApi<{ user: UserType; token: { access_token: string; refresh_token: string } }>>(
// 				"/v1/api/auth/register",
// 				formRegister,
// 				{}
// 			),
// 		onSuccess: async (response) => {
// 			const {
// 				user,
// 				token: { access_token, refresh_token },
// 			} = response.metadata;
// 			dispatch(onFetchUser({ user }));
// 			const setTokenResponse = await Http.post<ResponseApi<ResponseAuth>>(
// 				"/v1/api/auth/set-token",
// 				{
// 					access_token,
// 					refresh_token,
// 					_id: user._id,
// 				},
// 				{ baseUrl: "" }
// 			);

// 			if (setTokenResponse) {
// 				const { access_token, refresh_token } = setTokenResponse.metadata.token;
// 				const { _id } = setTokenResponse.metadata.user;
// 				clientToken.accessToken = access_token;
// 				clientToken.refreshToken = refresh_token;
// 				clientToken.id = _id;
// 			}

// 			if (onClose) {
// 				onClose(true);
// 			}
// 		},
// 	});

// 	const onSubmit = (data: LoginType) => {
// 		registerMutation.mutate(data);
// 	};

// 	return (
// 		<WrapperAuthLayout zIndex={300}>
// 			<div className="relative group w-full h-[400px] sm:h-[600px] xl:w-[1200px] xl:h-[600px]  bg-[rgb(245_245_250)] flex items-center justify-center rounded-[6px] py-[28px] px-[8px] z-[5]">
// 				<div
// 					className="hidden sm:block animate-scaleIn relative  overflow-hidden  h-full w-[55%] m-[20px] bg-[#ffffff]"
// 					style={{
// 						backgroundImage: "url('/assets/images/backgroundForm/bg.jpg')",
// 						backgroundPosition: "top",
// 						backgroundSize: "cover",
// 						backgroundRepeat: "no-repeat",
// 						backgroundColor: "black",
// 					}}
// 				>
// 					<div className="animate-opacityUp w-full h-full  bg-[#000000]"></div>
// 					<div className="animate-shipRun absolute bottom-[155px] w-[80px] h-[50px]">
// 						<Image
// 							width={80}
// 							height={50}
// 							src="/assets/images/icon/ship.png"
// 							className="w-full h-full object-fill object-left-bottom"
// 							alt="air-plane"
// 						/>
// 					</div>
// 					<div className="animate-topUp   absolute top-[100px] left-[50%] w-max translate-x-[-50%] font-extrabold  text-[28px] [letter-spacing:8px] z-[3] ">
// 						<div className="relative left-0 w-full  bg-transparent min-h-ful  flex justify-center">
// 							<h3 className="animate-changeColor absolute w-max [text-shadow:4px_4px_2px_rgba(0,0,0,0.2)] text-[30px]">
// 								Tally Form
// 							</h3>
// 						</div>
// 					</div>
// 					<div className="animate-topDown z-[2] absolute top-[20px] right-[120px] h-[450px]">
// 						<div className=" relative min-h-full bg-red-800 flex justify-center">
// 							<div className=" absolute top-0 w-[1px] h-full bg-zinc-400 "></div>

// 							<div className="absolute bottom-0 w-[60px] h-[60px] flex justify-center z-[2] ">
// 								<div className="animate-sizeLigth rounded-full shadow-2xl shadow-yellow-400 z-[2]"></div>
// 							</div>
// 						</div>
// 					</div>
// 					<div className="animate-changeColorSea absolute bottom-0 w-full h-[174px] "></div>
// 				</div>

// 				<form
// 					className="relative w-full sm:w-[45%] h-[600px] p-[24px_20px] flex flex-col items-center justify-center gap-[16px] rounded-[12px]"
// 					onSubmit={registerForm.handleSubmit(onSubmit)}
// 				>
// 					<p className="text-center mr-[20px] text-slate-600 text-[24px] [letter-spacing:4px]">Đăng Kí</p>
// 					<Input<RegisterType>
// 						FieldKey="email"
// 						placeholder="email"
// 						type="email"
// 						register={registerForm.register}
// 						watch={registerForm.watch}
// 						error={registerForm.formState.errors}
// 					/>
// 					<Input<RegisterType>
// 						FieldKey="password"
// 						placeholder="mật khẩu"
// 						type="password"
// 						register={registerForm.register}
// 						watch={registerForm.watch}
// 						error={registerForm.formState.errors}

// 						// formState={registerForm.formState}
// 					/>
// 					<Input<RegisterType>
// 						FieldKey="confirm_password"
// 						placeholder="xác nhận mật khẩu"
// 						type="password"
// 						register={registerForm.register}
// 						watch={registerForm.watch}
// 						error={registerForm.formState.errors}
// 					/>

// 					<Button type="submit" textContent="Đăng kí" className="!bg-slate-800" />
// 				</form>
// 				{onClose && (
// 					<div className="absolute top-[-20px] right-[-10px] xl:right-[-20px] z-[3]">
// 						<IconClose onClose={onClose} />
// 					</div>
// 				)}
// 			</div>
// 		</WrapperAuthLayout>
// 	);
// };

// export default RegisterDemo;
import React from "react";

const RegisterDemo = () => {
	return <div>RegisterDemo</div>;
};

export default RegisterDemo;
