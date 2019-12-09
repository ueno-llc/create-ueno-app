module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-csso')({ restructure: false }),
  ],
};