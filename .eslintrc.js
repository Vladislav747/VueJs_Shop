module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	extends: [
		"plugin:vue/essential",
		"eslint:recommended",
		"@vue/prettier",
		"plugin:vue/recommended",
		"plugin:vue/base",
	],
	globals: {
		Atomics: "readonly",
		SharedArrayBuffer: "readonly",
	},
	parserOptions: {
		parser: "babel-eslint",
		ecmaVersion: 2018,
		sourceType: "module",
	},
	plugins: ["vue"],
	rules: {
		"linebreak-style": 0,
		indent: ["error", "tab"],
		"no-unused-vars": "warn",
	},
};
