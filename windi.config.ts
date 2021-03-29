import { defineConfig } from "vite-plugin-windicss";
import colors from "windicss/colors";
import defaultTheme from "windicss/defaultTheme";
import formsPlugin from "windicss/plugin/forms";

export default defineConfig({
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				...colors,
			},
			fontFamily: {
				display: ["Bubbler One", ...defaultTheme.fontFamily.sans],
				body: ["Esteban", ...defaultTheme.fontFamily.serif],
			},
		},
	},
	plugins: [formsPlugin],
});
