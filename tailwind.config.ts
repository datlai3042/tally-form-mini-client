import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
				"gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
			},
			animation: {
				scaleIn: "scaleIn 2s forwards",
				opacityUp: "opacityUp 2s forwards",
				topUp: "topUp 3s forwards",
				topDown: "topDown 3s forwards",
				changeColorSea: "changeColorSea 4s forwards",

				sizeLigth: "sizeLight 1.8s forwards",

				changeColor: "changeColor 4s forwards",
				rotate: "rotate 1s infinite",
				shipRun: "shipRun 10s forwards",
			},
			keyframes: {
				scaleIn: {
					"0%": { backgroundPosition: "10%" },
					"50%": { backgroundPosition: "50%" },
					"80%": { backgroundPosition: "100%" },
					"100%": { backgroundPosition: "100% -50%" },
				},
				opacityUp: {
					"0%": { opacity: ".8" },
					"50%": { opacity: "0" },
					"100%": { opacity: ".65" },
				},
				topUp: {
					"0%": { top: "500%" },
					"100%": { top: "100px" },
				},

				changeColor: {
					"0%, 20%,40%,60%": { color: "transparent" },
					"100%": { color: "white" },
				},

				topDown: {
					"0%": { top: "-500%" },
					"100%": { top: "0px" },
				},

				shipRun: {
					"0%": { left: "0%" },
					"10%": { left: "10%" },
					"20%": { left: "20%" },
					"30%": { left: "30%" },
					"40%": { left: "40%" },
					"50%": { left: "50%" },
					"60%": { left: "60%" },
					"70%": { left: "70%" },
					"80%": { left: "80%" },
					"90%": { left: "90%" },
					"100%": { left: "100%" },
				},

				rotate: {
					"0%": {
						transform: "rotateX(-25deg) ",
					},
					"50%": {
						transform: "rotateX(0deg)",
					},
					"100%": {
						transform: "rotateX(25deg)",
					},
				},

				sizeLight: {
					"0%, 20%,40%,60%": { backgroundColor: "#ccc", width: "50%", height: "50%" },
					"100%": { backgroundColor: "rgb(254, 224, 71)", width: "100%", height: "100%" },
				},

				changeColorSea: {
					"0": { opacity: "0", backgroundColor: "transparent" },
					"100%": { backgroundColor: "rgb(254 240 138)", opacity: ".25" },
				},
			},
		},
	},
	plugins: [],
};
export default config;
