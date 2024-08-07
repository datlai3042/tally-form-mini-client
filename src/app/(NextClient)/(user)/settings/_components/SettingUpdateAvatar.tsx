"use client";

import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/type";
import UserService from "@/app/_services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { RootState } from "@/app/_lib/redux/store";
import Image from "next/image";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";

const SettingUpdateAvatar = () => {
      const user = useSelector((state: RootState) => state.authReducer.user);
      const inputAvatar = useRef<HTMLInputElement | null>(null);
      const dispatch = useDispatch();

      const onClickButton = () => {
            if (inputAvatar.current) {
                  inputAvatar.current.value = "";
                  inputAvatar.current.click();
            }
      };

      const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {

            if (e.target && e.target.files) {
                  const formData: User.uploadFile = new FormData();
                  formData.append("file", e.target.files[0]);
                  uploadAvatar.mutate(formData);
            }
      };

      const uploadAvatar = useMutation({
            mutationKey: ["upload-avatar"],
            mutationFn: (formData: User.uploadFile) => UserService.uploadAvatar(formData),
            onSuccess: (res) => {
                  const { user } = res.metadata;
                  dispatch(onFetchUser({ user }));
            },
      });


      return (
            <div className="group w-full h-[15rem] flex flex-col gap-[1rem]">
                  <p className="text-[1.4rem] font-bold">Hình đại diện</p>
                  <div className="flex items-center gap-[2.4rem]">
                        {user?.user_avatar_current && (
                              <Image
                                    src={user.user_avatar_current}
                                    width={100}
                                    height={100}
                                    alt="avatar"
                                    className="w-[10rem] h-[10rem] rounded-full hover:cursor-pointer"
                                    unoptimized={true}
                                    onClick={onClickButton}
                              />
                        )}
                        {!user?.user_avatar_current && (
                              <div className="w-[10rem] aspect-square bg-green-400 flex items-center justify-center rounded-full text-[#ffffff]">L</div>
                        )}

                        <div className="flex">
                              <button onClick={onClickButton} className="p-[.8rem] h-[30%] flex items-center gap-[1rem] bg-color-main rounded-lg text-[#fff]">
                                    Tải ảnh lên
                                    {uploadAvatar.isPending && <LoadingSpinner color="#fff" />}
                              </button>
                              <input type="file" hidden ref={inputAvatar} onChange={onChangeFile} />
                        </div>
                  </div>
            </div>
      );
};

export default SettingUpdateAvatar;
