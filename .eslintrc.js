module.exports = {
  extends: "eslint:recommended",
  env: {
    node: true,
    es6: true
  },
  rules: {
    "no-empty": ["error", { "allowEmptyCatch": true }]
  }
};
