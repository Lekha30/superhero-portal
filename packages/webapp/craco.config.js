const path = require('path');
const { getLoader, loaderByName } = require('@craco/craco');
const CracoAlias = require('craco-alias');
const webComponents = path.join(__dirname, '../../packages/web-components/src');
const i18n = path.join(__dirname, '../../packages/i18n/src');
const interfaces = path.join(__dirname, '../../packages/interfaces/interfaces');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: './src',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      const { isFound, match } = getLoader(
        webpackConfig,
        loaderByName('babel-loader'),
      );
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];
        match.loader.include = include.concat[webComponents];
        match.loader.include = include.concat[i18n];
        match.loader.include = include.concat[interfaces];
      }

      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) =>
          constructor && constructor.name === 'ModuleScopePlugin',
      );

      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      return webpackConfig;
    },
  },
};
