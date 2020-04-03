module.exports = {
  env: {
    node: true,
    browser: false,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:node/recommended",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "plugin:@typescript-eslint/recommended",
  ],
  settings: {
    node: {
      tryExtensions: [".js", ".ts", ".json", ".node"],
    },
  },
  plugins: ["@typescript-eslint", "prettier", "jest"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    project: `${__dirname}/tsconfig.json`,
    tsconfigRootDir: __dirname,
  },
  rules: {
    "no-console": 1,
    "no-unused-vars": ["error", { ignoreModules: true }],
    "prettier/prettier": ["error", { trailingComma: "es5" }],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        vars: "all",
        args: "after-used",
        ignoreRestSiblings: false,
      },
    ],
    "node/no-unsupported-features/es-syntax": [
      "error",
      {
        version: ">=12.0.0",
        ignores: ["modules"],
      },
    ],
    "@typescript-eslint/no-var-requires": 1,
    "@typescript-eslint/camelcase": 1,
  },
};
