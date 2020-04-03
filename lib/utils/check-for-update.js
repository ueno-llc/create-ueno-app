'use strict';

const execa = require('execa');
const semver = require('semver');

const messages = require('./messages');
const getInstallCmd = require('./get-install-cmd');

const packageJson = require('../../package.json');

module.exports = async function checkForUpdate() {
  const current = packageJson.version;
  const res = await execa('npm', ['view', packageJson.name, 'version']);
  const latest = res.stdout.trim();

  switch (semver.compare(current, latest)) {
    case 1:
      messages.aheadOfPublished();
      break;

    default:
      const command =
        getInstallCmd() === 'yarn'
          ? 'yarn create ueno-app <gatsby|next|cra|native> my-app <sass|styled>'
          : 'npx create-ueno-app <gatsby|next|cra|native> my-app <sass|styled>';

      throw new Error(`
      ———————————————————————————————————————————————————————————

      Installing globally create-ueno-app as a package has been
      deprecated. Please now use ${command}.

      ———————————————————————————————————————————————————————————
      `);
  }
};
