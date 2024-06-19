"use client";
import React, { SetStateAction, createContext, useState } from "react";

type ModeScreen = "NORMAL" | "FULL";

type TFormModeScreen = {
	modeScreen: ModeScreen;
	setModeScreen: React.Dispatch<SetStateAction<ModeScreen>>;
};

export const FormModeScreenContext = createContext<TFormModeScreen>({
	modeScreen: "NORMAL",
	setModeScreen: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const FormModeScreenProvider = (props: TProps) => {
	const { children } = props;
	const [modeScreen, setModeScreen] = useState<ModeScreen>("NORMAL");

	console.log({ "Chế độ": modeScreen === "FULL" ? "Review" : "Editor" });

	return (
		<FormModeScreenContext.Provider value={{ modeScreen, setModeScreen }}>
			{children}
		</FormModeScreenContext.Provider>
	);
};

export default FormModeScreenProvider;
