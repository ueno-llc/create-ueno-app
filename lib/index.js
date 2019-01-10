'use strict';

const path = require('path');
const fs = require('fs');
const copyDir = require('./utils/copy-dir');
const install = require('./utils/install');
const messages = require('./messages');

const appTypes = [
  'next',
  'cra',
  'gatsby'
];

const basePackages = [
  'react',
  'react-dom',
  'react-helmet',
  'classnames',
  'gsap',
];

const appPackages = {
  next: [
    'next',
    '@zeit/next-sass',
    '@zeit/next-typescript',
    'express',
  ],
}

module.exports = function createUenoApp(opts) {
  const projectName = opts.projectName;
  const appType = opts.appType;

  if (!projectName) {
    console.log(messages.missingProjectName());
    process.exit(1);
  }

  if (appTypes.indexOf(appType) === -1) {
    console.log(messages.invalidAppType(appType));
    process.exit(1);
  }

  if (fs.existsSync(projectName)) {
    console.log(messages.alreadyExists(projectName));
    process.exit(1);
  }

  if (appType === 'cra') {
    process.argv[2] = process.argv[3];
    process.argv[3] = '--scripts-version';
    process.argv[4] = '@ueno/react-scripts';
    return require('create-react-app');
  }

  if (appType === 'gatsby') {
    return require('gatsby-cli/lib/init-starter')('https://github.com/ueno-llc/ueno-gatsby-starter', { rootPath: projectName });
  }

  const projectPath = (opts.projectPath = process.cwd() + '/' + projectName);
  const templatePath = path.resolve(__dirname, '../templates/' + appType);
  const defaultTemplatePath = path.resolve(__dirname, '../templates/default');

  copyDir({
    templatePath: defaultTemplatePath,
    projectPath: projectPath,
    projectName: projectName,
  })
    .then(() => copyDir({
      templatePath: templatePath,
      projectPath: projectPath,
      projectName: projectName,
    }))
    .then(installWithMessageFactory(opts))
    .catch(function(err) {
      throw err;
    });
};

function installWithMessageFactory(opts, isExample = false) {
  const projectName = opts.projectName;
  const projectPath = opts.projectPath;

  return function installWithMessage() {
    return install({
      projectName: projectName,
      projectPath: projectPath,
      packages: appPackages[appType].concat(basePackages),
    })
      .then(function() {
        console.log(messages.start(projectName));
      })
      .catch(function(err) {
        throw err;
      });
  };
}