'use strict';

const path = require('path');
const execa = require('execa');
const output = require('./output');

module.exports = function reactNativeInit(opts) {
  const appName = opts.appName;
  const bundleId = opts.bundleId;

  const folderName = () => {
    return appName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
  }

  const dirName = () => {
    return path.join(process.cwd(), folderName());
  }

  try {
    console.log('1/3: Cloning ueno-llc/react-native-starter');
    execa.shellSync(`git clone git@github.com:ueno-llc/react-native-starter.git ${dirName()}`);
    console.log('2/3: Installing dependencies');
    execa.shellSync(`cd ${dirName()} && yarn`);
    console.log('3/3: Renaming application');
    execa.shellSync(`cd ${dirName()} && yarn rename "${appName}" "${bundleId}"`);

    output.success('React Native Starter installed!');
  } catch (e) {
    // noop
  }
};
