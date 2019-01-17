'use strict';

const chalk = require('chalk');

const getInstallCmd = require('./utils/get-install-cmd');
const output = require('./utils/output');

const program = {
  name: 'create-ueno-app',
};

exports.help = function() {
  return output.info(`Only ${chalk.green('<project-directory>')} is required.

  If you have any problems, do not hesitate to file an issue:
    ${chalk.cyan('https://github.com/ueno/create-ueno-app/issues/new')}
  `);
};

exports.missingProjectName = function() {
  return output.error(`Please specify the project directory:
    ${chalk.cyan(program.name)} <app-type> ${chalk.green('<project-directory>')}

  For example:
    ${chalk.cyan(program.name)} next ${chalk.green('example-www')}
    ${chalk.cyan(program.name)} gatsby ${chalk.green('example-www')}
    ${chalk.cyan(program.name)} cra ${chalk.green('example-www')}
    ${chalk.cyan(program.name)} native ${chalk.green('example-app')} ${chalk.yellow('"co.ueno.app"')}

  Run ${chalk.cyan(`${program.name} --help`)} to see all options.
  `);
};

exports.invalidAppType = function(type) {
  return output.error(`Invalid <app-type> ${chalk.bold(chalk.red(type))}`);
}

exports.alreadyExists = function(projectName) {
  return output.error(`Looks like there's already a directory called ${chalk.bold(chalk.red(projectName))}. Please try a different name or delete that folder.`);
};


exports.alreadyExists = function(projectName) {
  return output.error(`Oops! Looks like you forgot to defined the bundleId for ${chalk.red(projectName)}. Please define one e.g. "co.ueno.app".`);
};

exports.installing = function(packages) {
  const pkgText = packages
    .map(pkg => `  ${chalk.bold(chalk.cyan(pkg))}`)
    .join('\n');

  return output.info(`Installing npm modules: \n${pkgText}`);
};

exports.installError = function(packages) {
  const pkgText = packages
    .map(pkg => `  ${chalk.bold(chalk.cyan(pkg))}`)
    .join('\n');

  return output.error(`Failed to install, try again: \n${pkgText}`);
};

exports.copying = function(projectName) {
  return output.info(`Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('create-ueno-app')}...`);
};

exports.start = function(projectName) {
  const cmd = getInstallCmd();

  const commands = {
    install: cmd === 'npm' ? 'npm install' : 'yarn',
    build: cmd === 'npm' ? 'npm run build' : 'yarn build',
    start: cmd === 'npm' ? 'npm run start:prod' : 'yarn start:prod',
    dev: cmd === 'npm' ? 'npm start' : 'yarn start',
  };

  return output.info(`${chalk.green('Awesome!')} You're now ready to start coding.

  I already ran ${output.cmd(commands.install)} for you, so your next steps are:
    ${output.cmd(`cd ${projectName}`)}

  To start a local server for development:
    ${output.cmd(commands.dev)}

  To build a version for production:
    ${output.cmd(commands.build)}

  To run the server in production:
    ${output.cmd(commands.start)}

  Questions? Feedback? Please let me know!
  ${chalk.green('https://github.com/create-ueno-app/issues')}
  `);
};
