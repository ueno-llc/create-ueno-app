'use strict';

const execa = require('execa');

const output = require('./output');

module.exports = async function initGit(name) {
  try {
    await execa('git', ['init'], { stdio: 'ignore' });
    await execa('git', ['add', '.'], { stdio: 'ignore' });
    await execa('git', ['commit', '-m', `Init Create Ueno App with ${name}`], { stdio: 'ignore' });

    output.info('Initialized a git repository.');
  } catch (e) {
    const cmd = `${output.cmd(`git add . && git commit -m Init Create Ueno App with ${name}`)}`;

    output.error(`We haven't been able to fully initialized the git repository. The files haven't been commit properly. Run ${cmd} to finish the setup.`);
  }
}
