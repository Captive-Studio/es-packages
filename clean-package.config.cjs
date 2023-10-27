const { readFileSync } = require('node:fs');

const { scripts = {} } = JSON.parse(readFileSync(`${process.cwd()}/package.json`, 'utf8'));

const cleanPackageConfig = {
  extends: ['clean-package/common'],
  indent: 2,
  remove: [
    'commitlint',
    'devDependencies',
    'packageManager',
    'stylelint',
    ...Object.keys(scripts)
      .filter((_) => _ !== 'postpack')
      .map((_) => `scripts.${_}`),
  ],
};

module.exports = cleanPackageConfig;
