'use strict';

const chalk = require('chalk');

const getInstallCmd = require('./get-install-cmd');
const output = require('./output');

const program = {
  name: 'create-ueno-app',
};

exports.outOfDate = function(current, latest) {
  const command = getInstallCmd() === 'yarn'
    ? 'yarn global add create-ueno-app'
    : 'npm install -g create-ueno-app';

  return console.log(`
  ———————————————————————————————————————————————————————————

  There is a new version for ${chalk.bold(chalk.green('create-ueno-app'))} available ${chalk.bold(chalk.green(latest))}.
  You are currently using ${chalk.bold(chalk.red(current))}.

  Please run ${chalk.bold(chalk.green(command))} to get
  the latest version available.

  ———————————————————————————————————————————————————————————
  `);
}

exports.aheadOfPublished = function() {
  return console.log(`
  ———————————————————————————————————————————————————————————

  The version of ${chalk.green('create-ueno-app')} you are
  using is aheah on the npm one.

  ———————————————————————————————————————————————————————————
  `);
}

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
    ${chalk.cyan(program.name)} native ${chalk.green('example-app')} ${chalk.yellow('"com.example.app"')}

  Run ${chalk.cyan(`${program.name} --help`)} to see all options.
  `);
};

exports.invalidAppType = function(type) {
  return output.error(`Invalid <app-type> ${chalk.bold(chalk.red(type))}`);
}

exports.alreadyExists = function(projectName) {
  return output.error(`Looks like there's already a directory called ${chalk.bold(chalk.red(projectName))}. Please try a different name or delete that folder`);
};

exports.missingBundleId = function(projectName) {
  return output.error(`Oops! Looks like you forgot to defined the bundleId for ${chalk.red(projectName)}. Please define one e.g. "co.ueno.app"`);
};

exports.installing = function(packages) {
  const pkgText = packages
    .map(pkg => `  ${output.cmd(pkg)}`)
    .join('\n');

  return output.info(`Installing npm packages: \n${pkgText}`);
};

exports.installError = function(packages) {
  const pkgText = packages
    .map(pkg => `  ${output.cmd(pkg)}`)
    .join('\n');

  return output.error(`Failed to install, try again: \n${pkgText}`);
};

exports.start = function(projectName, type) {
  const cmd = getInstallCmd();
  const install = cmd === 'npm' ? 'npm install' : 'yarn';
  const start = cmd === 'npm' ? 'npm start' : 'yarn start';
  const dev = cmd === 'npm' ? 'npm dev' : 'yarn dev';
  const build = cmd === 'npm' ? 'npm run build' : 'yarn build';
  const buildStart = start;
  const ios = 'react-native run-ios';
  const android = 'react-native run-android';

  const guide = type !== 'native'
    ? `To start a local server for development:
    ${output.cmd(dev)}

  To build a version for production:
    ${output.cmd(build)}

  To run the server in production:
    ${output.cmd(buildStart)}`
    : `To start a local server for development:
    ${output.cmd(start)}

  To run the app on iOS:
    ${output.cmd(ios)}

  To run the app on Android:
    ${output.cmd(android)}`;

  return output.info(`${chalk.green('Awesome!')} You're now ready to start coding.

  I already ran ${output.cmd(install)} for you, so your next steps are:
    ${output.cmd(`cd ${projectName}`)}

  ${guide}

  Questions? Feedback? Please let me know!
  ${chalk.green('https://github.com/create-ueno-app/issues')}`);
};
