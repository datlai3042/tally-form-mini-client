import React, { SetStateAction, createContext, useState } from "react";
import ButtonDesgin from "../../form/[id]/edit/components/FormDesign/DesignCommon/ButtonDesgin";
import FormDesignCustom from "../../form/[id]/edit/components/FormDesign/FormDesignCustom";
import ModelNotSave from "../../form/[id]/edit/components/FormDesign/ModelNotSave";

type TFormDesignContext = {
	openFormDesign: boolean;
	setOpenFormDesign: React.Dispatch<SetStateAction<boolean>>;
	isDesignForm: boolean;
	setIsDesginForm: React.Dispatch<SetStateAction<boolean>>;
	openModelNotSave: boolean;
	setOpenModelNotSave: React.Dispatch<SetStateAction<boolean>>;
};

export const FormDesignContext = createContext<TFormDesignContext>({
	isDesignForm: false,
	openFormDesign: false,
	openModelNotSave: false,
	setIsDesginForm: () => {},
	setOpenFormDesign: () => {},
	setOpenModelNotSave: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const FormDesignProvider = (props: TProps) => {
	const { children } = props;

	const [isDesignForm, setIsDesginForm] = useState<boolean>(false);
	const [openFormDesign, setOpenFormDesign] = useState<boolean>(false);
	const [openModelNotSave, setOpenModelNotSave] = useState<boolean>(false);

	return (
		<FormDesignContext.Provider
			value={{
				isDesignForm,
				setIsDesginForm,
				openFormDesign,
				setOpenFormDesign,
				openModelNotSave,
				setOpenModelNotSave,
			}}
		>
			{/* {openFormDesign && <FormDesignCustom />} */}
			{openModelNotSave && <ModelNotSave />}
			{children}
		</FormDesignContext.Provider>
	);
};

export default FormDesignProvider;
