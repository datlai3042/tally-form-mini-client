"use client";

import React from "react";
import { ButtonCustomProps } from "./Button";
import { ButtonCustomNavigation } from "./ButtonNavigation";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { useRouter } from "next/navigation";

interface TProps extends ButtonCustomNavigation {
	icon?: React.ReactNode;
	position?: "LEFT" | "RIGHT";
}

const ButtonCreateForm = (props: TProps) => {
	const { textContent, urlNavigation, position = "LEFT", icon, ...AnchorProps } = props;

	const router = useRouter();
	const queryClient = useQueryClient();

	const createNewForm = useMutation({
		mutationKey: ["create-new-form"],
		mutationFn: () => FormService.createForm(),
		onSuccess: (dataResponse) => {
			const { form_id } = dataResponse.metadata;
			router.push(`/form/${form_id}/edit`);
			queryClient.invalidateQueries({ queryKey: ["get-forms"] });
		},
	});

	return (
		<Link
			onClick={() => createNewForm.mutate()}
			tabIndex={-1}
			href={urlNavigation}
			{...AnchorProps}
			className={`${AnchorProps.className} w-[60%] xl:w-[20rem] h-[4rem]  p-[1rem_2rem] flex  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] bg-color-main opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.4rem]`}
		>
			{position === "LEFT" && icon && icon}
			{textContent}
			{position === "RIGHT" && icon && icon}
		</Link>
	);
};

export default ButtonCreateForm;
