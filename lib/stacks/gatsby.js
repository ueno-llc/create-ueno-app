'use strict';

const chalk = require('chalk');

const messages = require('../utils/messages');
const initGit = require('../utils/init-git');
const output = require('../utils/output');

module.exports = async function gatsby(projectName, projectPath, projectStyle) {
  const isSass = projectStyle === 'sass';

  output.info(
    `🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold(
      'gatsby-cli/lib/init-starter',
    )} and ${chalk.bold('ueno-gatsby-starter')}...`,
  );

  process.argv[2] = 'new';
  process.argv[3] = projectName;
  process.argv[4] = `https://github.com/ueno-llc/ueno-gatsby-starter#${
    isSass ? 'master' : 'styled'
  } --recursive`;

  require('@jeremybarbet/gatsby-cli');

  process.chdir(projectPath);

  await initGit('Gatsby');

  messages.start(projectName, 'gatsby');
};
