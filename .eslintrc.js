module.exports = {
  env: {
    node: true,
    browser: false,
    "jest/globals": true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "plugin:node/recommended"
  ],
  settings: {
    node: {
      tryExtensions: [".ts", ".json", ".node"]
    }
  },
  plugins: ["@typescript-eslint", "jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  rules: {
    "no-console": 1,
    "no-unused-vars": ["error", { ignoreModules: true }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false
      }
    ],
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        version: ">=12.0.0",
        ignores: ["modules"]
      }
    ],
    "@typescript-eslint/no-var-requires": 1,
    "@typescript-eslint/camelcase": 1
  }
};
