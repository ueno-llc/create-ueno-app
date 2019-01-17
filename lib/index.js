'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const copyDir = require('./utils/copy-dir');
const reactNativeInit = require('./utils/react-native-init');
const install = require('./utils/install');
const messages = require('./messages');

const appTypes = [
  'next',
  'cra',
  'gatsby',
  'native'
];

module.exports = function createUenoApp({ projectName, appType }) {
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
    console.log(messages.missingBundleId(projectName));
    process.exit(1);
  }
  const projectPath = process.cwd() + '/' + projectName;

  process.on('exit', () => {
    if (appType === 'native') {
      return;
    }

    try { fs.unlinkSync(path.join(projectPath, 'src', '.git')); } catch (e) {}
    try { fs.unlinkSync(path.join(projectPath, '.gitmodules')); } catch (e) {}
    try { fs.copyFileSync(path.join(path.resolve(__dirname), '..', 'overwrites', appType, 'Link.tsx'), path.join(projectPath, 'src', 'components', 'link', 'Link.tsx')); } catch (e) {}

    if (appType === 'cra') {
      try { fs.copyFileSync(path.join(path.resolve(__dirname), '..', 'overwrites', appType, 'index.tsx'), path.join(projectPath, 'src', 'index.tsx')); } catch (e) {}
      try { fs.copyFileSync(path.join(path.resolve(__dirname), '..', 'overwrites', appType, 'serviceWorker.ts'), path.join(projectPath, 'src', 'serviceWorker.ts')); } catch (e) {}
    }
  });

  if (appType === 'native') {
    const appName = process.argv[3];
    const bundleId = process.argv[4];

    return reactNativeInit({
      appName,
      bundleId,
    });
  }

  if (appType === 'cra') {
    output.info(`Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('create-react-app')} and ${chalk.bold('@ueno/react-scripts')}...`);

    process.argv[2] = process.argv[3];
    process.argv[3] = '--scripts-version';
    process.argv[4] = '@ueno/react-scripts';

    return require('create-react-app');
  }

  if (appType === 'gatsby') {
    output.info(`Creating ${chalk.bold(chalk.green(projectName))} using ${chalk.bold('gatsby-cli/lib/init-starter')} and ${chalk.bold('ueno-gatsby-starter')}...`);

    return require('gatsby-cli/lib/init-starter')('https://github.com/ueno-llc/ueno-gatsby-starter#master --recursive', { rootPath: projectName });
  }

  const defaultTemplatePath = path.resolve(__dirname, '../templates/default');

  copyDir({
    templatePath: defaultTemplatePath,
    projectPath,
    projectName,
  })
    .then(installWithMessageFactory({ projectName, projectPath }))
    .catch((err) => { throw err });
};

function installWithMessageFactory({ projectName, projectPath }) {
  return function installWithMessage() {
    return install({
      projectName,
      projectPath,
      packages: [
        'react@16.8.0-alpha.0',
        'react-dom@16.8.0-alpha.0',
        'react-helmet',
        'classnames',
        'gsap',
        'gsap-tools',
        'next',
        '@zeit/next-sass',
        '@zeit/next-typescript',
        'express',
      ],
    })
      .then(() => { messages.start(projectName) })
      .catch((err) => { throw err });
  };
}
