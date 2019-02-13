'use strict';

const fs = require('fs-extra');
const sysPath = require('path');
const execa = require('execa');
const hostedGitInfo = require('hosted-git-info');
const chalk = require('chalk');

const getInstallCmd = require('../utils/get-install-cmd');
const messages = require('../utils/messages');
const output = require('../utils/output');

const install = async (projectName) => {
  const installCmd = getInstallCmd();

  output.info('Installing packages...');
  process.chdir(projectName);

  return new Promise((resolve, reject) => {
    execa(installCmd, null, { stdio: 'inherit' })
      .then(() => execa(installCmd, ['install']))
      .then(() => {
        output.success(`Installed dependencies for ${output.cmd(projectName)}`);
        resolve();
      })
      .catch(() => reject(new Error(`${installCmd} installation failed`)));
  });
};

const rename = async (projectName, bundleId) => {
  const prevDir = process.cwd();
  const installCmd = getInstallCmd();
  const name = projectName.replace(/-([a-z])/g, g => g[1].toUpperCase());

  output.info(`Renaming the app to ${name}/${bundleId}...`);

  return new Promise((resolve, reject) => {
    execa(installCmd, ['rename', name, bundleId], { stdio: 'inherit' })
      .then(() => execa(installCmd, ['install']))
      .then(() => {
        output.success('App renamed');
        process.chdir(prevDir);
        resolve();
      })
      .catch(() => reject(new Error(`${installCmd} installation failed`)));
  });
};

async function native(projectName, bundleId) {
  output.info(`🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('react-native-starter')}...`);

  const hostedInfo = hostedGitInfo.fromUrl('https://github.com/ueno-llc/react-native-starter#master');
  const url = hostedInfo.https({ noCommittish: true, noGitPlus: true });

  await execa('git', ['clone', url, projectName, '--single-branch'], { stdio: 'inherit' });
  output.success(`Folder and files created for ${output.cmd(projectName)}`);

  await fs.remove(sysPath.join(projectName, '.git'));
  await install(projectName);
  await rename(projectName, bundleId);

  messages.start(projectName, 'native');
};

module.exports = native;
