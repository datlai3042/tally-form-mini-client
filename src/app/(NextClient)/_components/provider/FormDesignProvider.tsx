import React, { SetStateAction, createContext, useState } from "react";
import ButtonDesgin from "../ui/button/ButtonDesgin";
import FormDesignCustom from "../../form/[id]/edit/components/FormDesignCustom";

type TFormDesignContext = {
	openFormDesign: boolean;
	setOpenFormDesign: React.Dispatch<SetStateAction<boolean>>;
	isDesignForm: boolean;
	setIsDesginForm: React.Dispatch<SetStateAction<boolean>>;
};

export const FormDesignContext = createContext<TFormDesignContext>({
	isDesignForm: false,
	openFormDesign: false,
	setIsDesginForm: () => {},
	setOpenFormDesign: () => {},
});

const FormDesignProvider = () => {
	const [isDesignForm, setIsDesginForm] = useState<boolean>(false);
	const [openFormDesign, setOpenFormDesign] = useState<boolean>(false);

	return (
		<FormDesignContext.Provider value={{ isDesignForm, setIsDesginForm, openFormDesign, setOpenFormDesign }}>
			<ButtonDesgin />
			{openFormDesign && <FormDesignCustom />}
		</FormDesignContext.Provider>
	);
};

export default FormDesignProvider;
