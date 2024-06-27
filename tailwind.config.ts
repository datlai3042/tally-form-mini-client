import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				"color-main": "var(--color-main)",
				"color-main-hover": "var(--color-main-hover)",
				"color-section-theme": "var(--color-section-theme)",
				"color-gap-empty": "var(--color-gap-empty)",
				"text-theme": "var(--text-theme)",
				"border-color": "var(--border-color)",

				formCoreBgColor: "rgb(253 242 248)",
				textHeader: "rgb(119, 118, 114)",
				textMain: "rgb(55, 53, 47)",
				pinkCustom: "rgb(248, 28, 229)",
				textGray: "rgb(137,136,132)",
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				modeScreen: {
					"0%": { transform: "scale(.8)" },
					"100%": { transform: "none" },
				},
				scaleIn: {
					"0%": { backgroundPosition: "10%" },
					"50%": { backgroundPosition: "50%" },
					"80%": { backgroundPosition: "100%" },
					"100%": { backgroundPosition: "100% -50%" },
				},

				showModelNotSave: {
					"0%": { top: "-100%" },
					"100%": { top: "3rem" },
				},

				hiddenToast: {
					"0%": { opacity: "0.5", left: "0" },
					"100%": { opacity: "1", left: "150%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				scaleIn: "scaleIn 2s forwards",
				opacityUp: "opacityUp 2s forwards",
				topUp: "topUp 3s forwards",
				topDown: "topDown 3s forwards",
				changeColorSea: "changeColorSea 4s forwards",
				showModelNotSave: "showModelNotSave 2s ",
				sizeLigth: "sizeLight 1.8s forwards",

				changeColor: "changeColor 4s forwards",
				rotate: "rotate 1s infinite",
				shipRun: "shipRun 10s forwards",
				modeScreen: "modeScreen .3s forwards",
				runLTR: "runLTR 5s forwards",
				hiddenToast: "hiddenToast 2s forwards",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
