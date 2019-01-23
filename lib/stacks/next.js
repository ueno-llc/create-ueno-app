'use strict';

const path = require('path');

const copyDir = require('../utils/copy-dir');
const install = require('../utils/install');
const initGit = require('../utils/init-git');
const messages = require('../utils/messages');

const installWithMessageFactory = ({ projectName, projectPath }) => {
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
      .then(async () => {
        await initGit('Next.js');
        messages.start(projectName, 'next');
      })
      .catch((err) => { throw err });
  };
};

module.exports = function next(projectName, projectPath) {
  const templatePath = path.resolve(__dirname, '../../templates/default');

  copyDir({
    templatePath,
    projectPath,
    projectName,
  })
    .then(installWithMessageFactory({ projectName, projectPath }))
    .catch((err) => { throw err });
};
