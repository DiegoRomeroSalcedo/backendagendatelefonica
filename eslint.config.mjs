import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } }, // Cambia browser por node
  pluginJs.configs.recommended,
  {
    rules: {
      semi: ["error", "always"], // Exigir punto y coma
    },
  },
];
