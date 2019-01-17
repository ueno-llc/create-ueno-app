'use strict';

const { eraseLine } = require('ansi-escapes');
const chalk = require('chalk');
const ora = require('ora');

exports.info = function(msg) {
  console.log(`> ${msg} \n`);
};

exports.error = function(msg) {
  if (msg instanceof Error) {
    msg = msg.message;
  }

  console.error(`${chalk.red('> Error!')} ${msg} \n`);
};

exports.success = function(msg) {
  console.log(`${chalk.green('> Success!')} ${msg} \n`);
};

exports.wait = function(msg) {
  const spinner = ora(chalk.green(msg));

  spinner.color = 'blue';
  spinner.start();

  return () => {
    spinner.stop();
    process.stdout.write(eraseLine);
  };
};

exports.cmd = function(cmd) {
  return chalk.bold(cmd);
};
