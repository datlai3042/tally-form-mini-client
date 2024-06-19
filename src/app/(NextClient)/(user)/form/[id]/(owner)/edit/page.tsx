"use client";
import React, { useContext } from "react";

import HeaderEditForm from "./components/HeaderEditForm";
import FormCore from "./components/FormCore";

import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import FormDesignCustom from "./components/FormDesign/FormDesignCustom";
import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";

const EditFormPage = ({ params }: { params: { id: string } }) => {
	const { modeScreen } = useContext(FormModeScreenContext);
	const { openFormDesign } = useContext(FormDesignContext);
	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
	console.log({ formCore });
	return (
		<div className="min-w-full flex flex-col ">
			<HeaderEditForm showHeaderAction={true} />
			{formCore && (
				<div className={`flex`}>
					<FormCore />
					{openFormDesign && modeScreen === "NORMAL" ? <FormDesignCustom /> : null}
				</div>
			)}
		</div>
	);
};

export default EditFormPage;
