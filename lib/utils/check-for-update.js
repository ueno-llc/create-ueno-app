'use strict';

const execa = require('execa');
const semver = require('semver');

const messages = require('./messages');

const packageJson = require('../../package.json');

module.exports = async function checkForUpdate() {
  const current = packageJson.version;
  const res = await execa('npm', ['view', packageJson.name, 'version']);
  const latest = res.stdout.trim();

  switch (semver.compare(current, latest)) {
    case -1:
      messages.outOfDate(current, latest);
      break;

    case 0:
      break;

    case 1:
      messages.aheadOfPublished();
      break;

    default:
      throw new Error('Confused about whether create-ueno-app is up-to-date or not');
  }
}
