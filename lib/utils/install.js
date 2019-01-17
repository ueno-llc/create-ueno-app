'use strict';

const execa = require('execa');
const Promise = require('bluebird');
const messages = require('../messages');
const getInstallCmd = require('./get-install-cmd');
const output = require('./output');

module.exports = function install({ projectName, projectPath, packages } = { packages: [] }) {
  if (packages.length === 0) {
    output.error('Missing packages in `install`, try running again.');
    process.exit(1);
  }

  const installCmd = getInstallCmd();
  const installArgs = getInstallArgs(installCmd, packages);

  messages.installing(packages);
  process.chdir(projectPath);

  return new Promise((resolve, reject) => {
    const stopInstallSpinner = output.wait('Installing modules');

    execa(installCmd, installArgs)
      // Confirm that all dependencies were installed
      .then(() => execa(installCmd, ['install']))
      .then(() => {
        stopInstallSpinner();
        output.success(`Installed dependencies for ${output.cmd(projectName)}`);
        resolve();
      })
      .catch(() => {
        stopInstallSpinner();
        messages.installError(packages);
        return reject(new Error(`${installCmd} installation failed`));
      });
  });
};

function getInstallArgs(cmd, packages) {
  if (cmd === 'npm') {
    const args = ['install', '--save', '--save-exact'];

    return args.concat(packages, ['--verbose']);
  } else if (cmd === 'yarn') {
    const args = ['add', '--exact'];

    return args.concat(packages);
  }
}
