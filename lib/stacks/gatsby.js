'use strict';

const chalk = require('chalk');

const messages = require('../utils/messages');
const output = require('../utils/output');

module.exports = async function gatsby(projectName) {
  output.info(`🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('gatsby-cli/lib/init-starter')} and ${chalk.bold('ueno-gatsby-starter')}...`);

  require('gatsby-cli/lib/init-starter')('https://github.com/ueno-llc/ueno-gatsby-starter#master --recursive', { rootPath: projectName });

  messages.start(projectName, 'gatsby');
};
