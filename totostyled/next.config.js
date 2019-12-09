require('dotenv').config();

const path = require('path');
const plugins = require('next-compose-plugins');
const images = require('next-images');
const videos = require('next-videos');
const fonts = require('next-fonts');
const reactSvg = require('next-react-svg');

const nextConfig = {
  // server only
  serverRuntimeConfig: {},

  // client and server
  publicRuntimeConfig: {},

  // where to put built server
  distDir: '../.next',

  // create directories for html files
  exportTrailingSlash: true,

  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.modules = [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ];

    return config;
  },
};

module.exports = plugins(
  [
    [images, { exclude: path.resolve(__dirname, 'src/assets/svg') }],
    [reactSvg, { include: path.resolve(__dirname, 'src/assets/svg') }],
    fonts,
    videos,
  ],
  nextConfig
);
