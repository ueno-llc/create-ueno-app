'use strict';

const path = require('path');
const fs = require('fs-extra');
const Promise = require('bluebird');
const messages = require('../messages');
const output = require('./output');

module.exports = function copyDir({ templatePath, projectPath, projectName }) {
  messages.copying(projectName);

  return new Promise((resolve, reject) => {
    const stopCopySpinner = output.wait('Copying files...');

    fs.copy(templatePath, projectPath)
      .then(() => {
        const files = fs.readdirSync(projectPath);

        return Promise.all(
          files
          .filter(file => file[0] === '_')
          .map((file) => fs.move(
            path.resolve(projectPath, './' + file),
            path.resolve(projectPath, './.' + file.substr(1))
          ))
        );
      })
      .then(() => {
        stopCopySpinner();
        output.success(`Folder and files created for ${output.cmd(projectName)}`);
        resolve();
      })
      .catch((err) => {
        stopCopySpinner();
        output.error('Copy command failed, try again.', err);
        reject(err);
        process.exit(1);
      });
  });
};
