"use client";
import React, { useContext } from "react";
import { ThemeContext } from "../../provider/ThemeProvider";

const ButtonDarkMode = () => {
	const { setTheme } = useContext(ThemeContext);

	const onChangeTheme = () => {
		console.log("click");
		setTheme((prev) => (prev === "dark" ? "light" : "dark"));
	};

	return (
		<button onClick={onChangeTheme} className="text-text-theme">
			ButtonDarkMode
		</button>
	);
};

export default ButtonDarkMode;
