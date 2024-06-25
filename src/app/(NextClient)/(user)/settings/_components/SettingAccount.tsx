import React, { useEffect } from "react";
import { registerSchema } from "@/app/_schema/auth/register.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import Input from "@/app/(NextClient)/_components/ui/input/Input";

const userUpdateSchema = registerSchema.pick({ first_name: true, last_name: true, email: true });
type UserUpdateInfo = z.infer<typeof userUpdateSchema>;

const SettingAccount = () => {
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	const formUpdate = useForm<UserUpdateInfo>({
		defaultValues: {
			first_name: user?.user_first_name || "",
			last_name: user?.user_last_name || "",
			email: user?.user_email || "",
		},
		resolver: zodResolver(userUpdateSchema),
	});

	const onSubmit = (dataForm: UserUpdateInfo) => {};

	useEffect(() => {}, [user]);

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

						<Input<UserUpdateInfo>
							FieldKey="email"
							placeholder="Nhập email"
							register={formUpdate.register}
							type="text"
							watch={formUpdate.watch}
							error={formUpdate.formState.errors}
						/>
					</form>
					<button
						type="submit"
						form="form_update"
						className="w-[10%] p-[.8rem] h-[3.6rem] flex justify-center items-center gap-[.8rem] bg-blue-700 text-white rounded-lg"
					>
						Cập nhập
					</button>
				</>
			)}
		</div>
	);
};

export default SettingAccount;
