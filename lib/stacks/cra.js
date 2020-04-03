'use strict';

const chalk = require('chalk');

const output = require('../utils/output');

module.exports = function cra(projectName) {
  output.info(
    `🚀 Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold(
      'create-react-app',
    )} and ${chalk.bold('@ueno/react-scripts')}...`,
  );

  process.argv[2] = projectName;
  process.argv[3] = '--scripts-version';
  process.argv[4] = '@ueno/react-scripts@1.3.3';
  process.argv[5] = '--template';
  process.argv[6] = '@ueno/cra-template';

  require('create-react-app');
};
