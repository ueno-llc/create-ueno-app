'use strict';

const chalk = require('chalk');
const getInstallCmd = require('./utils/get-install-cmd');
const output = require('./utils/output');

const program = {
  name: 'create-ueno-app',
};

exports.help = function() {
  return `
    Only ${chalk.green('<project-directory>')} is required.
    If you have any problems, do not hesitate to file an issue:
      ${chalk.cyan('https://github.com/ueno/create-ueno-app/issues/new')}
  `;
};

exports.missingProjectName = function() {
  return `
Please specify the project directory:
  ${chalk.cyan(program.name)} <app-type> ${chalk.green('<project-directory>')} ${chalk.yellow('<bundle-id>')}

For example:
  ${chalk.cyan(program.name)} next ${chalk.green('example-www')}
  ${chalk.cyan(program.name)} gatsby ${chalk.green('example-www')}
  ${chalk.cyan(program.name)} cra ${chalk.green('example-www')}
  ${chalk.cyan(program.name)} native ${chalk.green('example-www')} ${chalk.yellow('"com.ueno.mynewapp"')}

Run ${chalk.cyan(`${program.name} --help`)} to see all options.
`;
};

exports.invalidAppType = function(type) {
  return `error: invalid <app-type> "${type}"`;
}

exports.alreadyExists = function(projectName) {
  return `Uh oh! Looks like there's already a directory called ${chalk.red(projectName)}. Please try a different name or delete that folder.`;
};

exports.missingBundleId = function(projectName) {
  return `Oops! Looks like you forgot to defined the bundleId for ${chalk.red(projectName)}. Please define one e.g. "co.ueno.app".`;
};

exports.installing = function(packages) {
  const pkgText = packages
    .map(function(pkg) {
      return `    ${chalk.cyan(chalk.bold(pkg))}`;
    })
    .join('\n');

  return `
  Installing npm modules:
${pkgText}
`;
};

exports.installError = function(packages) {
  const pkgText = packages
    .map(function(pkg) {
      return `${chalk.cyan(chalk.bold(pkg))}`;
    })
    .join(', ');

  output.error(`Failed to install ${pkgText}, try again.`);
};

exports.copying = function(projectName) {
  return `
Creating ${chalk.bold(chalk.green(projectName))}...
`;
};

exports.start = function(projectName) {
  const cmd = getInstallCmd();

  const commands = {
    install: cmd === 'npm' ? 'npm install' : 'yarn',
    build: cmd === 'npm' ? 'npm run build' : 'yarn build',
    start: cmd === 'npm' ? 'npm run start:prod' : 'yarn start:prod',
    dev: cmd === 'npm' ? 'npm start' : 'yarn start',
  };

  return `
  ${chalk.green('Awesome!')} You're now ready to start coding.

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
`;
};
