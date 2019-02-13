'use strict';

const fs = require('fs-extra');
const sysPath = require('path');
const chalk = require('chalk');
const hostedGitInfo = require('hosted-git-info');
const execa = require('execa');

const initGit = require('../utils/init-git');
const messages = require('../utils/messages');
const getInstallCmd = require('../utils/get-install-cmd');
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

async function next(projectName, projectPath) {
  output.info(`🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('ueno-next-starter')}...`);

  const hostedInfo = hostedGitInfo.fromUrl('https://github.com/ueno-llc/ueno-next-starter#master');
  const url = hostedInfo.https({ noCommittish: true, noGitPlus: true });

  await execa('git', ['clone', url, projectName, '--single-branch', '--recursive'], { stdio: 'inherit' });
  output.success(`Folder and files created for ${output.cmd(projectName)}`);

  await fs.remove(sysPath.join(projectName, '.git'));
  await install(projectName);
  process.chdir(projectPath);
  await initGit('Next');

  messages.start(projectName, 'next');
};

module.exports = next;
