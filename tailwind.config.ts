import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#FF5E14",
				black: {
					900: "#1A1A1A",
					500: "#5A5A5A",
				},
				status: {
					success: {
						"10": "#F3FEF3",
						"100": "#008000",
					},
					warning: {
						10: "#FFA5001A",
						100: "#F7D4C3",
						500: "#FFA500",
					},
					error: {
						"10": "#FEE4E2",
						"100": "#FF0000",
					},
					information: {
						"10": "#F2F8FF",
						"100": "#17A2B8",
					},
				},
			},
			fontFamily: {
				Roboto: ["var(--roboto)"],
				OpenSans: ["var(--open-sans)"],
			},
			container: {
				center: true,
				padding: {
					DEFAULT: "1rem",
					sm: "2rem",
					lg: "4rem",
					xl: "5rem",
					"2xl": "6rem",
				},
			},
			transitionProperty: {
				height: "height",
				width: "width",
				"max-height": "max-height",
			},
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
export default config;
