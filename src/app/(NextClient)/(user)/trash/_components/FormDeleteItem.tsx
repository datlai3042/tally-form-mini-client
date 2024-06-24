import ModelCheckRemove from "@/app/(NextClient)/_components/Model/ModelCheckRemove";
import useChangeModeForm from "@/app/hooks/useChangeModeForm";
import useDeleteFormForever from "@/app/hooks/useDeleteFormForever";
import { FormCore } from "@/type";
import { useQueryClient } from "@tanstack/react-query";
import { RotateCcw, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";

type TProps = {
	form: FormCore.Form;
};

const FormDeleteItem = (props: TProps) => {
	const { form } = props;
	const changeFormMode = useChangeModeForm();
	const deleteFormForever = useDeleteFormForever();
	const [openModelCheckRemove, setOpenModelCheckRemove] = useState<boolean>(false);

	const queryClient = useQueryClient();

	const onChangeModeForm = (type: FormCore.FormState = "isPrivate") => {
		changeFormMode.mutate({ mode: type, form_id: form._id });
	};

	const onChangeDeleteForever = () => {
		deleteFormForever.mutate({ form_id: form._id });
	};

	useEffect(() => {
		if (changeFormMode.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: ["get-list-form-delete"],
			});
		}
	}, [changeFormMode.isSuccess]);

	useEffect(() => {
		if (deleteFormForever.isSuccess) {
			queryClient.invalidateQueries({
				queryKey: ["get-list-form-delete"],
			});
			queryClient.invalidateQueries({
				queryKey: ["get-all-notification"],
			});
			setOpenModelCheckRemove(false);
		}
	}, [deleteFormForever.isSuccess]);

	return (
		<div className="min-h-[14rem] w-full xl:w-[30%] p-[2rem] flex flex-col justify-between text-[1.2rem] gap-[2rem] bg-red-400 rounded-lg text-[#fff]">
			<p className="text-[1.4rem]">{form.form_title.form_title_value.toUpperCase() || "Không có tiêu đề"}</p>
			<div className="flex justify-between">
				<button
					disabled={changeFormMode.isPending}
					className="flex h-[3rem] px-[1rem] rounded-lg  items-center gap-[1rem] border-[.1rem] border-red-200 bg-[#ffffff] text-red-400 hover:bg-red-50"
					onClick={() => onChangeModeForm()}
				>
					<RotateCcw size={18} />
					<span>Khôi phục</span>
				</button>

				<button
					className="flex h-[3rem] items-center gap-[1rem] hover:text-red-200"
					onClick={() => setOpenModelCheckRemove(true)}
					disabled={deleteFormForever.isPending}
				>
					<Trash size={18} />
					<span>Xóa vĩnh viễn</span>
				</button>
			</div>
			{openModelCheckRemove && (
				<ModelCheckRemove
					content="Bạn chắc chắn sẽ xóa chứ, mọi dữ liệu sau khi xóa sẽ không thể phục hồi"
					callbackCancel={setOpenModelCheckRemove}
					callbackAction={onChangeDeleteForever}
				/>
			)}
		</div>
	);
};

export default FormDeleteItem;
