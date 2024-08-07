/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useEffect } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";

import IconClose from "../ui/input/IconClose";
import Input from "../ui/input/Input";
import Button from "../ui/button/Button";
import Link from "next/link";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import AuthService from "@/app/_services/auth.service";
import ButtonLoginGoogle from "../ui/button/ButtonLoginGoogle";
import ButtonLoginGithub from "../ui/button/ButtonLoginGithub";

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
            mutationFn: (formLogin: LoginType) => AuthService.login<LoginType, ResponseApi<ResponseAuth>>(formLogin),
            onSuccess: (response) => {},
      });

      const onSubmit = (data: LoginType) => {
            loginMutation.mutate(data);
      };

      useEffect(() => {
            if (loginMutation.isSuccess) {
                  const { user } = loginMutation?.data.metadata;
                  router.push("/dashboard");
                  dispatch(onFetchUser({ user }));
            }
      }, [loginMutation.isSuccess, onClose, loginMutation.data, dispatch, router]);

      useEffect(() => {
            if (Object.keys(loginForm.formState.errors).length > 0) {
            }
      }, [loginForm.formState.errors]);

      return (
            <div className="relative  min-h-[40rem] w-[32rem] sm:w-[37rem] xl:w-[40rem] h-max mx-auto  flex justify-center items-center flex-col  gap-[2rem] rounded-[1.2rem] p-[2.4rem_2rem]">
                  <p className="mb-[1rem] xl:mb-[4rem] text-[3rem] font-semibold">Xin chào bạn</p>

                  <div className="my-[1rem] w-full flex flex-col gap-[2rem] xl:gap-[6rem]">
                        <div className="w-full flex gap-[1rem]">
                              <div className="w-[50%]">
                                    <ButtonLoginGoogle />
                              </div>

                              <div className="w-[50%]">
                                    <ButtonLoginGithub />
                              </div>
                        </div>
                        <form className="w-full h-full flex flex-col justify-center  gap-[1.8rem] rounded-[1.2rem]" onSubmit={loginForm.handleSubmit(onSubmit)}>
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
                              <Button
                                    disabled={loginMutation.isPending}
                                    loading={loginMutation.isPending}
                                    type="submit"
                                    textContent="Đăng nhập"
                                    className="!w-full !h-[4rem] !bg-blue-600 "
                              />
                        </form>
                  </div>

                  <p className="text-[1.4rem]">
                        Bạn chưa có tài khoản?{" "}
                        <Link href={"/register"} className="text-blue-400 underline">
                              đăng kí nhé
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
