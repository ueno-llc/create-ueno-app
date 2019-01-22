'use strict';

const output = require('./output');

module.exports = function initGit(name) {
  try {
    execSync('git init', { stdio: 'ignore' });
    execSync('git add .', { stdio: 'ignore' });
    execSync(`git commit -m "Init Create Ueno App with ${name}"`, { stdio: 'ignore' });

    output.info('Initialized a git repository.');

    return true;
  } catch (e) {
    // Noop
  }
}
