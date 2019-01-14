'use strict';

const path = require('path');
const execa = require('execa');

module.exports = function reactNativeInit(appName, bundleId) {
  const folderName = () => {
    return appName.replace(/-([a-z])/g, (g) => { return g[1].toUpperCase(); });
  }

  const dirName = () => {
    return path.join(process.cwd(), folderName());
  }

  try {
    console.log('Cloning ueno-llc/react-native-starter');
    execa.shellSync(`git clone git@github.com:ueno-llc/react-native-starter.git ${dirName()}`);
    console.log('Installing dependencies');
    execa.shellSync(`cd ${dirName()} && yarn`);
    console.log('Renaming application');
    execa.shellSync(`cd ${dirName()} && yarn rename "${appName}" "${bundleId}"`);
    console.log('DONE');
  } catch (e) {
    // noop
  }
};
