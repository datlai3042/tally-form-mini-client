import ButtonSelect from "@/app/(NextClient)/_components/ui/button/ButtonSelect";
import { RootState } from "@/app/_lib/redux/store";
import useChangeModeForm from "@/app/hooks/useChangeModeForm";
import { FormCore } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ModelFormState = () => {
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const colorMain = useSelector((state: RootState) => state.form.colorCore);

	const [modeForm, setModeForm] = useState<FormCore.FormState>(formCore.form_state);

	const changeFormMode = useChangeModeForm();

	const router = useRouter();
	const queryClient = useQueryClient();

	const onChangeModeForm = (type: FormCore.FormState) => {
		changeFormMode.mutate({ mode: type, form_id: formCore._id });
	};

	useEffect(() => {
		if (changeFormMode.isSuccess && modeForm === "isDelete") {
			queryClient.invalidateQueries({ queryKey: ["get-forms"] });
			router.push("/dashboard");
		}
	}, [changeFormMode.isSuccess, modeForm]);

	return (
		<div
			style={{ color: "#000" }}
			className="min-w-[18rem] min-h-[8rem] p-[1rem_2rem] flex flex-col gap-[1rem] border-[.1rem] border-gray-100 bg-[#ffffff] rounded-2xl text-[1.4rem] font-medium shadow-lg"
		>
			<ButtonSelect
				disabled={changeFormMode.isPending}
				value="Công khai"
				color={colorMain}
				checked={modeForm === "isPublic"}
				onClick={() => {
					setModeForm("isPublic");
					onChangeModeForm("isPublic");
				}}
			/>
			<ButtonSelect
				disabled={changeFormMode.isPending}
				value="Riêng tư"
				color={colorMain}
				checked={modeForm === "isPrivate"}
				onClick={() => {
					setModeForm("isPrivate");
					onChangeModeForm("isPrivate");
				}}
			/>

			<ButtonSelect
				disabled={changeFormMode.isPending}
				value="Xóa"
				color={colorMain}
				checked={modeForm === "isDelete"}
				onClick={() => {
					setModeForm("isDelete");
					onChangeModeForm("isDelete");
				}}
			/>
		</div>
	);
};

export default ModelFormState;
