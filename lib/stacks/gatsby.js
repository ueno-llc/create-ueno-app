'use strict';

const chalk = require('chalk');
const execa = require('execa');

const messages = require('../utils/messages');
const output = require('../utils/output');

module.exports = async function gatsby(projectName, projectPath, projectStyle) {
  const isSass = projectStyle === 'sass';
  const starter = `https://github.com/ueno-llc/ueno-gatsby-starter#${isSass ? 'master' : 'styled'}`;

  output.info(
    `🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold(
      'gatsby-cli/lib/init-starter',
    )} and ${chalk.bold('ueno-gatsby-starter')}...`,
  );

  await require('gatsby-cli/lib/init-starter').initStarter(starter, { rootPath: projectName });

  process.chdir(projectPath);

  try {
    await execa('git', ['commit', '--amend', '-m', 'Init Create Ueno App with Gatsby'], {
      stdio: 'ignore',
    });
  } catch (e) {
    output.error(`Cannot change the commit message: ${e}`);
  }

  messages.start(projectName, 'gatsby');
};
