"use client";

import React from "react";
import { ButtonCustomProps } from "./Button";
import { ButtonCustomNavigation } from "./ButtonNavigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { useRouter } from "next/navigation";

interface TProps extends ButtonCustomNavigation {
	icon?: React.ReactNode;
	position?: "LEFT" | "RIGHT";
}

const ButtonCreateForm = (props: TProps) => {
	const { textContent, urlNavigation, position = "LEFT", icon, ...AnchorProps } = props;

	const router = useRouter();
	const createNewForm = useMutation({
		mutationKey: ["create-new-form"],
		mutationFn: () => FormService.createForm(),
		onSuccess: (dataResponse) => {
			const { form_id } = dataResponse.metadata;
			router.push(`/form/${form_id}/edit`);
		},
	});

	return (
		<Link
			onClick={() => createNewForm.mutate()}
			tabIndex={-1}
			href={urlNavigation}
			{...AnchorProps}
			className={`${AnchorProps.className}  p-[6px_12px] flex  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] bg-[rgb(0_112_215)] opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.6rem]`}
		>
			{position === "LEFT" && icon && icon}
			{textContent}
			{position === "RIGHT" && icon && icon}
		</Link>
	);
};

export default ButtonCreateForm;
