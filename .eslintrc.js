module.exports = {
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:vue/vue3-recommended",

		"prettier",
	],
	parser: "vue-eslint-parser",
	parserOptions: {
		ecmaVersion: 2021,
		parser: "@typescript-eslint/parser",
		sourceType: "module",
		impliedStrict: true,
	},
	plugins: ["vue", "@typescript-eslint"],
	ignorePatterns: ["**/*.html"],
	rules: {
		"@typescript-eslint/no-unused-vars": "off",
	},
};
