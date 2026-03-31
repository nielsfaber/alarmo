import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default [
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 2018,
            sourceType: "module",
            parserOptions: {
                experimentalDecorators: true,
            },
        },
        plugins: {
            "@typescript-eslint": tsPlugin,
        },
        rules: {
            ...tsPlugin.configs.recommended.rules,
            "@typescript-eslint/camelcase": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/no-non-null-assertion": "off",
            "@typescript-eslint/no-unused-vars": "warn",
            "@typescript-eslint/no-unsafe-function-type": "warn",
        },
    },
    prettierConfig,
];
