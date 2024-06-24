import useGetListFormDelete from "@/app/hooks/useGetListFormDelete";
import React from "react";
import FormDeleteItem from "./FormDeleteItem";
import LoadingArea from "@/app/(NextClient)/_components/ui/loading/LoadingArea";
import TrashEmpty from "@/app/(NextClient)/_components/_StatusCodeComponent/TrashEmpty";

const ListFormDelete = () => {
	const allFormDelete = useGetListFormDelete();

	return (
		<div className="flex h-full flex-wrap gap-[4rem] pb-[10rem]">
			{allFormDelete.isSuccess &&
				allFormDelete.data.metadata.forms.length > 0 &&
				allFormDelete.data.metadata.forms.map((form) => <FormDeleteItem key={form._id} form={form} />)}

			{allFormDelete.isSuccess && allFormDelete.data.metadata.forms.length === 0 && <TrashEmpty />}
			{allFormDelete.isPending && (
				<div className="w-full min-h-[30rem]">
					<LoadingArea />
				</div>
			)}
		</div>
	);
};

export default ListFormDelete;
