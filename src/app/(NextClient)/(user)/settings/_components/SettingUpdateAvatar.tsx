"use client";

import React, { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { User } from "@/type";
import UserService from "@/app/_services/user.service";
import { useDispatch, useSelector } from "react-redux";
import { onFetchUser } from "@/app/_lib/redux/features/authentication.slice";
import { RootState } from "@/app/_lib/redux/store";
import Image from "next/image";

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
		console.log(0);

		if (e.target && e.target.files) {
			const formData: User.uploadFile = new FormData();
			formData.append("file", e.target.files[0]);
			console.log(1);
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

	console.log({ user });

	return (
		<div className="group w-full h-[140px] flex flex-col gap-[1rem]">
			<p className="text-[1.4rem] font-bold">Photo</p>
			<div className="flex items-center gap-[2rem]">
				{user?.user_avatar_current.secure_url && (
					<Image
						src={user.user_avatar_current.secure_url}
						width={100}
						height={100}
						alt="avatar"
						className="w-[10rem] h-[10rem] rounded-full"
					/>
				)}
				{!user?.user_avatar_current.secure_url && (
					<div className="w-[10rem] aspect-square bg-green-400 flex items-center justify-center rounded-full text-[#ffffff]">
						L
					</div>
				)}

				<div className="hidden group-hover:flex">
					<button
						onClick={onClickButton}
						className="p-[.2rem_.8rem] h-[30%] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					>
						Upload Photo
					</button>
					<input type="file" hidden ref={inputAvatar} onChange={onChangeFile} />
				</div>
			</div>
		</div>
	);
};

export default SettingUpdateAvatar;
