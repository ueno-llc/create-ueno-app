'use strict';

const path = require('path');
const fs = require('fs');

const messages = require('./utils/messages');
const checkForUpdate = require('./utils/check-for-update')
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
    case 'gatsby': gatsby(projectName); break;
    case 'native': native(projectName, process.argv[4]); break;
    case 'next': next(projectName, projectPath); break;

    default: break;
  }

  process.on('exit', () => {
    if (appType === 'native') {
      return;
    }

    try { fs.unlinkSync(path.join(projectPath, 'src', '.git')); } catch (e) { /* noop */ }
    try { fs.unlinkSync(path.join(projectPath, '.gitmodules')); } catch (e) { /* noop */ }
    try { fs.copyFileSync(path.join(path.resolve(__dirname), '..', 'overwrites', appType, 'Link.tsx'), path.join(projectPath, 'src', 'components', 'link', 'Link.tsx')); } catch (e) { /* noop */ }

    if (appType === 'cra') {
      try { fs.copyFileSync(path.join(path.resolve(__dirname), '..', 'overwrites', appType, 'index.tsx'), path.join(projectPath, 'src', 'index.tsx')); } catch (e) { /* noop */ }
      try { fs.copyFileSync(path.join(path.resolve(__dirname), '..', 'overwrites', appType, 'serviceWorker.ts'), path.join(projectPath, 'src', 'serviceWorker.ts')); } catch (e) { /* noop */ }
    }
  });
};
