'use strict';

const fs = require('fs');

const messages = require('./utils/messages');
const checkForUpdate = require('./utils/check-for-update');
const processExit = require('./utils/process-exit');
const cra = require('./stacks/cra');
const gatsby = require('./stacks/gatsby');
const native = require('./stacks/native');
const next = require('./stacks/next');

const appTypes = [
  'cra',
  'gatsby',
  'native',
  'next',
];

module.exports = async function createUenoApp({ projectName, appType }) {
  await checkForUpdate();

  if (!projectName) {
    messages.missingProjectName();
    process.exit(1);
  }

  if (appTypes.indexOf(appType) === -1) {
    messages.invalidAppType(appType);
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    messages.alreadyExists(projectName);
    process.exit(1);
  }

  if (appType === 'native' && !process.argv[4]) {
    messages.missingBundleId(projectName);
    process.exit(1);
  }

  const projectPath = `${process.cwd()}/${projectName}`;

  switch (appType) {
    case 'cra': cra(projectName); break;
    case 'gatsby': gatsby(projectName, projectPath); break;
    case 'native': native(projectName, process.argv[4]); break;
    case 'next': next(projectName, projectPath); break;
    default: break;
  }

  process.on('exit', () => processExit(projectPath, projectName, appType));
};
