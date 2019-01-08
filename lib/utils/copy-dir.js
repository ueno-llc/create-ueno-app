'use strict';

const path = require('path');
const fs = require('fs-extra');
const Promise = require('bluebird');
const messages = require('../messages');
const output = require('./output');

module.exports = function copyDir(opts) {
  const templatePath = opts.templatePath;
  const projectPath = opts.projectPath;
  const projectName = opts.projectName;

  console.log(messages.copying(projectName));

  return new Promise(function(resolve, reject) {
    const stopCopySpinner = output.wait('Copying files');

    fs.copy(templatePath, projectPath)
      .then(function() {
        const files = fs.readdirSync(projectPath);
        return Promise.all(
          files
          .filter(function (file) {
            return file[0] === '_';
          })
          .map(function(file) {
            return fs.move(
              path.resolve(projectPath, './' + file),
              path.resolve(projectPath, './.' + file.substr(1))
            );
          })
        );
      })
      .then(function() {
        stopCopySpinner();
        output.success(
          `Created files for "${output.cmd(projectName)}" ueno app`
        );
        return this;
      })
      .then(resolve)
      .catch(function(err) {
        console.error(err);
        stopCopySpinner();
        output.error('Copy command failed, try again.');
        reject(err);
        process.exit(1);
      });
  });
};
