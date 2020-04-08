'use strict';

const chalk = require('chalk');
const isInstalledGlobally = require('is-installed-globally');

const getInstallCmd = require('./get-install-cmd');

module.exports = async function checkInstall() {
  const command = getInstallCmd() === 'yarn'
    ? 'yarn create ueno-app <gatsby|next|cra|native> my-app <sass|styled>'
    : 'npx create-ueno-app <gatsby|next|cra|native> my-app <sass|styled>';

  if (!isInstalledGlobally) {
    console.log(`
    —————————————————————————————————————————————————————————————————————

    Installing globally create-ueno-app as a package has been deprecated.
    Please now use now the following:

    ${chalk.bold(chalk.green(command))}

    —————————————————————————————————————————————————————————————————————
    `);

    process.exit();
  }
};
