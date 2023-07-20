module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 80,
  tabWidth: 2,
  trailingComma: "all",
  semi: true,
  importOrderSeparation: true,
  importOrder: ["^[./]"],
  importOrderSortSpecifiers: true,
};
