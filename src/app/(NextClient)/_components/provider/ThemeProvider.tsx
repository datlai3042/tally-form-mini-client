"use client";
import React, { SetStateAction, createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
	theme: "dark" | "light";
	setTheme: React.Dispatch<SetStateAction<"dark" | "light">>;
};

export const ThemeContext = createContext<ThemeContextType>({
	theme: "light",
	setTheme: () => {},
});

type TProps = {
	children: React.ReactNode;
};

const ThemeProvider = (props: TProps) => {
	const { children } = props;

	const [theme, setTheme] = useState<"dark" | "light">("light");

	useEffect(() => {
		console.log({ theme });
		if (theme === "dark") {
			document.body.classList.remove("light");
			document.body.classList.add("dark");
			return;
		}

		document.body.classList.add("light");
		document.body.classList.remove("dark");
		return () => {};
	}, [theme]);

	return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
