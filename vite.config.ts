import { defineConfig } from "vite";
import path from "path";
import vue from "@vitejs/plugin-vue";
import WindiCSS from "vite-plugin-windicss";
import { compileTemplate, SFCTemplateCompileOptions } from "@vue/compiler-sfc";
import { readFileSync } from "fs";

const customSvgPlugin = () => {
	const fileRegex = /\.svg$/;
	return {
		name: "svg-loader",
		enforce: "pre" as const,
		transform(src: string, id: string) {
			if (fileRegex.test(id)) {
				// console.log(src);
				const base = readFileSync(id);
				const { code } = compileTemplate({
					source: base.toString(),
					transformAssetUrls: false,
					id,
				} as SFCTemplateCompileOptions);
				return code;
			}
			return src;
		},
	};
};

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), WindiCSS(), customSvgPlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
