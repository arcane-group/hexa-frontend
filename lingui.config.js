module.exports = {
  locales: ['en', 'zh'],
  sourceLocale: 'en',
  catalogs: [
    {
      path: '<rootDir>/src/locale/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**'],
    },
  ],
  format: 'po',
  formatOptions: {
    origins: true,
    lineNumbers: false,
  },
  orderBy: 'messageId',
  fallbackLocales: {
    default: 'en',
  },
}
