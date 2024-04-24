import React, { useEffect } from "react";
import InputLayout from "../../_components/ui/input/InputLayout";
import { registerSchema } from "@/app/_schema/auth/register.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../_components/ui/input/Input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";

const userUpdateSchema = registerSchema.pick({ first_name: true, last_name: true });
type UserUpdateInfo = z.infer<typeof userUpdateSchema>;

const SettingAccount = () => {
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	const formUpdate = useForm<UserUpdateInfo>({
		defaultValues: {
			first_name: user?.user_first_name || "",
			last_name: user?.user_last_name || "",
		},
		resolver: zodResolver(userUpdateSchema),
	});

	const onSubmit = (dataForm: UserUpdateInfo) => {
		console.log({ dataForm });
	};

	useEffect(() => {}, [user]);

	console.log({ errors: formUpdate.formState.errors });
	console.log({ value: formUpdate.formState.defaultValues });

	return (
		<div className="flex flex-col ">
			{user && (
				<>
					<form onSubmit={formUpdate.handleSubmit(onSubmit)} id="form_update">
						<Input<UserUpdateInfo>
							FieldKey="first_name"
							placeholder="Nhập first name"
							register={formUpdate.register}
							type="text"
							watch={formUpdate.watch}
							error={formUpdate.formState.errors}
						/>

						<Input<UserUpdateInfo>
							FieldKey="last_name"
							placeholder="Nhập last name"
							register={formUpdate.register}
							type="text"
							watch={formUpdate.watch}
							error={formUpdate.formState.errors}
						/>
					</form>
					<InputLayout placeholder="email" value="123" />
					<button
						type="submit"
						form="form_update"
						className="w-[10%] p-[.2rem_.8rem] h-[2.7rem] flex justify-center items-center gap-[.8rem] bg-slate-700 text-white rounded-md"
					>
						Update
					</button>
				</>
			)}

			{!user && (
				<div className="flex flex-col gap-[1.8rem]">
					<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
					<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
					<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
					<div className="animate-pulse w-full h-[2rem] rounded-md bg-slate-200"></div>
					<div className="animate-pulse bg-slate-200 w-[10%] p-[.2rem_.8rem] h-[2.7rem] d">Update</div>
				</div>
			)}
		</div>
	);
};

export default SettingAccount;
