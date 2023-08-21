module.exports = function (api) {
  api.cache(true)

  return {
    presets: [
      [
        'next/babel',
        {
          'preset-env': {
            targets: {
              chrome: '49',
              ios: '10',
            },
          },
          'transform-runtime': {},
          'styled-jsx': {},
          'class-properties': {
            loose: false,
          },
        },
      ],
    ],
    plugins: [
      'macros',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      '@babel/plugin-transform-unicode-regex',

      ...(process.env.NODE_ENV === 'development'
        ? []
        : [['transform-remove-console', { exclude: ['error', 'warn'] }]]),
    ],
  }
}
