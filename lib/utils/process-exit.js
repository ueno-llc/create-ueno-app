'use strict';

const path = require('path');
const fs = require('fs');
const execa = require('execa');

module.exports = function processExit(projectPath, projectName, appType) {
  if (appType === 'native') {
    return;
  }

  const readme = `# ${projectName}\n\nThis project was bootstrapped with [\`create-ueno-app\`](https://github.com/ueno-llc/create-ueno-app)`

  try { fs.unlinkSync(path.join(projectPath, 'src', 'README.md')) } catch (e) { /* Noop */ }
  try { fs.unlinkSync(path.join(projectPath, 'src', '.git')) } catch (e) { /* Noop */ }
  try { fs.unlinkSync(path.join(projectPath, '.gitmodules')); } catch (e) { /* Noop */ }
  try { fs.writeFileSync(path.join(projectPath, 'README.md'), readme) } catch (e) { /* Noop */ }
  try { fs.copyFileSync(path.join(path.resolve(__dirname), '../../overwrites', appType, 'Link.tsx'), path.join(projectPath, 'src/components/link/Link.tsx')) } catch (e) { /* Noop */ }

  if (appType === 'cra') {
    try { fs.copyFileSync(path.join(path.resolve(__dirname), '../../overwrites', appType, 'index.tsx'), path.join(projectPath, 'src/index.tsx')) } catch (e) { /* Noop */ }
    try { fs.copyFileSync(path.join(path.resolve(__dirname), '../../overwrites', appType, 'serviceWorker.ts'), path.join(projectPath, 'src/serviceWorker.ts')) } catch (e) { /* Noop */ }
  }

  try { execa.sync('git', ['add', '.'], { stdio: 'ignore' }) } catch (e) { /* Noop */ }
  try { execa.sync('git', ['commit', '--amend', '--no-edit'], { stdio: 'ignore' }) } catch (e) { /* Noop */ }
}
