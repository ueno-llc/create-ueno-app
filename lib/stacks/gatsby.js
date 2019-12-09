'use strict';

const chalk = require('chalk');

const messages = require('../utils/messages');
const initGit = require('../utils/init-git');
const output = require('../utils/output');

module.exports = async function gatsby(projectName, projectPath, projectStyle) {
  output.info(`🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('gatsby-cli/lib/init-starter')} and ${chalk.bold('ueno-gatsby-starter')}...`);

  if (projectStyle === 'sass') {
    await require('gatsby-cli/lib/init-starter')('https://github.com/ueno-llc/ueno-gatsby-starter#master --recursive', { rootPath: projectName });
  } else {
    await require('gatsby-cli/lib/init-starter')('https://github.com/ueno-llc/ueno-gatsby-starter#styled', { rootPath: projectName });
  }

  process.chdir(projectPath);

  await initGit('Gatsby');

  messages.start(projectName, 'gatsby');
};
