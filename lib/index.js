'use strict';

const path = require('path');
const fs = require('fs');
const copyDir = require('./utils/copy-dir');
const install = require('./utils/install');
const messages = require('./messages');

const appTypes = [
  'next',
  'razzle',
  'gatsby'
];

const appPackages = {
  razzle: ['react', 'react-dom', 'react-router-dom', 'razzle', 'express'],
  next: ['react', 'react-dom', 'next'],
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

  const projectPath = (opts.projectPath = process.cwd() + '/' + projectName);

  const templatePath = path.resolve(__dirname, '../templates/' + appType);

  copyDir({
    templatePath: templatePath,
    projectPath: projectPath,
    projectName: projectName,
  })
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
      packages: appPackages[appType],
    })
      .then(function() {
        console.log(messages.start(projectName));
      })
      .catch(function(err) {
        throw err;
      });
  };
}
