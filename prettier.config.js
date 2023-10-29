module.exports = {
  trailingComma: 'all',
  arrowParens: 'always',
  singleAttributePerLine: true,
  singleQuote: true,
  printWidth: 100,
  importOrder: [
    '^types$',
    '^(react|react-dom)$',
    '^next(.*)$',
    '<THIRD_PARTY_MODULES>',
    '',
    '^(src|vectors|images|utils|hooks|locales|queries|store|styles|config|navigators|screens|static)(/.*|$)',
    '^(pages|layouts|modules|common)(/.*|$)',
    '',
    '^[./]',
  ],
  plugins: ['@ianvs/prettier-plugin-sort-imports'],
};
