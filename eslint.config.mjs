import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {// Ignorar la carpeta dist
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "eqeqeq": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "no-console": 0,
      "semi": ["error", "always"], // Asegúrate de que esta regla esté aquí
    },
  },
  pluginJs.configs.recommended,
  {
    ignores: ["dist/**", "build/**"],
  }
];
