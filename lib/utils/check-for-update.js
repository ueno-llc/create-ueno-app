'use strict';

const execa = require('execa');
const semver = require('semver');
const chalk = require('chalk');

const getInstallCmd = require('./get-install-cmd');
const packageJson = require('../../package.json');

module.exports = async function checkForUpdate() {
  const current = packageJson.version;
  const res = await execa('npm', ['view', packageJson.name, 'version']);
  const latest = res.stdout.trim();

  switch (semver.compare(current, latest)) {
    case -1:
      const command = getInstallCmd() === 'yarn'
        ? 'yarn create ueno-app <gatsby|next|cra|native> my-app <sass|styled>'
        : 'npx create-ueno-app <gatsby|next|cra|native> my-app <sass|styled>';

      console.log(`
  —— New update available, run the following ${chalk.bold(command)}
      `);

      process.exit();

    case 0: break;

    case 1:
      console.log(chalk.red(`
  —— The version of create-ueno-app is ahead of npm one
      `));
      break;

    default:
      console.log(`
  —— Confused about whether create-ueno-app is up-to-date or not
      `);

      process.exit();
  }
}
