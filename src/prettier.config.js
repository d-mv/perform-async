module.exports = {
  singleQuote: true,
  bracketSpacing: true,
  printWidth: 100,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
  arrowParens: 'avoid',
  endOfLine: 'lf',
  overrides: [
    {
      files: '*.json',
      options: {
        singleQuote: false,
        parser: 'json',
      },
    },
    {
      files: ['*.ts', '*tsx'],
      options: {
        parser: 'typescript',
      },
    },
  ],
};
