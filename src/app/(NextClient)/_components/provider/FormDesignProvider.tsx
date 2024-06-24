import React, { SetStateAction, createContext, useState } from "react";
import ModelNotSave from "../../form/[id]/(owner)/edit/components/FormDesign/ModelNotSave";

type TFormDesignContext = {
	openFormDesign: boolean;
	setOpenFormDesign: React.Dispatch<SetStateAction<boolean>>;
	isDesignForm: boolean;
	setIsDesginForm: React.Dispatch<SetStateAction<boolean>>;
	openModelNotSave: boolean;
	setOpenModelNotSave: React.Dispatch<SetStateAction<boolean>>;

	openDesignTitle: boolean;
	setOpenDesignTitle: React.Dispatch<SetStateAction<boolean>>;
};

export const FormDesignContext = createContext<TFormDesignContext>({
	isDesignForm: false,
	openFormDesign: false,
	openModelNotSave: false,
	openDesignTitle: false,
	setIsDesginForm: () => {},
	setOpenFormDesign: () => {},
	setOpenModelNotSave: () => {},
	setOpenDesignTitle: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const FormDesignProvider = (props: TProps) => {
	const { children } = props;

	const [isDesignForm, setIsDesginForm] = useState<boolean>(false);
	const [openFormDesign, setOpenFormDesign] = useState<boolean>(false);
	const [openModelNotSave, setOpenModelNotSave] = useState<boolean>(false);
	const [openDesignTitle, setOpenDesignTitle] = useState<boolean>(false);

	return (
		<FormDesignContext.Provider
			value={{
				isDesignForm,
				setIsDesginForm,
				openFormDesign,
				setOpenFormDesign,
				openModelNotSave,
				setOpenModelNotSave,
				openDesignTitle,
				setOpenDesignTitle,
			}}
		>
			{openModelNotSave && <ModelNotSave />}
			{children}
		</FormDesignContext.Provider>
	);
};

export default FormDesignProvider;
