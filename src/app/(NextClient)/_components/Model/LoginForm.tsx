/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import WrapperAuthLayout from "../Layout/WrapperAuthLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Http from "@/app/_lib/http";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";

import IconClose from "../ui/input/IconClose";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import Link from "next/link";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";

type TProps = {
	onClose?: (state: boolean) => void;
};

const LoginForm = (props: TProps) => {
	const { onClose } = props;
	const dispatch = useDispatch();
	const router = useRouter();

	const loginForm = useForm<LoginType>({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: zodResolver(loginSchema),
	});

	const loginMutation = useMutation({
		mutationKey: ["login"],
		mutationFn: (formLogin: LoginType) =>
			Http.post<ResponseApi<ResponseAuth>>("/v1/api/auth/login", formLogin, {
				credentials: "include",
			}),
		onSuccess: (response) => {
			const {
				user,
				token: { access_token, refresh_token },
				client_id,
			} = response.metadata;
			dispatch(onFetchUser({ user }));
			const setTokenResponse = Http.post<ResponseApi<ResponseAuth>>(
				"/v1/api/auth/set-token",
				{
					access_token,
					refresh_token,
					client_id,
				},
				{ baseUrl: "" }
			).then((response) => {
				if (onClose) {
					onClose(false);
				}
			});
		},
	});

	const onSubmit = (data: LoginType) => {
		loginMutation.mutate(data);
	};

	useEffect(() => {
		if (loginMutation.isSuccess) {
			if (onClose) {
				onClose(false);
			}
		}
	}, [loginMutation.isSuccess, onClose]);

	console.log({ errors: loginForm.formState.errors });

	return (
		<div className="relative  h-[40rem] w-[32rem] sm:w-[37rem] xl:w-[40rem] xl:h-[40rem] mx-auto bg-[#ffffff] flex justify-center items-center flex-col  gap-[2rem] rounded-[1.2rem] p-[2.4rem_2rem]">
			<p className="mb-[4rem] text-[3rem] font-semibold">Welcome back</p>
			<form
				className="w-full h-full flex flex-col justify-center  gap-[1.8rem] rounded-[1.2rem]"
				onSubmit={loginForm.handleSubmit(onSubmit)}
			>
				<Input<LoginType>
					FieldKey="email"
					placeholder="Email"
					type="email"
					register={loginForm.register}
					error={loginForm.formState.errors}
					watch={loginForm.watch}
				/>
				<Input<LoginType>
					FieldKey="password"
					placeholder="Mật khẩu"
					type="password"
					register={loginForm.register}
					error={loginForm.formState.errors}
					watch={loginForm.watch}
				/>
				<Button type="submit" textContent="Đăng nhập" className="!w-full !h-[4rem] !bg-blue-600 " />
			</form>

			<p className="text-[1.4rem]">
				Don't have an account yet?{" "}
				<Link href={"/register"} className="text-blue-400 underline">
					Register
				</Link>
			</p>

			{onClose && (
				<div className="absolute  top-[-20px] right-[-10px] xl:right-[-20px]">
					<IconClose onClose={onClose} />
				</div>
			)}
		</div>
	);
};

export default LoginForm;
