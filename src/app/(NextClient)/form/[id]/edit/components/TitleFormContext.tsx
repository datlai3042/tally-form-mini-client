"use client";
import React, { SetStateAction, createContext, useState } from "react";

type TTitleFomContext = {
	title: string;
	setTitleForm: React.Dispatch<SetStateAction<string>>;
};

export const TitleFormContext = createContext<TTitleFomContext>({
	title: "",
	setTitleForm: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const TitleFormContextProvider = (props: TProps) => {
	const { children } = props;
	const [title, setTitleForm] = useState<string>("");

	return <TitleFormContext.Provider value={{ title, setTitleForm }}>{children}</TitleFormContext.Provider>;
};

export default TitleFormContextProvider;
