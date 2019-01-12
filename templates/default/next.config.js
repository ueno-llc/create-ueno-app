const path = require('path');
const withSass = require('@zeit/next-sass');
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    webpack(config, options) {
      const classNamesLoader = require.resolve('classnames-loader');

      const styleRules = config.module.rules.filter(rule =>
        rule.test.test('file.scss') || rule.test.test('file.sass'));

      styleRules.forEach(styleRule => {
        if (styleRule.use && styleRule.use.indexOf(classNamesLoader) === -1) {
          styleRule.use.splice(0, 0, classNamesLoader);
        }
      });

      config.resolve = config.resolve || {};
      config.resolve.modules = [
        path.join(__dirname, 'src'),
        path.join(__dirname, 'node_modules'),
      ];

      config.module.rules.push({
        test: /\.(svg)$/,
        include: /assets\/svg/,
        loader: require.resolve('svg-react-loader'),
      });

      return config;
    }
  })
);
