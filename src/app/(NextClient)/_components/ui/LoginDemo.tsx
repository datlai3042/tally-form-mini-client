// "use client";
// import React, { useEffect } from "react";

// import WrapperAuthLayout from "../Layout/WrapperAuthLayout";
// import IconClose from "../ui/input/IconClose";
// import Image from "next/image";
// import { Controller, useForm } from "react-hook-form";
// import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Input from "../ui/input/Input";
// import Button from "../ui/button/Button";
// import { log } from "console";
// import { useMutation } from "@tanstack/react-query";
// import Http, { clientToken } from "@/app/_lib/http";
// import { useDispatch } from "react-redux";
// import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";
// import { useRouter } from "next/navigation";
// import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";

// type TProps = {
// 	onClose?: (state: boolean) => void;
// };

// const LoginDemo = (props: TProps) => {
// 	const { onClose } = props;
// 	const dispatch = useDispatch();
// 	const router = useRouter();

// 	const loginForm = useForm<LoginType>({
// 		defaultValues: {
// 			email: "",
// 			password: "",
// 		},
// 		resolver: zodResolver(loginSchema),
// 	});

// 	const loginMutation = useMutation({
// 		mutationKey: ["login"],
// 		mutationFn: (formLogin: LoginType) => Http.post<ResponseApi<ResponseAuth>>("/v1/api/auth/login", formLogin, {}),
// 		onSuccess: (response) => {
// 			const {
// 				user,
// 				token: { access_token, refresh_token },
// 			} = response.metadata;
// 			dispatch(onFetchUser({ user }));
// 			const setTokenResponse = Http.post<{ access_token: string; refresh_token: string; _id: string }>(
// 				"/v1/api/auth/set-token",
// 				{
// 					access_token,
// 					refresh_token,
// 					_id: user._id,
// 				},
// 				{ baseUrl: "" }
// 			).then((response) => {
// 				if (onClose) {
// 					onClose(false);
// 				}
// 			});
// 		},
// 	});

// 	const onSubmit = (data: LoginType) => {
// 		loginMutation.mutate(data);
// 	};

// 	useEffect(() => {
// 		if (loginMutation.isSuccess) {
// 			if (onClose) {
// 				onClose(false);
// 			}
// 		}
// 	}, [loginMutation.isSuccess, onClose]);

// 	return (
// 		<WrapperAuthLayout zIndex={300}>
// 			<div className="relative w-full h-[400px] xl:w-[800px] xl:h-[400px] bg-[#ffffff] flex rounded-[12px] p-[24px_20px]">
// 				<form
// 					className="w-full h-full flex flex-col justify-center  gap-[16px] rounded-[12px]"
// 					onSubmit={loginForm.handleSubmit(onSubmit)}
// 				>
// 					<p className="text-center mr-[20px]">Đăng nhập</p>
// 					<Input<LoginType>
// 						FieldKey="email"
// 						placeholder="Email"
// 						type="email"
// 						register={loginForm.register}
// 						error={loginForm.formState.errors}
// 						watch={loginForm.watch}
// 					/>
// 					<Input<LoginType>
// 						FieldKey="password"
// 						placeholder="Mật khẩu"
// 						type="password"
// 						register={loginForm.register}
// 						error={loginForm.formState.errors}
// 						watch={loginForm.watch}
// 					/>
// 					{/* <Input register={loginForm.register} key="password" /> */}
// 					<Button type="submit" textContent="Đăng nhập" />
// 				</form>
// 				<Image
// 					src={"/assets/images/backgroundForm/bg.jpg"}
// 					width={400}
// 					height={400}
// 					alt="sub-image"
// 					fill={false}
// 					style={{ objectFit: "fill" }}
// 				/>
// 				{onClose && (
// 					<div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px]">
// 						<IconClose onClose={onClose} />
// 					</div>
// 				)}
// 			</div>
// 		</WrapperAuthLayout>
// 	);
// };

// export default LoginDemo;
import React from "react";

export const LoginDemo = () => {
	return <div>LoginDemo</div>;
};
