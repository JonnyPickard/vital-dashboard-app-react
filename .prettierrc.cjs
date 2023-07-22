module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrderSeparation: true,
  importOrder: ["^[./]"],
  importOrderSortSpecifiers: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  semi: true,
};
