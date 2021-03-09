import { defineConfig } from "vite-plugin-windicss";
import colors from "windicss/colors";
import typography from "windicss/plugin/typography";
import forms from "windicss/plugin/forms";
import defaultTheme from "windicss/defaultTheme";

export default defineConfig({
	darkMode: "class",
	plugins: [typography(), forms],
	theme: {
		extend: {
			colors: {
				...colors,
			},
			fontFamily: {
				display: ["Bubbler One", ...defaultTheme.fontFamily.sans],
				body: ["Esteban", ...defaultTheme.fontFamily.serif],
			},
			typography: {
				DEFAULT: {
					css: {
						color: "inherit",
						a: {
							color: "inherit",
							opacity: 0.75,
							// fontWeight: "500",
							textDecoration: "underline",
							"&:hover": {
								opacity: 1,
								color: colors.blue[300],
							},
						},
						b: { color: "inherit" },
						strong: { color: "inherit" },
						em: { color: "inherit" },
						h1: { color: "inherit" },
						h2: { color: "inherit" },
						h3: { color: "inherit" },
						h4: { color: "inherit" },
						code: { color: "inherit" },
					},
				},
			},
		},
	},
});
